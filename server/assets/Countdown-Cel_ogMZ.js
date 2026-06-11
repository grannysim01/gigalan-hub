import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/site/Countdown.tsx
function diff(target) {
	const ms = Math.max(0, target - Date.now());
	return {
		d: Math.floor(ms / 864e5),
		h: Math.floor(ms % 864e5 / 36e5),
		m: Math.floor(ms % 36e5 / 6e4),
		s: Math.floor(ms % 6e4 / 1e3)
	};
}
function Countdown({ iso }) {
	const target = new Date(iso).getTime();
	const [t, setT] = useState(() => diff(target));
	useEffect(() => {
		setT(diff(target));
		const id = setInterval(() => setT(diff(target)), 1e3);
		return () => clearInterval(id);
	}, [target]);
	return /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-4 gap-2 sm:gap-4",
		children: [
			["DAYS", t.d],
			["HRS", t.h],
			["MIN", t.m],
			["SEC", t.s]
		].map(([label, val]) => /* @__PURE__ */ jsxs("div", {
			className: "border border-border bg-surface/60 px-2 py-4 text-center clip-corner sm:px-4 sm:py-6",
			children: [/* @__PURE__ */ jsx("div", {
				className: "font-display text-4xl text-primary text-glow sm:text-6xl tabular-nums",
				children: String(val).padStart(2, "0")
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-1 font-mono text-[10px] tracking-widest text-muted-foreground sm:text-xs",
				children: label
			})]
		}, label))
	});
}
//#endregion
export { Countdown as t };
