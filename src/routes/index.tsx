import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Countdown } from "@/components/site/Countdown";
import { useContent } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GiGa-LAN — 2026" },
      { name: "description", content: "Watch live, count down to the next event, and reserve your spot at GiGa-LAN." },
      { property: "og:title", content: "GiGa-LAN" },
      { property: "og:description", content: "2026" },
    ],
  }),
  component: Home,
});

function Home() {
  const { content } = useContent();
  const eventDate = new Date(content.eventDate);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="tactical-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 top-0 h-px bg-primary/60" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 animate-pulse bg-primary" /> Tájékoztató
            </div>
            <h1 className="mt-5 font-display text-6xl leading-none text-glow sm:text-8xl">
              {content.eventName}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              {content.tagline}. 4 nap. 50 férőhely. 1 csatamező. Nemsokára találkozunk.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 font-mono text-sm text-muted-foreground">
              <span><span className="text-primary">▸</span> {eventDate.toLocaleDateString(undefined, { dateStyle: "long" })}</span>
              <span><span className="text-primary">▸</span> {content.location}</span>
              <span><span className="text-primary">▸</span> {content.entryFee}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/seating" className="bg-primary px-6 py-3 font-display text-lg tracking-widest text-primary-foreground clip-corner hover:opacity-90">Foglalás</Link>
              <Link to="/lan" className="border border-border bg-surface px-6 py-3 font-display text-lg tracking-widest text-foreground clip-corner hover:border-primary">Részletek</Link>
            </div>
          </div>

          <div>
            <h2 className="font-display text-sm tracking-widest text-primary">Visszaszámlálás</h2>
            <div className="mt-4"><Countdown iso={content.eventDate} /></div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">{eventDate.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* LIVE STREAM */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">/ élő</div>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">Nézd élőben a LAN-t</h2>
          </div>
          <a href={`https://twitch.tv/${content.twitchChannel}`} target="_blank" rel="noopener noreferrer"
             className="hidden border border-border px-4 py-2 font-display text-sm tracking-widest hover:border-primary hover:text-primary sm:inline-block">
            twitch.tv/{content.twitchChannel} ↗
          </a>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="aspect-video w-full overflow-hidden border border-border clip-corner">
            <iframe
              title="Twitch player"
              src={`https://player.twitch.tv/?channel=${content.twitchChannel}&parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}&muted=true`}
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <div className="aspect-video w-full overflow-hidden border border-border clip-corner lg:aspect-auto">
            <iframe
              title="Twitch chat"
              src={`https://www.twitch.tv/embed/${content.twitchChannel}/chat?parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}&darkpopout`}
              className="h-full min-h-[300px] w-full"
            />
          </div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { k: "Format", v: "4 nap / 3 éjszaka" },
            { k: "Asztalok", v: "50 férőhely" },
            { k: "Games", v: "Retrótól a modernekig minden" },
          ].map((c) => (
            <div key={c.k} className="border border-border bg-surface/40 p-6 clip-corner">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">{c.k}</div>
              <div className="mt-2 font-display text-2xl">{c.v}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
