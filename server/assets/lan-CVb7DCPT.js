import { r as useContent } from "./store-DFo75fQe.js";
import { t as SiteLayout } from "./Layout-w9uZ0dP1.js";
import { t as Countdown } from "./Countdown-Cel_ogMZ.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/lan.tsx?tsr-split=component
function LanPage() {
	const { content } = useContent();
	const date = new Date(content.eventDate);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 py-14",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-mono text-xs uppercase tracking-widest text-primary",
						children: "/ briefing"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 font-display text-5xl sm:text-7xl",
						children: "The LAN"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Everything you need to deploy successfully. Read it, bookmark it, share it with your squad."
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3",
			children: [
				{
					k: "Date",
					v: date.toLocaleDateString(void 0, { dateStyle: "long" }),
					sub: date.toLocaleTimeString(void 0, {
						hour: "2-digit",
						minute: "2-digit"
					}) + " — doors open"
				},
				{
					k: "Location",
					v: content.location,
					sub: content.address
				},
				{
					k: "Entry fee",
					v: content.entryFee,
					sub: "Cash or transfer on arrival"
				}
			].map((c) => /* @__PURE__ */ jsxs("div", {
				className: "border border-border bg-surface/40 p-6 clip-corner",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-mono text-xs uppercase tracking-widest text-primary",
						children: c.k
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-2 font-display text-3xl",
						children: c.v
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-1 text-sm text-muted-foreground",
						children: c.sub
					})
				]
			}, c.k))
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-4 py-8",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "font-display text-2xl text-primary",
				children: "Countdown"
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Countdown, { iso: content.eventDate })
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "border border-success/40 bg-success/5 p-6 clip-corner",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid h-9 w-9 place-items-center bg-success font-display text-success-foreground",
						children: "✓"
					}), /* @__PURE__ */ jsx("h3", {
						className: "font-display text-2xl text-success",
						children: "Bring"
					})]
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: content.bringList.map((item, i) => /* @__PURE__ */ jsxs("li", {
						className: "flex gap-3 border-b border-border/40 pb-2 last:border-0",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-mono text-success",
							children: "+"
						}), /* @__PURE__ */ jsx("span", { children: item })]
					}, i))
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "border border-destructive/40 bg-destructive/5 p-6 clip-corner",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid h-9 w-9 place-items-center bg-destructive font-display text-destructive-foreground",
						children: "✕"
					}), /* @__PURE__ */ jsx("h3", {
						className: "font-display text-2xl text-destructive",
						children: "Don't bring"
					})]
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: content.dontBringList.map((item, i) => /* @__PURE__ */ jsxs("li", {
						className: "flex gap-3 border-b border-border/40 pb-2 last:border-0",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-mono text-destructive",
							children: "−"
						}), /* @__PURE__ */ jsx("span", { children: item })]
					}, i))
				})]
			})]
		})
	] });
}
//#endregion
export { LanPage as component };
