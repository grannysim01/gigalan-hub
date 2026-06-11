import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useContent, type Seat, type TableLayout } from "@/lib/store";

export const Route = createFileRoute("/seating")({
  head: () => ({
    meta: [
      { title: "Seating — GiGa-LAN" },
      { name: "description", content: "Live seating chart. Green seats are free, red ones are taken." },
      { property: "og:title", content: "Seating — GiGa-LAN" },
      { property: "og:description", content: "Check the seating chart for GiGa-LAN." },
    ],
  }),
  component: SeatingPage,
});

function SeatingPage() {
  const { content } = useContent();

  const rows = useMemo(() => {
    const map = new Map<number, TableLayout[]>();
    content.tables.forEach((t) => {
      if (!map.has(t.row)) map.set(t.row, []);
      map.get(t.row)!.push(t);
    });
    for (const [, arr] of map) {
      arr.sort((a, b) => (a.column ?? 0) - (b.column ?? 0) || a.id - b.id);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [content.tables]);

  const seatsByTable = useMemo(() => {
    const m = new Map<number, Seat[]>();
    content.seats.forEach((s) => {
      if (!m.has(s.table)) m.set(s.table, []);
      m.get(s.table)!.push(s);
    });
    return m;
  }, [content.seats]);

  const free = content.seats.filter((s) => !s.reservedBy).length;

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">/ ülésrend</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl">Helyfoglalás</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A helyfoglalással kapcsolatban kérlek vedd fel velünk a kapcsolatot (Facebook/Discord)!
            <span className="ml-2 font-mono text-primary">{free}/{content.seats.length} free</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-success" /> Free</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-destructive" /> Reserved</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="overflow-x-auto border border-border bg-surface/30 p-4 sm:p-8 clip-corner">
          <div className="mb-6 border-b border-dashed border-primary/40 pb-2 text-center font-mono text-xs uppercase tracking-widest text-primary">
            ▲ Színpad ▲
          </div>
          <div className="space-y-6">
            {rows.map(([rowNum, tables]) => (
              <div key={rowNum} className="flex flex-wrap items-start justify-center gap-4">
                {tables.map((t) => (
                  <TableView key={t.id} table={t} seats={seatsByTable.get(t.id) ?? []} />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-dashed border-border pt-2 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function TableView({ table, seats }: { table: TableLayout; seats: Seat[] }) {
  // Footprint stays consistent regardless of rotation
  return (
    <div className="flex h-[120px] w-[120px] items-center justify-center">
      <div
        className="border border-border bg-background/60 p-2 transition-transform"
        style={{ transform: `rotate(${table.rotation}deg)`, width: 110 }}
      >
        <div className="mb-1 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          T{String(table.id).padStart(2, "0")}
        </div>
        <div className="mx-auto mb-1 h-1.5 w-full bg-border" />
        <div className="grid grid-cols-2 gap-1">
          {seats.map((s) => {
            const taken = !!s.reservedBy;
            const cls = taken
              ? "bg-destructive text-destructive-foreground"
              : "bg-success text-success-foreground";
            return (
              <div
                key={s.id}
                title={taken ? `Reserved by ${s.reservedBy}` : `Free — seat ${s.seat}`}
                className={`h-9 overflow-hidden px-1 text-[10px] font-bold uppercase leading-9 tracking-tight ${cls} text-center`}
              >
                {taken ? truncate(s.reservedBy!, 8) : `S${s.seat}`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function truncate(s: string, n: number) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
