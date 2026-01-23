# Anno 1728 Website - Todoliste

Diese Todoliste dokumentiert alle offenen Aufgaben für die Website anno-1728.de.

---

## Dringend (Funktionalität/Rechtliches)

- [x] **Smoobu-Buchungslink einbauen** - `https://fewoseibert.smoobu.net/en/` auf Buchungsseite und CTA-Buttons
- [x] **Impressum erstellen** - Pflicht für deutsche Websites (Name, Adresse, Kontakt, ggf. Steuernummer)
- [x] **Datenschutz erstellen** - Pflicht nach DSGVO
- [x] **Englische Version** - Alle Seiten auf Englisch übersetzen (siehe Abschnitt unten)
- [x] **12 Blog-Artikel migrieren** - Von anno-1728.de übernommen
- [x] **Favicon erstellen** - Eigenes Icon statt Astro-Standard
- [x] **Impressionen-Seite** - Bildergalerie mit ~25 Fotos von der alten Website
- [x] **Kontaktformular mit E-Mail** - Implementiert mit Nodemailer/SMTP (siehe Abschnitt unten)
- [x] **E-Mail-Adresse auf Website anzeigen** - `info@anno1728-ferienhaus-wiesbaden.de` auf Kontaktseite

---

## Wichtig (SEO & Qualität)

- [x] **Sprachumschalter** - DE/EN Toggle im Header
- [x] ~~**Social Media Links**~~ - Entfällt
- [x] **Meta-Tags hinzufügen** - Description, Open Graph Tags in Layout.astro
- [x] **Alt-Texte verbessern** - Beschreibende Texte für alle Galerie-Bilder (DE + EN)
- [x] **Sitemap.xml** - Astro-Plugin `@astrojs/sitemap` eingebunden
- [x] **Geschichte ergänzen** - Hinweis auf niedrige Deckenbalken (Vorsicht bei >1,75m)

---

## Essen-Seite korrigieren

- [x] **Firenze entfernen** - Restaurant existiert nicht mehr
- [x] **Milchbar hinzufügen** - Bahnhofstr. 1, 65527 Niedernhausen (Frühstück)
- [x] **Restaurant Ente hinzufügen** - Wiesbadener Institution, gehobene Küche

---

## Bilder für "Alter Speicher"

Aktuell hat die Seite `/alter-speicher/` nur **ein einziges Bild**. Es werden mehr benötigt!

### Bildquelle

**Smoobu-Listing (für Helene):**
https://fewoseibert.smoobu.net/en/apartment/AlterSpeicher/909940

→ Bilder dort herunterladen und in `/public/images/alter-speicher/` ablegen

### Aufgaben

- [x] **Bilder bereitgestellt** - 13 HEIF-Bilder aus ZIP-Datei nach JPEG konvertiert
- [x] **Bilder optimieren** - JPEG-Format, in `/public/speicher/` abgelegt
- [x] **Bildergalerie einbauen** - Wie beim Vorderhaus (Slideshow)
- [x] **Lightbox hinzugefügt** - Vollbild-Ansicht für beide Galerien (Vorderhaus + Alter Speicher)
- [x] **Alt-Texte schreiben** - Beschreibende Texte für jedes Bild

### Benötigte Motive

- [x] Schlafbereich
- [x] Küche/Kochnische
- [x] Badezimmer
- [x] Wohnbereich
- [x] Außenansicht/Eingang
- [x] Details (Möbel, Dekoration)

---

## Performance (Bildoptimierung)

Aktuell liegen alle Bilder im `/public/`-Ordner und werden **nicht optimiert** ausgeliefert. Astro kann Bilder automatisch komprimieren und in moderne Formate (WebP/AVIF) konvertieren.

### Aufgaben

- [ ] **Bilder nach `src/assets/` verschieben** - Statt `/public/` für automatische Optimierung
- [ ] **Astro `<Image>` Komponente nutzen** - Import von `astro:assets` statt `<img>` Tags
- [ ] **Responsive Bilder** - `srcset` für verschiedene Bildschirmgrößen generieren
- [ ] **Lazy Loading** - Bilder unterhalb des sichtbaren Bereichs verzögert laden

### Betroffene Dateien

- `/public/speicher/*.jpg` → `/src/assets/speicher/`
- `/public/gallery-*.jpg` → `/src/assets/gallery/`
- `/public/images/blog/*` → `/src/assets/blog/`
- Alle Seiten mit `<img>` Tags

### Technische Umsetzung

```astro
---
import { Image } from 'astro:assets';
import speicherImg from '../assets/speicher/IMG_9763.jpg';
---

<Image src={speicherImg} alt="Beschreibung" width={800} />
```

---

## Nice-to-have (UX)

- [x] **Mobiles Hamburger-Menü** - Implementiert in Layout.astro
- [x] **404-Seite** - Zweisprachige Fehlerseite mit automatischer Spracherkennung
- [x] **README.md** - Projektdokumentation mit Setup-Anleitung

---

## Englische Version

### URL-Struktur

| Seite | DE | EN |
|-------|-----|-----|
| Startseite | `/` | `/en/` |
| Vorderhaus | `/vorderhaus/` | `/en/front-house/` |
| Alter Speicher | `/alter-speicher/` | `/en/old-barn/` |
| Geschichte | `/geschichte/` | `/en/history/` |
| Ausflüge | `/ausfluege/` | `/en/excursions/` |
| Essen | `/essen/` | `/en/dining/` |
| Buchungen | `/buchungen/` | `/en/booking/` |
| Kontakt | `/kontakt/` | `/en/contact/` |
| Impressum | `/impressum/` | `/en/imprint/` |
| Datenschutz | `/datenschutz/` | `/en/privacy/` |
| Blog | `/blog/...` | `/en/blog/...` |

### Umsetzung

```
src/pages/
├── index.astro          (DE)
├── vorderhaus.astro     (DE)
├── ...
└── en/
    ├── index.astro      (EN)
    ├── front-house.astro (EN)
    └── ...
```

### Zusätzlich benötigt

- [x] Sprachumschalter im Header
- [x] hreflang-Tags für SEO
- [x] Layout.astro mit dynamischem `lang` Attribut

---

## Blog-Artikel von anno-1728.de

### Zu migrierende Artikel (12 Stück)

| Titel | Datum | Neue URL |
|-------|-------|----------|
| Ein Platz an der Sonne | März 2019 | `/blog/liegestuehle/` |
| Heiraten und Hochzeitsfotos | März 2019 | `/blog/hochzeitsfotos/` |
| Deluxe Traumfabrik | Sep 2017 | `/blog/deluxe-schlafzimmer/` |
| Kleine Traumfabrik | Sep 2017 | `/blog/kleines-schlafzimmer/` |
| Bergsteiger aufgepasst! | Sep 2017 | `/blog/bergsteiger/` |
| Übernachtung und Entspannen | Aug 2017 | `/blog/entspannung/` |
| Großes Badezimmer | Aug 2017 | `/blog/badezimmer/` |
| Urlaub im Denkmal | Aug 2017 | `/blog/denkmal/` |
| Wiesbaden zu Fuß/Fahrrad | Aug 2017 | `/blog/wiesbaden-zu-fuss/` |
| Kulinarisches aus Auringen | Aug 2017 | `/blog/kulinarisches/` |
| Oldies | Aug 2017 | `/blog/oldies/` |
| Sesam öffne dich | Aug 2017 | `/blog/technik/` |

### Pro Artikel

- [ ] Text kopieren und formatieren
- [ ] Bilder herunterladen nach `/public/blog/`
- [ ] Bilder optimieren (WebP, komprimieren)
- [ ] Alt-Texte schreiben
- [ ] Meta-Description hinzufügen
- [ ] Navigation: Blog-Link im Header

---

## ✅ Lernprojekt: Kontaktformular mit Vercel Backend Function (ERLEDIGT)

> **Status:** Fertiggestellt am Januar 2025. Kontaktformular funktioniert mit SMTP/Nodemailer.

### Was ist eine Vercel Backend Function?

Eine **Vercel Backend Function** (auch "Serverless Function" genannt) ist Code, der auf dem Server läuft - nicht im Browser des Besuchers.

**Warum brauchen wir das?**

| Problem | Lösung |
|---------|--------|
| E-Mails können nicht direkt aus dem Browser verschickt werden | Die Backend Function verschickt die E-Mail serverseitig |
| API-Keys (z.B. für E-Mail-Dienste) dürfen nicht im Browser sichtbar sein | Die Backend Function hält den Key geheim auf dem Server |
| Spam-Schutz ist im Browser leicht zu umgehen | Die Backend Function kann Anfragen validieren und limitieren |

**Wie funktioniert das technisch?**

```
┌─────────────────┐      ┌─────────────────────┐      ┌─────────────┐
│  Browser        │      │  Vercel Server      │      │  E-Mail     │
│  (Besucher)     │ ──── │  (Backend Function) │ ──── │  Service    │
│                 │      │                     │      │  (Resend)   │
│  Formular       │ POST │  /api/contact       │ API  │             │
│  ausfüllen      │ ───► │  - Daten validieren │ ───► │  E-Mail an  │
│  & absenden     │      │  - E-Mail senden    │      │  Vermieter  │
└─────────────────┘      └─────────────────────┘      └─────────────┘
```

1. Besucher füllt das Kontaktformular aus und klickt "Absenden"
2. Der Browser schickt die Daten an `/api/contact` (unsere Backend Function)
3. Die Backend Function prüft die Daten und verschickt die E-Mail über Resend
4. Der Besucher sieht eine Erfolgsmeldung

**Vorteile von Vercel Backend Functions:**

- **Kein eigener Server nötig** - Vercel hostet und skaliert automatisch
- **Kostenlos** für kleine Projekte (Vercel Free Tier: 100.000 Aufrufe/Monat)
- **Einfach** - Eine TypeScript-Datei im `src/pages/api/` Ordner reicht
- **Sicher** - Secrets wie API-Keys bleiben auf dem Server

### Was dabei gelernt wird

- **Frontend:** HTML-Formulare, Form Validation, Fetch API
- **Backend:** Serverless Functions, API Routes, Request/Response-Handling
- **E-Mail:** Transactional Email Services (Resend)
- **Security:** Umgang mit API-Keys, Eingabevalidierung

### Formularfelder (Implementiert)

Implementierte Felder:
- [x] Name
- [x] E-Mail-Adresse
- [x] Telefonnummer
- [x] Gewünschtes Objekt (Vorderhaus / Alter Speicher)
- [x] Anreise-Datum
- [x] Abreise-Datum
- [x] Anzahl Erwachsene
- [x] Anzahl Kinder
- [x] Nachricht

### Setup-Schritte (Erledigt)

1. [x] **Formularfelder festgelegt** - Vollständiges Buchungsanfrage-Formular
2. [x] **SMTP statt Resend** - Bestehendes E-Mail-Konto mit Nodemailer genutzt
3. [x] **Packages installiert** - `pnpm add @astrojs/vercel nodemailer`
4. [x] **Astro konfiguriert** - `output: 'server'` in `astro.config.mjs`
5. [x] **Backend Function erstellt** - `src/pages/api/contact.ts`
6. [x] **Kontaktformular gebaut** - `src/components/ContactForm.astro`
7. [x] **Lokal getestet** - Funktioniert
8. [x] **Vercel konfiguriert** - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL
9. [x] **Deployed und getestet** - Live auf Vercel

### Technische Referenz: API Route (Implementiert)

**Umgesetzt mit Nodemailer/SMTP statt Resend** - verwendet das bestehende E-Mail-Konto.

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,  // mail11.web-server.biz
  port: Number(import.meta.env.SMTP_PORT),
  secure: false,
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  // ... Validierung und E-Mail-Versand
};
```

**Environment Variables (Vercel):**
- `SMTP_HOST` - mail11.web-server.biz
- `SMTP_PORT` - 587
- `SMTP_USER` - info@anno1728-ferienhaus-wiesbaden.de
- `SMTP_PASS` - (aus 1Password)
- `CONTACT_EMAIL` - info@anno1728-ferienhaus-wiesbaden.de

---

## E-Mail & Helpdesk Setup

### Kontakt-E-Mail-Adresse

**Offizielle Kontaktadresse:** `info@anno1728-ferienhaus-wiesbaden.de`

Diese Adresse soll:
- Auf der Website als Kontaktadresse angezeigt werden
- Als Empfänger für das Kontaktformular dienen
- Über FreeScout zentral verwaltet werden

### IMAP-Zugangsdaten

**1Password:** [Zugangsdaten für IMAP-Postfach](https://start.1password.com/open/i?a=VHD7TAHZ25EVFM6I3BNF5FRELQ&v=b33jofiftk5uc4kyyfzgdzj5ia&i=pg5dvaqjuie4wtyk3dun473w6a&h=seibert-private.1password.com)

### FreeScout Helpdesk

**Was ist FreeScout?**

FreeScout ist eine Open-Source-Helpdesk-Software (ähnlich wie Help Scout oder Zendesk), mit der E-Mails zentral empfangen und bearbeitet werden können. Mehrere Personen können auf dieselbe Inbox zugreifen, E-Mails zuweisen, beantworten und den Status verfolgen.

**Vorteile:**
- Zentrale Inbox für alle Anfragen
- Mehrere Bearbeiter möglich
- Kollisionserkennung (sehen, wenn jemand anders antwortet)
- Notizen und interne Kommentare
- Antwortvorlagen
- Kostenlos (Self-Hosted)

### Setup-Schritte FreeScout

1. [ ] **Linux Server bereitstellen** - VPS oder eigener Server
2. [ ] **FreeScout installieren** - https://freescout.net/download/
3. [x] **IMAP-Postfach einrichten** - Zugangsdaten aus 1Password
4. [ ] **Benutzer anlegen** - Wer soll Zugriff haben?
5. [x] **Mailbox konfiguriert** - `info@anno1728-ferienhaus-wiesbaden.de` angebunden
6. [x] **Getestet** - Test-E-Mail senden und empfangen funktioniert

---

## Favicon erstellen

### Benötigte Dateien

| Datei | Größe | Verwendung |
|-------|-------|------------|
| `favicon.ico` | 32x32 | Klassisch für alle Browser |
| `favicon.svg` | Vektor | Moderne Browser |
| `apple-touch-icon.png` | 180x180 | iPhone/iPad Home-Screen |

### Design-Vorschläge

- "1728" als stilisierte Jahreszahl
- Fachwerk-Symbol
- Haus-Silhouette
- Basierend auf `/public/logo.png`

### Tools

- Canva: https://www.canva.com/create/favicons/
- Favicon.io: https://favicon.io/
- RealFaviconGenerator: https://realfavicongenerator.net/

---

## Entwicklung

```bash
# Dependencies installieren
pnpm install

# Entwicklungsserver starten
pnpm dev

# Produktions-Build
pnpm build

# Build-Vorschau
pnpm preview
```

---

*Erstellt: Januar 2025*
