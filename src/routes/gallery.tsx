import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { useContent } from "@/lib/store";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — GiGa-LAN" },
      { name: "description", content: "Throwbacks from past GiGa-LAN events and the story of the community." },
      { property: "og:title", content: "Gallery — GiGa-LAN" },
      { property: "og:description", content: "Past events and our story." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { content } = useContent();
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">/ archive</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl">Gallery & history</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{content.history}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {content.gallery.map((g, i) => (
            <article key={g.id} className={`group relative overflow-hidden border border-border clip-corner ${i % 3 === 0 ? "md:col-span-2" : ""}`}>
              <div className="aspect-[16/9] w-full overflow-hidden bg-surface">
                <img src={g.image} alt={g.title} loading="lazy"
                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="border-t border-border bg-surface/80 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl">{g.title}</h3>
                  <span className="font-mono text-xs text-primary">{g.year}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
