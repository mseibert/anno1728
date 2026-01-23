# Anno 1728 - Ferienhaus Website

Website für das denkmalgeschützte Ferienhaus "Anno 1728" in Wiesbaden-Auringen.

**Live:** [www.anno1728-ferienhaus-wiesbaden.de](https://www.anno1728-ferienhaus-wiesbaden.de)

## Tech Stack

- **Framework:** [Astro 5](https://astro.build/) mit Server-Side Rendering
- **Hosting:** [Vercel](https://vercel.com/)
- **Styling:** Vanilla CSS (kein Framework)
- **E-Mail:** Nodemailer mit SMTP

## Features

- Zweisprachig (Deutsch/Englisch)
- Responsive Design mit mobilem Hamburger-Menü
- Kontaktformular mit E-Mail-Versand
- Bildergalerien mit Lightbox
- Blog mit 12 migrierten Artikeln
- SEO-optimiert (Meta-Tags, Sitemap, hreflang)

## Projektstruktur

```
src/
├── components/       # Wiederverwendbare Komponenten
│   └── ContactForm.astro
├── i18n/            # Übersetzungen
├── layouts/         # Seitenlayouts
│   └── Layout.astro # Haupt-Layout mit Navigation
├── pages/           # Seiten (DE)
│   ├── api/         # Backend-Funktionen
│   │   └── contact.ts
│   ├── blog/        # Blog-Artikel
│   └── en/          # Englische Seiten
public/
├── images/          # Statische Bilder
├── speicher/        # Bilder Alter Speicher
└── logo.png         # Logo
```

## Entwicklung

### Voraussetzungen

- Node.js >= 20
- pnpm

### Setup

```bash
# Dependencies installieren
pnpm install

# Entwicklungsserver starten (http://localhost:4321)
pnpm dev

# Produktions-Build
pnpm build

# Build lokal testen
pnpm preview
```

### Environment Variables

Für das Kontaktformular werden folgende Umgebungsvariablen benötigt:

| Variable | Beschreibung |
|----------|--------------|
| `SMTP_HOST` | SMTP-Server |
| `SMTP_PORT` | SMTP-Port (587) |
| `SMTP_USER` | E-Mail-Adresse |
| `SMTP_PASS` | Passwort |
| `CONTACT_EMAIL` | Empfänger-Adresse |

Lokal: `.env` Datei erstellen (siehe `.env.example`)

## Deployment

Das Projekt wird automatisch auf Vercel deployed wenn Änderungen auf `main` gepusht werden.

## Seiten

| Seite | DE | EN |
|-------|-----|-----|
| Startseite | `/` | `/en/` |
| Vorderhaus | `/vorderhaus/` | `/en/vorderhaus/` |
| Alter Speicher | `/alter-speicher/` | `/en/alter-speicher/` |
| Geschichte | `/geschichte/` | `/en/geschichte/` |
| Ausflüge | `/ausfluege/` | `/en/ausfluege/` |
| Essen | `/essen/` | `/en/essen/` |
| Buchungen | `/buchungen/` | `/en/buchungen/` |
| Blog | `/blog/` | `/blog/` |
| Impressum | `/impressum/` | `/en/impressum/` |
| Datenschutz | `/datenschutz/` | `/en/datenschutz/` |

## Lizenz

Privates Projekt - Alle Rechte vorbehalten.
