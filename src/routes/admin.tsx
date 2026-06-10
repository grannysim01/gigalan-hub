import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { useContent, useAdminSession, type SiteContent } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — GiGa-LAN" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { content, update, reset } = useContent();
  const { authed, login, logout } = useAdminSession();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  if (!authed) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-md px-4 py-20">
          <div className="border border-border bg-surface/60 p-8 clip-corner">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">/ restricted</div>
            <h1 className="mt-1 font-display text-3xl">Admin login</h1>
            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!login(u, p, content)) setErr("Invalid credentials");
              }}
            >
              <input className="w-full border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-primary"
                     placeholder="Username" value={u} onChange={(e) => setU(e.target.value)} />
              <input type="password" className="w-full border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-primary"
                     placeholder="Password" value={p} onChange={(e) => setP(e.target.value)} />
              {err && <div className="text-sm text-destructive">{err}</div>}
              <button className="w-full bg-primary px-4 py-3 font-display text-sm tracking-widest text-primary-foreground clip-corner">Sign in</button>
            </form>
            <p className="mt-4 font-mono text-xs text-muted-foreground">Default: admin / gigalan2026</p>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">/ control panel</div>
            <h1 className="mt-1 font-display text-4xl">Admin</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { if (confirm("Reset all content & seats?")) reset(); }}
                    className="border border-destructive/60 px-4 py-2 font-display text-sm tracking-widest text-destructive hover:bg-destructive/10">Reset all</button>
            <button onClick={logout} className="border border-border px-4 py-2 font-display text-sm tracking-widest hover:border-primary">Sign out</button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card title="Event basics">
            <Field label="Event name" value={content.eventName} onChange={(v) => update({ eventName: v })} />
            <Field label="Tagline" value={content.tagline} onChange={(v) => update({ tagline: v })} />
            <Field label="Event date (ISO)" value={content.eventDate} onChange={(v) => update({ eventDate: v })} hint="e.g. 2026-07-15T17:00:00" />
            <Field label="Location" value={content.location} onChange={(v) => update({ location: v })} />
            <Field label="Address" value={content.address} onChange={(v) => update({ address: v })} />
            <Field label="Entry fee" value={content.entryFee} onChange={(v) => update({ entryFee: v })} />
            <Field label="Google Maps URL" value={content.mapsUrl} onChange={(v) => update({ mapsUrl: v })} />
            <Field label="Twitch channel" value={content.twitchChannel} onChange={(v) => update({ twitchChannel: v })} />
          </Card>

          <Card title="History">
            <TextArea value={content.history} onChange={(v) => update({ history: v })} />
          </Card>

          <Card title="What to bring">
            <ListEditor items={content.bringList} onChange={(v) => update({ bringList: v })} />
          </Card>
          <Card title="What NOT to bring">
            <ListEditor items={content.dontBringList} onChange={(v) => update({ dontBringList: v })} />
          </Card>

          <Card title="Organizers">
            <ObjectListEditor
              items={content.organizers}
              fields={["name", "role", "email", "phone"]}
              onChange={(v) => update({ organizers: v as SiteContent["organizers"] })}
              empty={{ name: "", role: "", email: "", phone: "" }}
            />
          </Card>

          <Card title="Social media">
            <ObjectListEditor
              items={content.socials}
              fields={["label", "url"]}
              onChange={(v) => update({ socials: v as SiteContent["socials"] })}
              empty={{ label: "", url: "" }}
            />
          </Card>

          <Card title="Gallery">
            <ObjectListEditor
              items={content.gallery}
              fields={["title", "year", "description", "image"]}
              onChange={(v) => update({ gallery: v.map((g, i) => ({ id: (g as { id?: string }).id ?? `g${i}-${Date.now()}`, ...g })) as SiteContent["gallery"] })}
              empty={{ title: "", year: "", description: "", image: "" }}
            />
          </Card>

          <Card title="Seats">
            <p className="text-sm text-muted-foreground">Clear individual reservations.</p>
            <div className="mt-3 max-h-72 overflow-y-auto border border-border">
              {content.seats.filter((s) => s.reservedBy).length === 0 && (
                <div className="p-4 text-sm text-muted-foreground">No reservations yet.</div>
              )}
              {content.seats.filter((s) => s.reservedBy).map((s) => (
                <div key={s.id} className="flex items-center justify-between border-b border-border px-3 py-2 text-sm last:border-0">
                  <span className="font-mono">{s.id}</span>
                  <span className="flex-1 px-3">{s.reservedBy}</span>
                  <button onClick={() => update((c) => ({ ...c, seats: c.seats.map((x) => x.id === s.id ? { ...x, reservedBy: null } : x) }))}
                          className="text-xs text-destructive hover:underline">clear</button>
                </div>
              ))}
            </div>
            <button onClick={() => { if (confirm("Clear ALL reservations?")) update((c) => ({ ...c, seats: c.seats.map((s) => ({ ...s, reservedBy: null })) })); }}
                    className="mt-3 border border-destructive/60 px-3 py-2 text-xs uppercase tracking-widest text-destructive hover:bg-destructive/10">
              Clear all reservations
            </button>
          </Card>

          <Card title="Admin credentials">
            <Field label="Username" value={content.admin.username} onChange={(v) => update({ admin: { ...content.admin, username: v } })} />
            <Field label="Password" value={content.admin.password} onChange={(v) => update({ admin: { ...content.admin, password: v } })} />
            <p className="mt-2 font-mono text-xs text-muted-foreground">Stored locally in this browser. Use a real backend before going public.</p>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-surface/40 p-5 clip-corner">
      <h3 className="font-display text-xl text-primary">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}
function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)}
             className="mt-1 w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
      {hint && <span className="mt-1 block text-[10px] text-muted-foreground">{hint}</span>}
    </label>
  );
}
function TextArea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={6}
              className="w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
  );
}
function ListEditor({ items, onChange }: { items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2">
          <input value={it} onChange={(e) => { const c = [...items]; c[i] = e.target.value; onChange(c); }}
                 className="flex-1 border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="border border-border px-3 text-destructive hover:border-destructive">✕</button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])} className="border border-primary/60 px-3 py-2 text-xs uppercase tracking-widest text-primary hover:bg-primary/10">+ Add</button>
    </div>
  );
}
function ObjectListEditor<T extends Record<string, string>>({ items, fields, onChange, empty }: { items: T[]; fields: (keyof T)[]; onChange: (v: T[]) => void; empty: T }) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="border border-border bg-background/40 p-3">
          <div className="grid gap-2 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={String(f)} className="block">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{String(f)}</span>
                <input value={(it[f] as string) ?? ""} onChange={(e) => { const c = [...items]; c[i] = { ...c[i], [f]: e.target.value }; onChange(c); }}
                       className="mt-1 w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
              </label>
            ))}
          </div>
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="mt-2 text-xs text-destructive hover:underline">remove</button>
        </div>
      ))}
      <button onClick={() => onChange([...items, { ...empty }])} className="border border-primary/60 px-3 py-2 text-xs uppercase tracking-widest text-primary hover:bg-primary/10">+ Add</button>
    </div>
  );
}
