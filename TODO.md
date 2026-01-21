# Anno 1728 Website - Todoliste

Diese Todoliste dokumentiert alle offenen Aufgaben für die Website anno-1728.de.

---

## Dringend (Funktionalität/Rechtliches)

- [ ] **Smoobu-Buchungslink einbauen** - `https://fewoseibert.smoobu.net/en/` auf Buchungsseite und CTA-Buttons
- [ ] **Impressum erstellen** - Pflicht für deutsche Websites (Name, Adresse, Kontakt, ggf. Steuernummer)
- [ ] **Datenschutz erstellen** - Pflicht nach DSGVO
- [ ] **Englische Version** - Alle Seiten auf Englisch übersetzen (siehe Abschnitt unten)
- [ ] **12 Blog-Artikel migrieren** - Von anno-1728.de übernehmen (siehe Abschnitt unten)
- [ ] **Favicon erstellen** - Eigenes Icon statt Astro-Standard
- [ ] **Impressionen-Seite** - Bildergalerie mit ~25 Fotos von der alten Website
- [ ] **Kontaktformular mit E-Mail** - Vercel Functions Lernprojekt (siehe Abschnitt unten)

---

## Wichtig (SEO & Qualität)

- [ ] **Sprachumschalter** - DE/EN Toggle im Header
- [ ] **Social Media Links** - Facebook, Instagram, LinkedIn im Footer
- [ ] **Meta-Tags hinzufügen** - Description, Open Graph Tags in Layout.astro
- [ ] **Alt-Texte verbessern** - Beschreibende Texte statt "Anno 1728 Impression"
- [ ] **Sitemap.xml** - Astro-Plugin `@astrojs/sitemap` verwenden
- [ ] **Geschichte ergänzen** - Hinweis auf niedrige Deckenbalken (Vorsicht bei >1,75m)

---

## Essen-Seite korrigieren

- [ ] **Firenze entfernen** - Restaurant existiert nicht mehr
- [ ] **Milchbar hinzufügen** - Bahnhofstr. 1, 65527 Niedernhausen (Frühstück)
- [ ] **Restaurant Ente hinzufügen** - Wiesbadener Institution, gehobene Küche

---

## Nice-to-have (UX)

- [ ] **Mobiles Hamburger-Menü** - Bessere Navigation auf kleinen Bildschirmen
- [ ] **404-Seite** - Freundliche Fehlerseite (auch auf Englisch)
- [ ] **Mehr Bilder für Alter Speicher** - Aktuell nur ein Bild
- [ ] **README.md** - Dokumentation wie man die Website lokal startet

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

- [ ] Sprachumschalter im Header
- [ ] hreflang-Tags für SEO
- [ ] Layout.astro mit dynamischem `lang` Attribut

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

## Lernprojekt: Kontaktformular mit Vercel Functions

### Was dabei gelernt wird

- Frontend: HTML-Formulare, Form Validation, Fetch API
- Backend: Serverless Functions, API Routes
- E-Mail: SMTP, Transactional Email Services (Resend)
- Security: Rate Limiting, Spam-Schutz

### Setup-Schritte

1. [ ] Resend Account erstellen (https://resend.com)
2. [ ] API Key generieren
3. [ ] `@astrojs/vercel` Adapter installieren (`pnpm add @astrojs/vercel`)
4. [ ] `resend` Package installieren (`pnpm add resend`)
5. [ ] Astro auf `output: 'server'` umstellen in `astro.config.mjs`
6. [ ] API Route erstellen: `src/pages/api/contact.ts`
7. [ ] Kontaktformular bauen: `src/pages/kontakt.astro`
8. [ ] Lokal testen mit `pnpm dev`
9. [ ] Environment Variable `RESEND_API_KEY` in Vercel setzen
10. [ ] Deployen und testen

### API Route Beispiel

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { name, email, message, checkin, checkout } = data;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: 'Bitte alle Felder ausfüllen' }),
      { status: 400 }
    );
  }

  await resend.emails.send({
    from: 'Anno 1728 <kontakt@anno-1728.de>',
    to: 'fewoseibert@seibert-media.net',
    subject: `Neue Anfrage von ${name}`,
    html: `
      <h2>Neue Buchungsanfrage</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      <p><strong>Check-in:</strong> ${checkin || 'nicht angegeben'}</p>
      <p><strong>Check-out:</strong> ${checkout || 'nicht angegeben'}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${message}</p>
    `,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
```

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
