import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useContent } from "@/lib/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GiGa-LAN" },
      { name: "description", content: "Get in touch with the GiGa-LAN organizers, find the venue on the map." },
      { property: "og:title", content: "Contact — GiGa-LAN" },
      { property: "og:description", content: "Contact info, address and map for GiGa-LAN." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { content } = useContent();
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(content.address)}&output=embed`;
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">/ comms</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl">Contact</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Need help, want to sponsor, or have a press question? Reach the organizers directly.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3">
        {content.organizers.map((o) => (
          <div key={o.email} className="border border-border bg-surface/40 p-6 clip-corner">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">{o.role}</div>
            <h3 className="mt-1 font-display text-2xl">{o.name}</h3>
            <a href={`mailto:${o.email}`} className="mt-3 block text-sm text-muted-foreground hover:text-primary">{o.email}</a>
            <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="block text-sm text-muted-foreground hover:text-primary">{o.phone}</a>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="border border-border bg-surface/40 p-6 clip-corner">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">Venue</div>
          <h3 className="mt-1 font-display text-2xl">{content.location}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{content.address}</p>
          <a href={content.mapsUrl} target="_blank" rel="noopener noreferrer"
             className="mt-6 inline-block bg-primary px-5 py-3 font-display text-sm tracking-widest text-primary-foreground clip-corner hover:opacity-90">
            Open in Google Maps ↗
          </a>
        </div>
        <div className="aspect-[4/3] overflow-hidden border border-border clip-corner lg:aspect-auto">
          <iframe title="Venue map" src={mapEmbed} className="h-full min-h-[320px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </SiteLayout>
  );
}
