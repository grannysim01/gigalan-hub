import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Countdown } from "@/components/site/Countdown";
import { useContent } from "@/lib/store";

export const Route = createFileRoute("/lan")({
  head: () => ({
    meta: [
      { title: "The LAN — GiGa-LAN" },
      { name: "description", content: "Date, location, entry fee, and the official what-to-bring (and not-to-bring) checklist for GiGa-LAN." },
      { property: "og:title", content: "The LAN — GiGa-LAN" },
      { property: "og:description", content: "Everything you need to know to attend GiGa-LAN." },
    ],
  }),
  component: LanPage,
});

function LanPage() {
  const { content } = useContent();
  const date = new Date(content.eventDate);
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">/ briefing</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl">The LAN</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Everything you need to deploy successfully. Read it, bookmark it, share it with your squad.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
        {[
          { k: "Date", v: date.toLocaleDateString(undefined, { dateStyle: "long" }), sub: date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) + " — doors open" },
          { k: "Location", v: content.location, sub: content.address },
          { k: "Entry fee", v: content.entryFee, sub: "Cash or transfer on arrival" },
        ].map((c) => (
          <div key={c.k} className="border border-border bg-surface/40 p-6 clip-corner">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">{c.k}</div>
            <div className="mt-2 font-display text-3xl">{c.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.sub}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="font-display text-2xl text-primary">Countdown</h2>
        <div className="mt-4"><Countdown iso={content.eventDate} /></div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2">
        <div className="border border-success/40 bg-success/5 p-6 clip-corner">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-success font-display text-success-foreground">✓</span>
            <h3 className="font-display text-2xl text-success">Bring</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {content.bringList.map((item, i) => (
              <li key={i} className="flex gap-3 border-b border-border/40 pb-2 last:border-0">
                <span className="font-mono text-success">+</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-destructive/40 bg-destructive/5 p-6 clip-corner">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-destructive font-display text-destructive-foreground">✕</span>
            <h3 className="font-display text-2xl text-destructive">Don't bring</h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {content.dontBringList.map((item, i) => (
              <li key={i} className="flex gap-3 border-b border-border/40 pb-2 last:border-0">
                <span className="font-mono text-destructive">−</span><span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
