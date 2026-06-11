import { r as useContent } from "./store-DFo75fQe.js";
import { t as SiteLayout } from "./Layout-w9uZ0dP1.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/gallery.tsx?tsr-split=component
function GalleryPage() {
	const { content } = useContent();
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [/* @__PURE__ */ jsx("section", {
		className: "border-b border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-4 py-14",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "font-mono text-xs uppercase tracking-widest text-primary",
					children: "/ archive"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 font-display text-5xl sm:text-7xl",
					children: "Gallery & history"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 max-w-3xl text-muted-foreground",
					children: content.history
				})
			]
		})
	}), /* @__PURE__ */ jsx("section", {
		className: "mx-auto max-w-7xl px-4 py-12",
		children: /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: content.gallery.map((g, i) => /* @__PURE__ */ jsxs("article", {
				className: `group relative overflow-hidden border border-border clip-corner ${i % 3 === 0 ? "md:col-span-2" : ""}`,
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-[16/9] w-full overflow-hidden bg-surface",
					children: /* @__PURE__ */ jsx("img", {
						src: g.image,
						alt: g.title,
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "border-t border-border bg-surface/80 p-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-display text-2xl",
							children: g.title
						}), /* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs text-primary",
							children: g.year
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: g.description
					})]
				})]
			}, g.id))
		})
	})] });
}
//#endregion
export { GalleryPage as component };
