import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//#region src/styles.css?url
var styles_default = "/assets/styles-BZpZS82R.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl text-primary text-glow",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-2xl",
					children: "Position not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This page is off the map."
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "mt-6 inline-block bg-primary px-5 py-2 font-display text-lg text-primary-foreground clip-corner hover:opacity-90",
					children: "Return to base"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl text-primary",
					children: "System fault"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something broke. Try again."
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 bg-primary px-5 py-2 font-display text-lg text-primary-foreground clip-corner",
					children: "Retry"
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "GiGa-LAN — Hungary's Premier LAN Party" },
			{
				name: "description",
				content: "GiGa-LAN: the tactical LAN party event. Reserve your seat, watch live on Twitch, and join the community."
			},
			{
				property: "og:title",
				content: "GiGa-LAN"
			},
			{
				property: "og:description",
				content: "Hungary's premier LAN party event."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
//#region src/routes/seating.tsx
var $$splitComponentImporter$5 = () => import("./seating-CYDEEh9P.js");
var Route$5 = createFileRoute("/seating")({
	head: () => ({ meta: [
		{ title: "Seating — GiGa-LAN" },
		{
			name: "description",
			content: "Live seating chart. Green seats are free, red ones are taken."
		},
		{
			property: "og:title",
			content: "Seating — GiGa-LAN"
		},
		{
			property: "og:description",
			content: "Check the seating chart for GiGa-LAN."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/lan.tsx
var $$splitComponentImporter$4 = () => import("./lan-CVb7DCPT.js");
var Route$4 = createFileRoute("/lan")({
	head: () => ({ meta: [
		{ title: "The LAN — GiGa-LAN" },
		{
			name: "description",
			content: "Date, location, entry fee, and the official what-to-bring (and not-to-bring) checklist for GiGa-LAN."
		},
		{
			property: "og:title",
			content: "The LAN — GiGa-LAN"
		},
		{
			property: "og:description",
			content: "Everything you need to know to attend GiGa-LAN."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/gallery.tsx
var $$splitComponentImporter$3 = () => import("./gallery-BgRZX3gn.js");
var Route$3 = createFileRoute("/gallery")({
	head: () => ({ meta: [
		{ title: "Gallery — GiGa-LAN" },
		{
			name: "description",
			content: "Throwbacks from past GiGa-LAN events and the story of the community."
		},
		{
			property: "og:title",
			content: "Gallery — GiGa-LAN"
		},
		{
			property: "og:description",
			content: "Past events and our story."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$2 = () => import("./contact-B4HcWD5r.js");
var Route$2 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — GiGa-LAN" },
		{
			name: "description",
			content: "Get in touch with the GiGa-LAN organizers, find the venue on the map."
		},
		{
			property: "og:title",
			content: "Contact — GiGa-LAN"
		},
		{
			property: "og:description",
			content: "Contact info, address and map for GiGa-LAN."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/admin.tsx
var $$splitComponentImporter$1 = () => import("./admin-D2x5w0To.js");
var Route$1 = createFileRoute("/admin")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-D1gfsxmQ.js");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "GiGa-LAN — Hungary's Premier LAN Party" },
		{
			name: "description",
			content: "Watch live, count down to the next event, and reserve your spot at GiGa-LAN."
		},
		{
			property: "og:title",
			content: "GiGa-LAN"
		},
		{
			property: "og:description",
			content: "Hungary's premier LAN party."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var SeatingRoute = Route$5.update({
	id: "/seating",
	path: "/seating",
	getParentRoute: () => Route$6
});
var LanRoute = Route$4.update({
	id: "/lan",
	path: "/lan",
	getParentRoute: () => Route$6
});
var GalleryRoute = Route$3.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$6
});
var ContactRoute = Route$2.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$6
});
var AdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	AdminRoute,
	ContactRoute,
	GalleryRoute,
	LanRoute,
	SeatingRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
