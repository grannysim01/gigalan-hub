// Site content lives in the backend database (table: site_content, row 'main').
// The admin page (/admin) edits it live; all visitors see updates in real time.
// src/content.json is only the fallback/default while the first load happens.
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import raw from "@/content.json";
import { supabase } from "@/integrations/supabase/client";

export interface Seat {
  id: string;
  table: number;
  seat: number;
  reservedBy: string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
}

export interface TableLayout {
  id: number;
  row: number;
  rotation: 0 | 90 | 180 | 270;
}

export interface RawContent {
  eventName: string;
  tagline: string;
  eventDate: string;
  location: string;
  address: string;
  entryFee: string;
  mapsUrl: string;
  twitchChannel: string;
  bringList: string[];
  dontBringList: string[];
  organizers: { name: string; role: string; email: string; phone: string }[];
  socials: { label: string; url: string }[];
  history: string;
  gallery: GalleryItem[];
  tables: TableLayout[];
  reservations: Record<string, string>;
}

export interface SiteContent extends Omit<RawContent, "reservations"> {
  seats: Seat[];
}

export const SEATS_PER_TABLE = 2;

export const DEFAULT_CONTENT: RawContent = raw as unknown as RawContent;

export function buildSeats(c: RawContent): Seat[] {
  const reservations = c.reservations ?? {};
  const out: Seat[] = [];
  for (const t of c.tables) {
    for (let s = 1; s <= SEATS_PER_TABLE; s++) {
      const id = `T${String(t.id).padStart(2, "0")}-S${s}`;
      out.push({ id, table: t.id, seat: s, reservedBy: reservations[id] ?? null });
    }
  }
  return out;
}

export function toSiteContent(c: RawContent): SiteContent {
  const { reservations: _r, ...rest } = c;
  return { ...rest, seats: buildSeats(c) };
}

export async function fetchRawContent(): Promise<RawContent> {
  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("id", "main")
    .maybeSingle();
  if (error || !data) return DEFAULT_CONTENT;
  return data.data as unknown as RawContent;
}

export const contentQueryKey = ["site-content"] as const;

export function useRawContent() {
  const { data } = useQuery({
    queryKey: contentQueryKey,
    queryFn: fetchRawContent,
    staleTime: 60_000,
  });
  return data ?? DEFAULT_CONTENT;
}

export function useContent() {
  const rawContent = useRawContent();
  return { content: toSiteContent(rawContent) };
}

/** Subscribe once (in the layout) so every visitor sees admin edits live. */
export function useContentRealtime() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("site-content-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "site_content" },
        (payload) => {
          const next = (payload.new as { data?: unknown })?.data;
          if (next) queryClient.setQueryData(contentQueryKey, next as RawContent);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
