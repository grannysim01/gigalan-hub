import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useContent, type Seat } from "@/lib/store";

export const Route = createFileRoute("/seating")({
  head: () => ({
    meta: [
      { title: "Seating — GiGa-LAN" },
      { name: "description", content: "Live seating chart. Green seats are free, red ones are taken. Pick yours." },
      { property: "og:title", content: "Seating — GiGa-LAN" },
      { property: "og:description", content: "Reserve a seat at GiGa-LAN." },
    ],
  }),
  component: SeatingPage,
});

function SeatingPage() {
  const { content, update } = useContent();
  const [selected, setSelected] = useState<Seat | null>(null);
  const [name, setName] = useState("");

  const grid = useMemo(() => {
    const byTable: Seat[][] = [];
    for (let t = 1; t <= 23; t++) byTable.push(content.seats.filter((s) => s.table === t));
    return byTable;
  }, [content.seats]);

  const free = content.seats.filter((s) => !s.reservedBy).length;

  const reserve = () => {
    if (!selected || !name.trim()) return;
    update((c) => ({
      ...c,
      seats: c.seats.map((s) => (s.id === selected.id ? { ...s, reservedBy: name.trim() } : s)),
    }));
    setSelected(null);
    setName("");
  };

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">/ deployment map</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl">Seating</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pick an empty seat (green). Reserved seats (red) display the player's name.
            <span className="ml-2 font-mono text-primary">{free}/{content.seats.length} free</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-success" /> Free</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-destructive" /> Reserved</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-primary" /> Selected</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        {/* Room */}
        <div className="border border-border bg-surface/30 p-4 sm:p-8 clip-corner">
          <div className="mb-6 border-b border-dashed border-primary/40 pb-2 text-center font-mono text-xs uppercase tracking-widest text-primary">
            ▲ Stage / Casters ▲
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {grid.map((tableSeats, i) => (
              <Table key={i} index={i + 1} seats={tableSeats} selected={selected} onSelect={setSelected} />
            ))}
          </div>
          <div className="mt-8 border-t border-dashed border-border pt-2 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Entrance
          </div>
        </div>

        {/* Reserve panel */}
        <div className="mt-8 border border-border bg-surface/60 p-6 clip-corner">
          {selected ? (
            selected.reservedBy ? (
              <div>
                <h3 className="font-display text-2xl text-destructive">Seat {selected.id} is taken</h3>
                <p className="mt-1 text-sm text-muted-foreground">Reserved by <span className="text-foreground">{selected.reservedBy}</span>. Pick another seat.</p>
                <button onClick={() => setSelected(null)} className="mt-4 border border-border px-4 py-2 font-display text-sm tracking-widest hover:border-primary">Close</button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-primary">Selected · Table {selected.table} · Seat {selected.seat}</div>
                  <h3 className="mt-1 font-display text-2xl">Reserve {selected.id}</h3>
                  <input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name or gamertag"
                    className="mt-3 w-full border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelected(null)} className="border border-border px-4 py-3 font-display text-sm tracking-widest hover:border-primary">Cancel</button>
                  <button onClick={reserve} disabled={!name.trim()}
                          className="bg-primary px-6 py-3 font-display text-sm tracking-widest text-primary-foreground clip-corner disabled:opacity-40">
                    Lock it in
                  </button>
                </div>
              </div>
            )
          ) : (
            <p className="text-sm text-muted-foreground">Tap any seat to begin.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Table({ index, seats, selected, onSelect }: { index: number; seats: Seat[]; selected: Seat | null; onSelect: (s: Seat) => void }) {
  return (
    <div className="border border-border bg-background/60 p-3">
      <div className="mb-2 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">T{String(index).padStart(2, "0")}</div>
      <div className="mx-auto mb-2 h-1.5 w-full bg-border" />
      <div className="grid grid-cols-2 gap-1.5">
        {seats.map((s) => {
          const isSel = selected?.id === s.id;
          const taken = !!s.reservedBy;
          const cls = isSel
            ? "bg-primary text-primary-foreground"
            : taken
              ? "bg-destructive text-destructive-foreground"
              : "bg-success text-success-foreground hover:opacity-80";
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              title={taken ? `Reserved by ${s.reservedBy}` : `Free — seat ${s.seat}`}
              className={`h-10 w-full overflow-hidden px-1 text-[10px] font-bold uppercase tracking-tight transition ${cls}`}
            >
              {taken ? truncate(s.reservedBy!, 8) : `S${s.seat}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function truncate(s: string, n: number) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
