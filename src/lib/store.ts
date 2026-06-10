// Browser-only mock store backed by localStorage. Replace with a real backend later.
import { useEffect, useState, useCallback } from "react";

const KEY = "gigalan:state:v1";

export interface Seat {
  id: string;           // "T01-S1"
  table: number;        // 1-23
  seat: number;         // 1-2
  reservedBy: string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
}

export interface SiteContent {
  eventName: string;
  tagline: string;
  eventDate: string;       // ISO
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
  seats: Seat[];
  tables: TableLayout[];
  admin: { username: string; password: string };
}

export interface TableLayout {
  id: number;
  row: number;
  rotation: 0 | 90 | 180 | 270;
}

const TABLES = 23;
const SEATS_PER_TABLE = 2;

function defaultSeats(): Seat[] {
  const out: Seat[] = [];
  for (let t = 1; t <= TABLES; t++) {
    for (let s = 1; s <= SEATS_PER_TABLE; s++) {
      out.push({ id: `T${String(t).padStart(2, "0")}-S${s}`, table: t, seat: s, reservedBy: null });
    }
  }
  return out;
}

function defaultTables(): TableLayout[] {
  const out: TableLayout[] = [];
  const perRow = [6, 6, 6, 5];
  let id = 1;
  perRow.forEach((count, rowIdx) => {
    for (let i = 0; i < count; i++) out.push({ id: id++, row: rowIdx + 1, rotation: 0 });
  });
  return out;
}

export const defaultContent: SiteContent = {
  eventName: "GiGa-LAN",
  tagline: "Hungary's Premier LAN Party",
  eventDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
  location: "Community Hall, Budapest",
  address: "Példa utca 12, 1052 Budapest, Hungary",
  entryFee: "8 000 HUF / weekend",
  mapsUrl: "https://maps.google.com/?q=Budapest",
  twitchChannel: "gigalanhun",
  bringList: [
    "Your PC / laptop and monitor",
    "Power strip & extension cord (min. 3m)",
    "Ethernet cable (min. 5m, Cat6 recommended)",
    "Headphones — closed-back preferred",
    "Mouse, keyboard, mousepad",
    "Government-issued ID",
    "Snacks, drinks, energy",
    "Sleeping bag if you plan to crash",
  ],
  dontBringList: [
    "Wireless-only peripherals as primary input",
    "Routers or DHCP servers",
    "Alcohol exceeding event policy",
    "Pets",
    "Speakers or anything loud",
    "Pirated software or game copies",
  ],
  organizers: [
    { name: "Márk K.", role: "Event Lead", email: "mark@gigalan.hu", phone: "+36 20 000 0000" },
    { name: "Zsófi B.", role: "Logistics", email: "zsofi@gigalan.hu", phone: "+36 20 000 0001" },
    { name: "Ádám T.", role: "Network Ops", email: "adam@gigalan.hu", phone: "+36 20 000 0002" },
  ],
  socials: [
    { label: "Discord", url: "https://discord.gg/" },
    { label: "Twitch", url: "https://twitch.tv/gigalanhun" },
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "YouTube", url: "https://youtube.com/" },
    { label: "Email", url: "mailto:hello@gigalan.hu" },
  ],
  history: "GiGa-LAN started in 2018 as a small basement get-together of six friends. Six years later it's grown into one of Hungary's most loved LAN parties — a tight-knit community of players, streamers and tinkerers who meet every season to play, build, and just hang out IRL.",
  gallery: [
    { id: "g1", title: "GiGa-LAN Winter '24", year: "2024", description: "Sold out in 48 hours. 46 seats, three nights of CS2, Valorant and Mario Kart finals.", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=70" },
    { id: "g2", title: "GiGa-LAN Summer '23", year: "2023", description: "Our biggest outdoor-rooftop edition. Pizza tower record: 14 boxes in 9 minutes.", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=70" },
    { id: "g3", title: "GiGa-LAN '22 Anniversary", year: "2022", description: "Five years of GiGa. Custom trophies, custom cake, custom rage.", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=70" },
    { id: "g4", title: "First GiGa-LAN", year: "2018", description: "Six friends, one basement, three power strips. The origin.", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=70" },
  ],
  seats: defaultSeats(),
  tables: defaultTables(),
  admin: { username: "admin", password: "gigalan2026" },
};

function load(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw);
    return { ...defaultContent, ...parsed, seats: parsed.seats?.length ? parsed.seats : defaultContent.seats };
  } catch { return defaultContent; }
}

function save(c: SiteContent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(c));
  window.dispatchEvent(new Event("gigalan:update"));
}

export function useContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => {
    setContent(load());
    const h = () => setContent(load());
    window.addEventListener("gigalan:update", h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener("gigalan:update", h); window.removeEventListener("storage", h); };
  }, []);
  const update = useCallback((patch: Partial<SiteContent> | ((c: SiteContent) => SiteContent)) => {
    const cur = load();
    const next = typeof patch === "function" ? patch(cur) : { ...cur, ...patch };
    save(next);
    setContent(next);
  }, []);
  const reset = useCallback(() => { save(defaultContent); setContent(defaultContent); }, []);
  return { content, update, reset };
}

// Admin session (browser only, mock — do not treat as real security)
const SESSION_KEY = "gigalan:admin:v1";
export function useAdminSession() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => { setAuthed(typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1"); }, []);
  const login = (u: string, p: string, content: SiteContent) => {
    if (u === content.admin.username && p === content.admin.password) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };
  const logout = () => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); };
  return { authed, login, logout };
}
