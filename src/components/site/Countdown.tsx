import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  const cells: [string, number][] = [["NAP", t.d], ["ÓRA", t.h], ["PERC", t.m], ["MÁSODPERC", t.s]];
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {cells.map(([label, val]) => (
        <div key={label} className="border border-border bg-surface/60 px-2 py-4 text-center clip-corner sm:px-4 sm:py-6">
          <div className="font-display text-4xl text-primary text-glow sm:text-6xl tabular-nums">{String(val).padStart(2, "0")}</div>
          <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground sm:text-xs">{label}</div>
        </div>
      ))}
    </div>
  );
}
