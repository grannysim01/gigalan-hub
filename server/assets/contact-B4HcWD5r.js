import { r as useContent } from "./store-DFo75fQe.js";
import { t as SiteLayout } from "./Layout-w9uZ0dP1.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/contact.tsx?tsr-split=component
function ContactPage() {
	const { content } = useContent();
	const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(content.address)}&output=embed`;
	return /* @__PURE__ */ jsxs(SiteLayout, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-4 py-14",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-mono text-xs uppercase tracking-widest text-primary",
						children: "/ comms"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 font-display text-5xl sm:text-7xl",
						children: "Contact"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Need help, want to sponsor, or have a press question? Reach the organizers directly."
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-3",
			children: content.organizers.map((o) => /* @__PURE__ */ jsxs("div", {
				className: "border border-border bg-surface/40 p-6 clip-corner",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-mono text-xs uppercase tracking-widest text-primary",
						children: o.role
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-1 font-display text-2xl",
						children: o.name
					}),
					/* @__PURE__ */ jsx("a", {
						href: `mailto:${o.email}`,
						className: "mt-3 block text-sm text-muted-foreground hover:text-primary",
						children: o.email
					}),
					/* @__PURE__ */ jsx("a", {
						href: `tel:${o.phone.replace(/\s/g, "")}`,
						className: "block text-sm text-muted-foreground hover:text-primary",
						children: o.phone
					})
				]
			}, o.email))
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto grid max-w-7xl gap-6 px-4 pb-16 lg:grid-cols-[1fr_1.4fr]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "border border-border bg-surface/40 p-6 clip-corner",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-mono text-xs uppercase tracking-widest text-primary",
						children: "Venue"
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-1 font-display text-2xl",
						children: content.location
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: content.address
					}),
					/* @__PURE__ */ jsx("a", {
						href: content.mapsUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-6 inline-block bg-primary px-5 py-3 font-display text-sm tracking-widest text-primary-foreground clip-corner hover:opacity-90",
						children: "Open in Google Maps ↗"
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "aspect-[4/3] overflow-hidden border border-border clip-corner lg:aspect-auto",
				children: /* @__PURE__ */ jsx("iframe", {
					title: "Venue map",
					src: mapEmbed,
					className: "h-full min-h-[320px] w-full",
					loading: "lazy",
					referrerPolicy: "no-referrer-when-downgrade"
				})
			})]
		})
	] });
}
//#endregion
export { ContactPage as component };
