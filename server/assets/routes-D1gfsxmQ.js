import { r as useContent } from "./store-DFo75fQe.js";
import { t as SiteLayout } from "./Layout-w9uZ0dP1.js";
import { t as Countdown } from "./Countdown-Cel_ogMZ.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/index.tsx?tsr-split=component
function Home() {
	const { content } = useContent();
	const eventDate = new Date(content.eventDate);
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative overflow-hidden border-b border-border",
			children: [
				/* @__PURE__ */ jsx("div", { className: "tactical-grid absolute inset-0 opacity-50" }),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-primary/60" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[1.1fr_1fr] md:py-28",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary",
							children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse bg-primary" }), " Operation briefing"]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-5 font-display text-6xl leading-none text-glow sm:text-8xl",
							children: content.eventName
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-4 max-w-lg text-lg text-muted-foreground",
							children: [content.tagline, ". Three days. 46 seats. One battlefield. Gear up, log in, and meet your squad IRL."]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex flex-wrap gap-4 font-mono text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ jsxs("span", { children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-primary",
										children: "▸"
									}),
									" ",
									eventDate.toLocaleDateString(void 0, { dateStyle: "long" })
								] }),
								/* @__PURE__ */ jsxs("span", { children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-primary",
										children: "▸"
									}),
									" ",
									content.location
								] }),
								/* @__PURE__ */ jsxs("span", { children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-primary",
										children: "▸"
									}),
									" ",
									content.entryFee
								] })
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/seating",
								className: "bg-primary px-6 py-3 font-display text-lg tracking-widest text-primary-foreground clip-corner hover:opacity-90",
								children: "Reserve a seat"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/lan",
								className: "border border-border bg-surface px-6 py-3 font-display text-lg tracking-widest text-foreground clip-corner hover:border-primary",
								children: "Event details"
							})]
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h2", {
							className: "font-display text-sm tracking-widest text-primary",
							children: "Time to launch"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-4",
							children: /* @__PURE__ */ jsx(Countdown, { iso: content.eventDate })
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 font-mono text-xs text-muted-foreground",
							children: eventDate.toLocaleString()
						})
					] })]
				})
			]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-4 py-16",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "font-mono text-xs uppercase tracking-widest text-primary",
					children: "/ live feed"
				}), /* @__PURE__ */ jsx("h2", {
					className: "mt-1 font-display text-4xl sm:text-5xl",
					children: "Watch the action"
				})] }), /* @__PURE__ */ jsxs("a", {
					href: `https://twitch.tv/${content.twitchChannel}`,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "hidden border border-border px-4 py-2 font-display text-sm tracking-widest hover:border-primary hover:text-primary sm:inline-block",
					children: [
						"twitch.tv/",
						content.twitchChannel,
						" ↗"
					]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]",
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-video w-full overflow-hidden border border-border clip-corner",
					children: /* @__PURE__ */ jsx("iframe", {
						title: "Twitch player",
						src: `https://player.twitch.tv/?channel=${content.twitchChannel}&parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}&muted=true`,
						allowFullScreen: true,
						className: "h-full w-full"
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "aspect-video w-full overflow-hidden border border-border clip-corner lg:aspect-auto",
					children: /* @__PURE__ */ jsx("iframe", {
						title: "Twitch chat",
						src: `https://www.twitch.tv/embed/${content.twitchChannel}/chat?parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}&darkpopout`,
						className: "h-full min-h-[300px] w-full"
					})
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto max-w-7xl px-4 pb-20",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					{
						k: "Format",
						v: "BYOC — 3 days / 2 nights"
					},
					{
						k: "Seats",
						v: "46 total, first come first reserved"
					},
					{
						k: "Games",
						v: "CS2 · Valorant · Rocket League · Free play"
					}
				].map((c) => /* @__PURE__ */ jsxs("div", {
					className: "border border-border bg-surface/40 p-6 clip-corner",
					children: [/* @__PURE__ */ jsx("div", {
						className: "font-mono text-xs uppercase tracking-widest text-primary",
						children: c.k
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-2 font-display text-2xl",
						children: c.v
					})]
				}, c.k))
			})
		})
	] });
}
//#endregion
export { Home as component };
