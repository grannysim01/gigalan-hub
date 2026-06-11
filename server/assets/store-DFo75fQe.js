import { t as supabase } from "./client-CDZrnE22.js";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
var DEFAULT_CONTENT = {
	eventName: "GiGa-LAN",
	tagline: "Hungary's Premier LAN Party",
	eventDate: "2026-07-15T17:00:00",
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
		"Sleeping bag if you plan to crash"
	],
	dontBringList: [
		"Wireless-only peripherals as primary input",
		"Routers or DHCP servers",
		"Alcohol exceeding event policy",
		"Pets",
		"Speakers or anything loud",
		"Pirated software or game copies"
	],
	organizers: [
		{
			"name": "Márk K.",
			"role": "Event Lead",
			"email": "mark@gigalan.hu",
			"phone": "+36 20 000 0000"
		},
		{
			"name": "Zsófi B.",
			"role": "Logistics",
			"email": "zsofi@gigalan.hu",
			"phone": "+36 20 000 0001"
		},
		{
			"name": "Ádám T.",
			"role": "Network Ops",
			"email": "adam@gigalan.hu",
			"phone": "+36 20 000 0002"
		}
	],
	socials: [
		{
			"label": "Discord",
			"url": "https://discord.gg/"
		},
		{
			"label": "Twitch",
			"url": "https://twitch.tv/gigalanhun"
		},
		{
			"label": "Instagram",
			"url": "https://instagram.com/"
		},
		{
			"label": "YouTube",
			"url": "https://youtube.com/"
		},
		{
			"label": "Email",
			"url": "mailto:hello@gigalan.hu"
		}
	],
	history: "GiGa-LAN started in 2018 as a small basement get-together of six friends. Six years later it's grown into one of Hungary's most loved LAN parties — a tight-knit community of players, streamers and tinkerers who meet every season to play, build, and just hang out IRL.",
	gallery: [
		{
			"id": "g1",
			"title": "GiGa-LAN Winter '24",
			"year": "2024",
			"description": "Sold out in 48 hours. 46 seats, three nights of CS2, Valorant and Mario Kart finals.",
			"image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=70"
		},
		{
			"id": "g2",
			"title": "GiGa-LAN Summer '23",
			"year": "2023",
			"description": "Our biggest outdoor-rooftop edition. Pizza tower record: 14 boxes in 9 minutes.",
			"image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=70"
		},
		{
			"id": "g3",
			"title": "GiGa-LAN '22 Anniversary",
			"year": "2022",
			"description": "Five years of GiGa. Custom trophies, custom cake, custom rage.",
			"image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&q=70"
		},
		{
			"id": "g4",
			"title": "First GiGa-LAN",
			"year": "2018",
			"description": "Six friends, one basement, three power strips. The origin.",
			"image": "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=70"
		}
	],
	tables: [
		{
			"id": 1,
			"row": 1,
			"rotation": 0
		},
		{
			"id": 2,
			"row": 1,
			"rotation": 0
		},
		{
			"id": 3,
			"row": 1,
			"rotation": 0
		},
		{
			"id": 4,
			"row": 1,
			"rotation": 0
		},
		{
			"id": 5,
			"row": 1,
			"rotation": 0
		},
		{
			"id": 6,
			"row": 1,
			"rotation": 0
		},
		{
			"id": 7,
			"row": 2,
			"rotation": 0
		},
		{
			"id": 8,
			"row": 2,
			"rotation": 0
		},
		{
			"id": 9,
			"row": 2,
			"rotation": 0
		},
		{
			"id": 10,
			"row": 2,
			"rotation": 0
		},
		{
			"id": 11,
			"row": 2,
			"rotation": 0
		},
		{
			"id": 12,
			"row": 2,
			"rotation": 0
		},
		{
			"id": 13,
			"row": 3,
			"rotation": 0
		},
		{
			"id": 14,
			"row": 3,
			"rotation": 0
		},
		{
			"id": 15,
			"row": 3,
			"rotation": 0
		},
		{
			"id": 16,
			"row": 3,
			"rotation": 0
		},
		{
			"id": 17,
			"row": 3,
			"rotation": 0
		},
		{
			"id": 18,
			"row": 3,
			"rotation": 0
		},
		{
			"id": 19,
			"row": 4,
			"rotation": 0
		},
		{
			"id": 20,
			"row": 4,
			"rotation": 0
		},
		{
			"id": 21,
			"row": 4,
			"rotation": 0
		},
		{
			"id": 22,
			"row": 4,
			"rotation": 0
		},
		{
			"id": 23,
			"row": 4,
			"rotation": 0
		}
	],
	reservations: {}
};
function buildSeats(c) {
	const reservations = c.reservations ?? {};
	const out = [];
	for (const t of c.tables) for (let s = 1; s <= 2; s++) {
		const id = `T${String(t.id).padStart(2, "0")}-S${s}`;
		out.push({
			id,
			table: t.id,
			seat: s,
			reservedBy: reservations[id] ?? null
		});
	}
	return out;
}
function toSiteContent(c) {
	const { reservations: _r, ...rest } = c;
	return {
		...rest,
		seats: buildSeats(c)
	};
}
async function fetchRawContent() {
	const { data, error } = await supabase.from("site_content").select("data").eq("id", "main").maybeSingle();
	if (error || !data) return DEFAULT_CONTENT;
	return data.data;
}
var contentQueryKey = ["site-content"];
function useRawContent() {
	const { data } = useQuery({
		queryKey: contentQueryKey,
		queryFn: fetchRawContent,
		staleTime: 6e4
	});
	return data ?? DEFAULT_CONTENT;
}
function useContent() {
	return { content: toSiteContent(useRawContent()) };
}
/** Subscribe once (in the layout) so every visitor sees admin edits live. */
function useContentRealtime() {
	const queryClient = useQueryClient();
	useEffect(() => {
		const channel = supabase.channel("site-content-changes").on("postgres_changes", {
			event: "UPDATE",
			schema: "public",
			table: "site_content"
		}, (payload) => {
			const next = payload.new?.data;
			if (next) queryClient.setQueryData(contentQueryKey, next);
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [queryClient]);
}
//#endregion
export { useContentRealtime as i, fetchRawContent as n, useContent as r, contentQueryKey as t };
