// Content is loaded from src/content.json. To change anything on the site —
// event date, lists, organizers, gallery items, table layout, seat
// reservations — edit src/content.json and redeploy. There is no admin UI.
import raw from "@/content.json";

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

export interface SiteContent {
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
  seats: Seat[];
}

const SEATS_PER_TABLE = 2;

// Build seat list from `tables` + `reservations` map in content.json.
// reservations key format: "T01-S1": "Player name"
function buildSeats(): Seat[] {
  const reservations = (raw as { reservations?: Record<string, string> }).reservations ?? {};
  const out: Seat[] = [];
  for (const t of (raw as { tables: TableLayout[] }).tables) {
    for (let s = 1; s <= SEATS_PER_TABLE; s++) {
      const id = `T${String(t.id).padStart(2, "0")}-S${s}`;
      out.push({
        id,
        table: t.id,
        seat: s,
        reservedBy: reservations[id] ?? null,
      });
    }
  }
  return out;
}

const content: SiteContent = {
  ...(raw as Omit<SiteContent, "seats">),
  seats: buildSeats(),
};

export function useContent() {
  return { content };
}
