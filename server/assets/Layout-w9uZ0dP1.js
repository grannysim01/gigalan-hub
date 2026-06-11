import { i as useContentRealtime, r as useContent } from "./store-DFo75fQe.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/site/Layout.tsx
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/lan",
		label: "The LAN"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/seating",
		label: "Seating"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteLayout({ children }) {
	const { content } = useContent();
	useContentRealtime();
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "grid h-9 w-9 place-items-center bg-primary font-display text-2xl text-primary-foreground clip-corner",
							children: "G"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-display text-2xl tracking-widest",
							children: content.eventName
						})]
					}), /* @__PURE__ */ jsxs("nav", {
						className: "hidden items-center gap-1 md:flex",
						children: [NAV.map((n) => /* @__PURE__ */ jsx(Link, {
							to: n.to,
							className: "px-3 py-2 font-display text-sm tracking-widest text-muted-foreground transition-colors hover:text-primary",
							activeProps: { className: "px-3 py-2 font-display text-sm tracking-widest text-primary border-b-2 border-primary" },
							activeOptions: { exact: n.to === "/" },
							children: n.label
						}, n.to)), /* @__PURE__ */ jsx(Link, {
							to: "/seating",
							className: "ml-2 bg-primary px-4 py-2 font-display text-sm tracking-widest text-primary-foreground clip-corner hover:opacity-90",
							children: "Reserve Seat"
						})]
					})]
				}), /* @__PURE__ */ jsx("nav", {
					className: "flex overflow-x-auto border-t border-border md:hidden",
					children: NAV.map((n) => /* @__PURE__ */ jsx(Link, {
						to: n.to,
						className: "flex-1 whitespace-nowrap px-3 py-2 text-center font-display text-xs tracking-widest text-muted-foreground",
						activeProps: { className: "flex-1 whitespace-nowrap px-3 py-2 text-center font-display text-xs tracking-widest text-primary border-b-2 border-primary" },
						activeOptions: { exact: n.to === "/" },
						children: n.label
					}, n.to))
				})]
			}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ jsx(SiteFooter, {})
		]
	});
}
function SiteFooter() {
	const { content } = useContent();
	return /* @__PURE__ */ jsxs("footer", {
		className: "mt-16 border-t border-border bg-surface/40",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid h-9 w-9 place-items-center bg-primary font-display text-2xl text-primary-foreground clip-corner",
						children: "G"
					}), /* @__PURE__ */ jsx("span", {
						className: "font-display text-2xl tracking-widest",
						children: content.eventName
					})]
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: content.tagline
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "text-sm text-primary",
					children: "Quick links"
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: NAV.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: n.to,
						className: "text-muted-foreground hover:text-primary",
						children: n.label
					}) }, n.to))
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "text-sm text-primary",
					children: "Connect"
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-3 flex flex-wrap gap-2",
					children: content.socials.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
						href: s.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-block border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary",
						children: s.label
					}) }, s.label))
				})] })
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "border-t border-border px-4 py-4 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" ",
				content.eventName,
				". Built by the community, for the community."
			]
		})]
	});
}
//#endregion
export { SiteLayout as t };
