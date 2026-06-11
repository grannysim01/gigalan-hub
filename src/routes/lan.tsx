import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Countdown } from "@/components/site/Countdown";
import { useContent } from "@/lib/store";

export const Route = createFileRoute("/lan")({
  head: () => ({
    meta: [
      { title: "LAN — GiGa-LAN" },
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
          <div className="font-mono text-xs uppercase tracking-widest text-primary">/ összefoglaló</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl">LAN</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Itt találsz minden infót amire szükséged lehet.</p>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Szállás foglalással kapcsolatban kérlek vedd fel velünk a kapcsolatot!</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
        {[
          { k: "Dátum", v: date.toLocaleDateString(undefined, { dateStyle: "long" }), sub: date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }) + " — kapunyitás" },
          { k: "Helyszín", v: content.location, sub: content.address },
          { k: "Belépő", v: content.entryFee, sub: "Készpénz vagy Revolut" },
        ].map((c) => (
          <div key={c.k} className="border border-border bg-surface/40 p-6 clip-corner">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">{c.k}</div>
            <div className="mt-2 font-display text-3xl">{c.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.sub}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="font-display text-2xl text-primary">Visszaszámláló</h2>
        <div className="mt-4"><Countdown iso={content.eventDate} /></div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2">
        <div className="border border-success/40 bg-success/5 p-6 clip-corner">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-success font-display text-success-foreground">✓</span>
            <h3 className="font-display text-2xl text-success">Hozd magaddal</h3>
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
            <h3 className="font-display text-2xl text-destructive">Ne hozd magaddal</h3>
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
