# Design: S-Club × Hessentag 2026 Landingpage

**Datum:** 2026-06-12 · **Status:** Freigegeben von Eric

## Ziel

Responsive One-Page-Landingpage für den S-Club Fulda als Aftershow-Location des
63. Hessentags (12.–21. Juni 2026). Design-Referenz ist der Event-Flyer:
schwarzer Grund, weiße Condensed-Headlines, rote Akzente, bunter S-Club-Stern,
Gold-Brush-Akzent, dezentes „FD / Foll hessisch"-Wasserzeichen-Pattern.

## Stack

Statisch, ohne Build-Tooling: `index.html` + `styles.css` + `script.js`.
Direkt im Browser zu öffnen, überall hostbar. Keine Dependencies.

## Sektionen

1. **Hero** — S-Club-Stern (SVG nachgebaut), „Hessentag im S-Club",
   12.–21. Juni 2026 in Fulda, „Aftershow-Location des 63. Hessentags".
2. **HEUTE-Banner (dynamisch)** — `script.js` prüft das aktuelle Datum gegen
   die Eventliste. An einem Eventtag: großes „HEUTE"-Highlight mit Event +
   Tages-Special (z. B. Secret Guestlist → VIP-Status + freier Eintritt).
   Sonst: nächstes Event mit Countdown. Nach dem 20.06.: Rückblick-Hinweis.
3. **Bändchen-Special** — „Trage dieses S-Club Band durchgehend und du
   erhältst bei jedem Veranstaltungstag ein Special."
4. **Lineup** — 5 Event-Karten, alle 23 Uhr:
   - Fr 12.06. Sunglasses at Night (16+)
   - Sa 13.06. Partyalarm mit Mütze Katze (18+)
   - Do 18.06. 2€ Party – The Start (16+)
   - Fr 19.06. Abiball Aftershow hosted by RMS (16+)
   - Sa 20.06. 2000er & 2010er (18+)
5. **Footer** — Platzhalter-Links für Instagram, Guestlist, Impressum,
   Datenschutz; Hinweis „Foll hessisch".

## Responsive

Mobile-first (Zielgruppe kommt per QR-Code), Karten stapeln vertikal,
große Touch-Flächen. Desktop: Grid-Layout, großzügige Typo.

## Qualitätsregeln (aus globalem CLAUDE.md)

- Keine generische AI-Ästhetik; Hover-, Focus-visible- und Active-States
  für alle klickbaren Elemente; nur `transform`/`opacity` animieren;
  CSS-Variablen für Farben.

## Offene Platzhalter

- Echte Links (Instagram, Guestlist/WhatsApp), Adresse, Impressum/Datenschutz.
- Brand-Assets: Stern wird als SVG nachgebaut; echte Dateien später in
  `brand_assets/` ablegen und ersetzen.
