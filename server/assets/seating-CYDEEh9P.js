import { r as useContent } from "./store-DFo75fQe.js";
import { t as SiteLayout } from "./Layout-w9uZ0dP1.js";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/seating.tsx?tsr-split=component
function SeatingPage() {
	const { content } = useContent();
	const rows = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		content.tables.forEach((t) => {
			if (!map.has(t.row)) map.set(t.row, []);
			map.get(t.row).push(t);
		});
		for (const [, arr] of map) arr.sort((a, b) => (a.column ?? 0) - (b.column ?? 0) || a.id - b.id);
		return [...map.entries()].sort((a, b) => a[0] - b[0]);
	}, [content.tables]);
	const seatsByTable = useMemo(() => {
		const m = /* @__PURE__ */ new Map();
		content.seats.forEach((s) => {
			if (!m.has(s.table)) m.set(s.table, []);
			m.get(s.table).push(s);
		});
		return m;
	}, [content.seats]);
	const free = content.seats.filter((s) => !s.reservedBy).length;
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "border-b border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-4 py-14",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "font-mono text-xs uppercase tracking-widest text-primary",
					children: "/ deployment map"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 font-display text-5xl sm:text-7xl",
					children: "Seating"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-3 max-w-2xl text-muted-foreground",
					children: ["Live seat status. Green = available, red = reserved. To book a seat, contact an organizer — reservations are managed by staff.", /* @__PURE__ */ jsxs("span", {
						className: "ml-2 font-mono text-primary",
						children: [
							free,
							"/",
							content.seats.length,
							" free"
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex flex-wrap gap-4 text-xs",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", { className: "h-3 w-3 bg-success" }), " Free"]
					}), /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", { className: "h-3 w-3 bg-destructive" }), " Reserved"]
					})]
				})
			]
		})
	}), /* @__PURE__ */ jsx("section", {
		className: "mx-auto max-w-7xl px-4 py-10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "overflow-x-auto border border-border bg-surface/30 p-4 sm:p-8 clip-corner",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "mb-6 border-b border-dashed border-primary/40 pb-2 text-center font-mono text-xs uppercase tracking-widest text-primary",
					children: "▲ Stage / Casters ▲"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "space-y-6",
					children: rows.map(([rowNum, tables]) => /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap items-start justify-center gap-4",
						children: tables.map((t) => /* @__PURE__ */ jsx(TableView, {
							table: t,
							seats: seatsByTable.get(t.id) ?? []
						}, t.id))
					}, rowNum))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8 border-t border-dashed border-border pt-2 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground",
					children: "Entrance"
				})
			]
		})
	})] });
}
function TableView({ table, seats }) {
	return /* @__PURE__ */ jsx("div", {
		className: "flex h-[120px] w-[120px] items-center justify-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "border border-border bg-background/60 p-2 transition-transform",
			style: {
				transform: `rotate(${table.rotation}deg)`,
				width: 110
			},
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-1 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: ["T", String(table.id).padStart(2, "0")]
				}),
				/* @__PURE__ */ jsx("div", { className: "mx-auto mb-1 h-1.5 w-full bg-border" }),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-1",
					children: seats.map((s) => {
						const taken = !!s.reservedBy;
						const cls = taken ? "bg-destructive text-destructive-foreground" : "bg-success text-success-foreground";
						return /* @__PURE__ */ jsx("div", {
							title: taken ? `Reserved by ${s.reservedBy}` : `Free — seat ${s.seat}`,
							className: `h-9 overflow-hidden px-1 text-[10px] font-bold uppercase leading-9 tracking-tight ${cls} text-center`,
							children: taken ? truncate(s.reservedBy, 8) : `S${s.seat}`
						}, s.id);
					})
				})
			]
		})
	});
}
function truncate(s, n) {
	return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
//#endregion
export { SeatingPage as component };
