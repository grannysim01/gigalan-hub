import { t as supabase } from "./client-CDZrnE22.js";
import { n as fetchRawContent, t as contentQueryKey } from "./store-DFo75fQe.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as TabsPrimitive from "@radix-ui/react-tabs";
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/components/ui/tabs.tsx
var Tabs = TabsPrimitive.Root;
var TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsPrimitive.Content.displayName;
//#endregion
//#region src/routes/admin.tsx?tsr-split=component
function AdminPage() {
	const [session, setSession] = useState(null);
	const [ready, setReady] = useState(false);
	useEffect(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			setSession(s);
			setReady(true);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setReady(true);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background px-4 py-10 text-foreground",
		children: [/* @__PURE__ */ jsx(Toaster$1, {}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-4xl",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "mb-8 flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl tracking-widest text-primary",
					children: "ADMIN"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Edits save to the live site — every visitor sees them instantly."
				})] }), session && /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => supabase.auth.signOut(),
					children: "Sign out"
				})]
			}), !ready ? null : session ? /* @__PURE__ */ jsx(Editor, {}) : /* @__PURE__ */ jsx(LoginForm, {})]
		})]
	});
}
function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState(false);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setBusy(false);
		if (error) toast.error(error.message);
	};
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: submit,
		className: "mx-auto max-w-sm space-y-4 border border-border bg-surface/40 p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsx(Label, {
					htmlFor: "email",
					children: "Email"
				}), /* @__PURE__ */ jsx(Input, {
					id: "email",
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					required: true
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsx(Label, {
					htmlFor: "password",
					children: "Password"
				}), /* @__PURE__ */ jsx(Input, {
					id: "password",
					type: "password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					required: true
				})]
			}),
			/* @__PURE__ */ jsx(Button, {
				type: "submit",
				className: "w-full",
				disabled: busy,
				children: busy ? "Signing in…" : "Sign in"
			})
		]
	});
}
function Editor() {
	const queryClient = useQueryClient();
	const [draft, setDraft] = useState(null);
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		fetchRawContent().then((c) => setDraft(structuredClone(c)));
	}, []);
	const save = async () => {
		if (!draft) return;
		setSaving(true);
		const { error } = await supabase.from("site_content").update({ data: draft }).eq("id", "main");
		setSaving(false);
		if (error) toast.error(`Save failed: ${error.message}`);
		else {
			queryClient.setQueryData(contentQueryKey, draft);
			toast.success("Saved — the live site is updated.");
		}
	};
	if (!draft) return /* @__PURE__ */ jsx("p", {
		className: "text-muted-foreground",
		children: "Loading content…"
	});
	const set = (key, value) => setDraft({
		...draft,
		[key]: value
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "sticky top-2 z-10 flex justify-end",
				children: /* @__PURE__ */ jsx(Button, {
					onClick: save,
					disabled: saving,
					className: "font-display tracking-widest",
					children: saving ? "Saving…" : "SAVE & PUBLISH"
				})
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "general",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "flex w-full flex-wrap",
						children: [
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "general",
								children: "General"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "lists",
								children: "Lists"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "people",
								children: "People & Socials"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "gallery",
								children: "Gallery"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "seating",
								children: "Seating"
							})
						]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "general",
						className: "space-y-4 border border-border bg-surface/40 p-4",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Event name",
								value: draft.eventName,
								onChange: (v) => set("eventName", v)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Tagline",
								value: draft.tagline,
								onChange: (v) => set("tagline", v)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Event date & time",
								value: draft.eventDate,
								onChange: (v) => set("eventDate", v),
								hint: "Format: 2026-07-15T17:00:00"
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Location",
								value: draft.location,
								onChange: (v) => set("location", v)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Address",
								value: draft.address,
								onChange: (v) => set("address", v)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Entry fee",
								value: draft.entryFee,
								onChange: (v) => set("entryFee", v)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Google Maps link",
								value: draft.mapsUrl,
								onChange: (v) => set("mapsUrl", v)
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Twitch channel",
								value: draft.twitchChannel,
								onChange: (v) => set("twitchChannel", v)
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, { children: "History / about text" }), /* @__PURE__ */ jsx(Textarea, {
									rows: 5,
									value: draft.history,
									onChange: (e) => set("history", e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "lists",
						className: "grid gap-4 border border-border bg-surface/40 p-4 md:grid-cols-2",
						children: [/* @__PURE__ */ jsx(ListEditor, {
							label: "What to bring (one per line)",
							items: draft.bringList,
							onChange: (v) => set("bringList", v)
						}), /* @__PURE__ */ jsx(ListEditor, {
							label: "What NOT to bring (one per line)",
							items: draft.dontBringList,
							onChange: (v) => set("dontBringList", v)
						})]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "people",
						className: "space-y-6 border border-border bg-surface/40 p-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-display tracking-widest text-primary",
									children: "ORGANIZERS"
								}),
								draft.organizers.map((o, i) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-2 border border-border p-3 md:grid-cols-2",
									children: [
										/* @__PURE__ */ jsx(Input, {
											placeholder: "Name",
											value: o.name,
											onChange: (e) => set("organizers", updateAt(draft.organizers, i, {
												...o,
												name: e.target.value
											}))
										}),
										/* @__PURE__ */ jsx(Input, {
											placeholder: "Role",
											value: o.role,
											onChange: (e) => set("organizers", updateAt(draft.organizers, i, {
												...o,
												role: e.target.value
											}))
										}),
										/* @__PURE__ */ jsx(Input, {
											placeholder: "Email",
											value: o.email,
											onChange: (e) => set("organizers", updateAt(draft.organizers, i, {
												...o,
												email: e.target.value
											}))
										}),
										/* @__PURE__ */ jsx(Input, {
											placeholder: "Phone",
											value: o.phone,
											onChange: (e) => set("organizers", updateAt(draft.organizers, i, {
												...o,
												phone: e.target.value
											}))
										}),
										/* @__PURE__ */ jsx(Button, {
											variant: "destructive",
											size: "sm",
											className: "md:col-span-2",
											onClick: () => set("organizers", draft.organizers.filter((_, j) => j !== i)),
											children: "Remove"
										})
									]
								}, i)),
								/* @__PURE__ */ jsx(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => set("organizers", [...draft.organizers, {
										name: "",
										role: "",
										email: "",
										phone: ""
									}]),
									children: "+ Add organizer"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-display tracking-widest text-primary",
									children: "SOCIAL LINKS"
								}),
								draft.socials.map((s, i) => /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ jsx(Input, {
											className: "w-40",
											placeholder: "Label",
											value: s.label,
											onChange: (e) => set("socials", updateAt(draft.socials, i, {
												...s,
												label: e.target.value
											}))
										}),
										/* @__PURE__ */ jsx(Input, {
											placeholder: "URL",
											value: s.url,
											onChange: (e) => set("socials", updateAt(draft.socials, i, {
												...s,
												url: e.target.value
											}))
										}),
										/* @__PURE__ */ jsx(Button, {
											variant: "destructive",
											size: "sm",
											onClick: () => set("socials", draft.socials.filter((_, j) => j !== i)),
											children: "✕"
										})
									]
								}, i)),
								/* @__PURE__ */ jsx(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => set("socials", [...draft.socials, {
										label: "",
										url: ""
									}]),
									children: "+ Add link"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "gallery",
						className: "space-y-3 border border-border bg-surface/40 p-4",
						children: [draft.gallery.map((g, i) => /* @__PURE__ */ jsxs("div", {
							className: "grid gap-2 border border-border p-3 md:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(Input, {
									placeholder: "Title",
									value: g.title,
									onChange: (e) => set("gallery", updateAt(draft.gallery, i, {
										...g,
										title: e.target.value
									}))
								}),
								/* @__PURE__ */ jsx(Input, {
									placeholder: "Year",
									value: g.year,
									onChange: (e) => set("gallery", updateAt(draft.gallery, i, {
										...g,
										year: e.target.value
									}))
								}),
								/* @__PURE__ */ jsx(Input, {
									className: "md:col-span-2",
									placeholder: "Image URL",
									value: g.image,
									onChange: (e) => set("gallery", updateAt(draft.gallery, i, {
										...g,
										image: e.target.value
									}))
								}),
								/* @__PURE__ */ jsx(Textarea, {
									className: "md:col-span-2",
									rows: 2,
									placeholder: "Description",
									value: g.description,
									onChange: (e) => set("gallery", updateAt(draft.gallery, i, {
										...g,
										description: e.target.value
									}))
								}),
								/* @__PURE__ */ jsx(Button, {
									variant: "destructive",
									size: "sm",
									className: "md:col-span-2",
									onClick: () => set("gallery", draft.gallery.filter((_, j) => j !== i)),
									children: "Remove"
								})
							]
						}, g.id)), /* @__PURE__ */ jsx(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => set("gallery", [...draft.gallery, {
								id: `g${Date.now()}`,
								title: "",
								year: "",
								description: "",
								image: ""
							}]),
							children: "+ Add gallery item"
						})]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "seating",
						className: "space-y-6 border border-border bg-surface/40 p-4",
						children: [/* @__PURE__ */ jsx(TablesEditor, {
							tables: draft.tables,
							onChange: (v) => set("tables", v)
						}), /* @__PURE__ */ jsx(ReservationsEditor, {
							draft,
							onChange: (v) => set("reservations", v)
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsx(Button, {
					onClick: save,
					disabled: saving,
					className: "font-display tracking-widest",
					children: saving ? "Saving…" : "SAVE & PUBLISH"
				})
			})
		]
	});
}
function Field({ label, value, onChange, hint }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsx(Input, {
				value,
				onChange: (e) => onChange(e.target.value)
			}),
			hint && /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function ListEditor({ label, items, onChange }) {
	const [text, setText] = useState(items.join("\n"));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ jsx(Label, { children: label }), /* @__PURE__ */ jsx(Textarea, {
			rows: 10,
			value: text,
			onChange: (e) => {
				setText(e.target.value);
				onChange(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean));
			}
		})]
	});
}
function TablesEditor({ tables, onChange }) {
	const rows = useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		tables.forEach((t) => {
			if (!map.has(t.row)) map.set(t.row, []);
			map.get(t.row).push(t);
		});
		for (const [, arr] of map) arr.sort((a, b) => (a.column ?? 0) - (b.column ?? 0) || a.id - b.id);
		return [...map.entries()].sort((a, b) => a[0] - b[0]);
	}, [tables]);
	const updateTable = (id, patch) => onChange(tables.map((t) => t.id === id ? {
		...t,
		...patch
	} : t));
	const removeTable = (id) => onChange(tables.filter((t) => t.id !== id));
	const addTableToRow = (row) => {
		const nextId = Math.max(0, ...tables.map((t) => t.id)) + 1;
		const inRow = tables.filter((t) => t.row === row);
		const nextCol = inRow.length ? Math.max(...inRow.map((t) => t.column ?? 0)) + 1 : 1;
		onChange([...tables, {
			id: nextId,
			row,
			column: nextCol,
			rotation: 0
		}]);
	};
	const addRow = () => {
		const nextRow = (Math.max(0, ...tables.map((t) => t.row)) || 0) + 1;
		const nextId = Math.max(0, ...tables.map((t) => t.id)) + 1;
		onChange([...tables, {
			id: nextId,
			row: nextRow,
			column: 1,
			rotation: 0
		}]);
	};
	const move = (id, dir) => {
		const t = tables.find((x) => x.id === id);
		if (!t) return;
		const siblings = tables.filter((x) => x.row === t.row).sort((a, b) => (a.column ?? 0) - (b.column ?? 0) || a.id - b.id);
		const idx = siblings.findIndex((x) => x.id === id);
		const swap = siblings[idx + dir];
		if (!swap) return;
		onChange(tables.map((x) => {
			if (x.id === t.id) return {
				...x,
				column: swap.column ?? idx + 1 + dir
			};
			if (x.id === swap.id) return {
				...x,
				column: t.column ?? idx + 1
			};
			return x;
		}));
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-display tracking-widest text-primary",
					children: "TABLES — ROWS & COLUMNS"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					size: "sm",
					onClick: addRow,
					children: "+ Add row"
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Each row renders left-to-right on the seating page. Use ◀ ▶ to reorder within a row, change Row to move a table to another row, and pick a rotation for each table."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: rows.map(([rowNum, rowTables]) => /* @__PURE__ */ jsxs("div", {
					className: "border border-border p-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "font-display text-sm tracking-widest text-primary",
							children: ["ROW ", rowNum]
						}), /* @__PURE__ */ jsx(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => addTableToRow(rowNum),
							children: "+ Add table here"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
						children: rowTables.map((t, i) => /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-2 border border-border p-2 text-sm",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "w-12 shrink-0 font-display",
									children: ["T", String(t.id).padStart(2, "0")]
								}),
								/* @__PURE__ */ jsx(Button, {
									variant: "outline",
									size: "sm",
									disabled: i === 0,
									onClick: () => move(t.id, -1),
									children: "◀"
								}),
								/* @__PURE__ */ jsx(Button, {
									variant: "outline",
									size: "sm",
									disabled: i === rowTables.length - 1,
									onClick: () => move(t.id, 1),
									children: "▶"
								}),
								/* @__PURE__ */ jsx(Label, {
									className: "text-xs text-muted-foreground",
									children: "Row"
								}),
								/* @__PURE__ */ jsx(Input, {
									type: "number",
									className: "w-16",
									value: t.row,
									onChange: (e) => updateTable(t.id, { row: Number(e.target.value) || 1 })
								}),
								/* @__PURE__ */ jsx(Label, {
									className: "text-xs text-muted-foreground",
									children: "Rot"
								}),
								/* @__PURE__ */ jsxs("select", {
									className: "h-9 border border-border bg-background px-2 text-sm",
									value: t.rotation,
									onChange: (e) => updateTable(t.id, { rotation: Number(e.target.value) }),
									children: [
										/* @__PURE__ */ jsx("option", {
											value: 0,
											children: "0°"
										}),
										/* @__PURE__ */ jsx("option", {
											value: 90,
											children: "90°"
										}),
										/* @__PURE__ */ jsx("option", {
											value: 180,
											children: "180°"
										}),
										/* @__PURE__ */ jsx("option", {
											value: 270,
											children: "270°"
										})
									]
								}),
								/* @__PURE__ */ jsx(Button, {
									variant: "destructive",
									size: "sm",
									onClick: () => removeTable(t.id),
									children: "✕"
								})
							]
						}, t.id))
					})]
				}, rowNum))
			})
		]
	});
}
function ReservationsEditor({ draft, onChange }) {
	const seatIds = useMemo(() => {
		const ids = [];
		for (const t of draft.tables) for (let s = 1; s <= 2; s++) ids.push({
			id: `T${String(t.id).padStart(2, "0")}-S${s}`,
			table: t.id,
			seat: s
		});
		return ids;
	}, [draft.tables]);
	const setSeat = (id, name) => {
		const next = { ...draft.reservations };
		if (name.trim()) next[id] = name;
		else delete next[id];
		onChange(next);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "font-display tracking-widest text-primary",
				children: "SEAT RESERVATIONS"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Type a name to reserve a seat; clear it to free the seat."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
				children: seatIds.map((s) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 border border-border p-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: `w-20 shrink-0 font-display text-xs ${draft.reservations[s.id] ? "text-destructive" : "text-primary"}`,
						children: s.id
					}), /* @__PURE__ */ jsx(Input, {
						placeholder: "Free",
						value: draft.reservations[s.id] ?? "",
						onChange: (e) => setSeat(s.id, e.target.value)
					})]
				}, s.id))
			})
		]
	});
}
function updateAt(arr, index, value) {
	return arr.map((item, i) => i === index ? value : item);
}
//#endregion
export { AdminPage as component };
