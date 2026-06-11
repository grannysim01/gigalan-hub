import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  DEFAULT_CONTENT,
  SEATS_PER_TABLE,
  contentQueryKey,
  fetchRawContent,
  type GalleryItem,
  type RawContent,
  type TableLayout,
} from "@/lib/store";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
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

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground">
      <Toaster />
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-widest text-primary">ADMIN</h1>
            <p className="text-sm text-muted-foreground">
              Edits save to the live site — every visitor sees them instantly.
            </p>
          </div>
          {session && (
            <Button variant="outline" onClick={() => supabase.auth.signOut()}>
              Sign out
            </Button>
          )}
        </header>
        {!ready ? null : session ? <Editor /> : <LoginForm />}
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 border border-border bg-surface/40 p-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

function Editor() {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<RawContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRawContent().then((c) => setDraft(structuredClone(c)));
  }, []);

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .update({ data: draft as never })
      .eq("id", "main");
    setSaving(false);
    if (error) {
      toast.error(`Save failed: ${error.message}`);
    } else {
      queryClient.setQueryData(contentQueryKey, draft);
      toast.success("Saved — the live site is updated.");
    }
  };

  if (!draft) return <p className="text-muted-foreground">Loading content…</p>;

  const set = <K extends keyof RawContent>(key: K, value: RawContent[K]) =>
    setDraft({ ...draft, [key]: value });

  return (
    <div className="space-y-6">
      <div className="sticky top-2 z-10 flex justify-end">
        <Button onClick={save} disabled={saving} className="font-display tracking-widest">
          {saving ? "Saving…" : "SAVE & PUBLISH"}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="flex w-full flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="lists">Lists</TabsTrigger>
          <TabsTrigger value="people">People & Socials</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="seating">Seating</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 border border-border bg-surface/40 p-4">
          <Field label="Event name" value={draft.eventName} onChange={(v) => set("eventName", v)} />
          <Field label="Tagline" value={draft.tagline} onChange={(v) => set("tagline", v)} />
          <Field label="Event date & time" value={draft.eventDate} onChange={(v) => set("eventDate", v)} hint="Format: 2026-07-15T17:00:00" />
          <Field label="Location" value={draft.location} onChange={(v) => set("location", v)} />
          <Field label="Address" value={draft.address} onChange={(v) => set("address", v)} />
          <Field label="Entry fee" value={draft.entryFee} onChange={(v) => set("entryFee", v)} />
          <Field label="Google Maps link" value={draft.mapsUrl} onChange={(v) => set("mapsUrl", v)} />
          <Field label="Twitch channel" value={draft.twitchChannel} onChange={(v) => set("twitchChannel", v)} />
          <div className="space-y-2">
            <Label>History / about text</Label>
            <Textarea rows={5} value={draft.history} onChange={(e) => set("history", e.target.value)} />
          </div>
        </TabsContent>

        <TabsContent value="lists" className="grid gap-4 border border-border bg-surface/40 p-4 md:grid-cols-2">
          <ListEditor label="What to bring (one per line)" items={draft.bringList} onChange={(v) => set("bringList", v)} />
          <ListEditor label="What NOT to bring (one per line)" items={draft.dontBringList} onChange={(v) => set("dontBringList", v)} />
        </TabsContent>

        <TabsContent value="people" className="space-y-6 border border-border bg-surface/40 p-4">
          <div className="space-y-3">
            <h3 className="font-display tracking-widest text-primary">ORGANIZERS</h3>
            {draft.organizers.map((o, i) => (
              <div key={i} className="grid gap-2 border border-border p-3 md:grid-cols-2">
                <Input placeholder="Name" value={o.name} onChange={(e) => set("organizers", updateAt(draft.organizers, i, { ...o, name: e.target.value }))} />
                <Input placeholder="Role" value={o.role} onChange={(e) => set("organizers", updateAt(draft.organizers, i, { ...o, role: e.target.value }))} />
                <Input placeholder="Email" value={o.email} onChange={(e) => set("organizers", updateAt(draft.organizers, i, { ...o, email: e.target.value }))} />
                <Input placeholder="Phone" value={o.phone} onChange={(e) => set("organizers", updateAt(draft.organizers, i, { ...o, phone: e.target.value }))} />
                <Button variant="destructive" size="sm" className="md:col-span-2" onClick={() => set("organizers", draft.organizers.filter((_, j) => j !== i))}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => set("organizers", [...draft.organizers, { name: "", role: "", email: "", phone: "" }])}>
              + Add organizer
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="font-display tracking-widest text-primary">SOCIAL LINKS</h3>
            {draft.socials.map((s, i) => (
              <div key={i} className="flex gap-2">
                <Input className="w-40" placeholder="Label" value={s.label} onChange={(e) => set("socials", updateAt(draft.socials, i, { ...s, label: e.target.value }))} />
                <Input placeholder="URL" value={s.url} onChange={(e) => set("socials", updateAt(draft.socials, i, { ...s, url: e.target.value }))} />
                <Button variant="destructive" size="sm" onClick={() => set("socials", draft.socials.filter((_, j) => j !== i))}>
                  ✕
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => set("socials", [...draft.socials, { label: "", url: "" }])}>
              + Add link
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-3 border border-border bg-surface/40 p-4">
          {draft.gallery.map((g, i) => (
            <div key={g.id} className="grid gap-2 border border-border p-3 md:grid-cols-2">
              <Input placeholder="Title" value={g.title} onChange={(e) => set("gallery", updateAt(draft.gallery, i, { ...g, title: e.target.value }))} />
              <Input placeholder="Year" value={g.year} onChange={(e) => set("gallery", updateAt(draft.gallery, i, { ...g, year: e.target.value }))} />
              <Input className="md:col-span-2" placeholder="Image URL" value={g.image} onChange={(e) => set("gallery", updateAt(draft.gallery, i, { ...g, image: e.target.value }))} />
              <Textarea className="md:col-span-2" rows={2} placeholder="Description" value={g.description} onChange={(e) => set("gallery", updateAt(draft.gallery, i, { ...g, description: e.target.value }))} />
              <Button variant="destructive" size="sm" className="md:col-span-2" onClick={() => set("gallery", draft.gallery.filter((_, j) => j !== i))}>
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              set("gallery", [
                ...draft.gallery,
                { id: `g${Date.now()}`, title: "", year: "", description: "", image: "" } satisfies GalleryItem,
              ])
            }
          >
            + Add gallery item
          </Button>
        </TabsContent>

        <TabsContent value="seating" className="space-y-6 border border-border bg-surface/40 p-4">
          <TablesEditor tables={draft.tables} onChange={(v) => set("tables", v)} />
          <ReservationsEditor draft={draft} onChange={(v) => set("reservations", v)} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving} className="font-display tracking-widest">
          {saving ? "Saving…" : "SAVE & PUBLISH"}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  const [text, setText] = useState(items.join("\n"));
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        rows={10}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean));
        }}
      />
    </div>
  );
}

function TablesEditor({ tables, onChange }: { tables: TableLayout[]; onChange: (v: TableLayout[]) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-display tracking-widest text-primary">TABLES</h3>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t, i) => (
          <div key={t.id} className="flex items-center gap-2 border border-border p-2 text-sm">
            <span className="w-12 shrink-0 font-display">T{String(t.id).padStart(2, "0")}</span>
            <Label className="text-xs text-muted-foreground">Row</Label>
            <Input
              type="number"
              className="w-16"
              value={t.row}
              onChange={(e) => onChange(updateAt(tables, i, { ...t, row: Number(e.target.value) || 1 }))}
            />
            <Button variant="destructive" size="sm" onClick={() => onChange(tables.filter((_, j) => j !== i))}>
              ✕
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const nextId = Math.max(0, ...tables.map((t) => t.id)) + 1;
          const lastRow = tables.length ? tables[tables.length - 1].row : 1;
          onChange([...tables, { id: nextId, row: lastRow, rotation: 0 }]);
        }}
      >
        + Add table
      </Button>
    </div>
  );
}

function ReservationsEditor({ draft, onChange }: { draft: RawContent; onChange: (v: Record<string, string>) => void }) {
  const seatIds = useMemo(() => {
    const ids: { id: string; table: number; seat: number }[] = [];
    for (const t of draft.tables) {
      for (let s = 1; s <= SEATS_PER_TABLE; s++) {
        ids.push({ id: `T${String(t.id).padStart(2, "0")}-S${s}`, table: t.id, seat: s });
      }
    }
    return ids;
  }, [draft.tables]);

  const setSeat = (id: string, name: string) => {
    const next = { ...draft.reservations };
    if (name.trim()) next[id] = name;
    else delete next[id];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-display tracking-widest text-primary">SEAT RESERVATIONS</h3>
      <p className="text-xs text-muted-foreground">Type a name to reserve a seat; clear it to free the seat.</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {seatIds.map((s) => (
          <div key={s.id} className="flex items-center gap-2 border border-border p-2">
            <span className={`w-20 shrink-0 font-display text-xs ${draft.reservations[s.id] ? "text-destructive" : "text-primary"}`}>
              {s.id}
            </span>
            <Input
              placeholder="Free"
              value={draft.reservations[s.id] ?? ""}
              onChange={(e) => setSeat(s.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function updateAt<T>(arr: T[], index: number, value: T): T[] {
  return arr.map((item, i) => (i === index ? value : item));
}
