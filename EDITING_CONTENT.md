# Editing your site content

All editable text, lists, organizers, gallery items, table layout and seat
reservations live in **one file**: `src/content.json`.

To change anything on the live site:

1. Open `src/content.json`
2. Edit the value (keep the quotes and commas exactly as they are — it's JSON)
3. Save, commit, and redeploy

That's it. No admin page, no login, no database.

## Reserving a seat

Seats are identified as `T01-S1`, `T01-S2`, `T02-S1`, ... (table number, seat number).

To mark a seat as reserved, add an entry under `"reservations"`:

```json
"reservations": {
  "T01-S1": "Márk K.",
  "T05-S2": "Zsófi B."
}
```

Seats not listed there are shown as free (green). Listed seats show red with the name.

## Adding or removing a table

Edit the `"tables"` array. Each table needs:

- `id` — a unique number
- `row` — which row it sits in (1, 2, 3, ...)
- `rotation` — `0`, `90`, `180`, or `270`

Every table automatically gets 2 seats (`S1` and `S2`).

## Common edits

- **Event date** — `"eventDate"` (format: `YYYY-MM-DDTHH:MM:SS`)
- **Address / map link** — `"address"` and `"mapsUrl"`
- **What (not) to bring** — `"bringList"` / `"dontBringList"` arrays
- **Organizers / socials** — `"organizers"` / `"socials"` arrays
- **Gallery items** — `"gallery"` array

## Heads up: JSON syntax

- Use double quotes `"like this"`, never single quotes
- Separate items with commas, but **no trailing comma** after the last item
- If the site fails to build after an edit, you probably have a stray or missing comma
