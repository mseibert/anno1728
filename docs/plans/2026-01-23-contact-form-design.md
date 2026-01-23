# Kontaktformular Design

> **Erstellt:** 2026-01-23
> **Status:** Design abgeschlossen, bereit zur Implementierung

---

## Zusammenfassung

Ein zweisprachiges Kontaktformular (DE/EN) für Buchungsanfragen, das E-Mails über das bestehende SMTP-Konto versendet.

---

## Architektur

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BESUCHER                                    │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Kontaktformular (Astro)                                            │
│  /kontakt/ (DE) oder /en/contact/ (EN)                              │
│                                                                     │
│  Felder:                                                            │
│  • Name (Pflicht)                                                   │
│  • E-Mail (Pflicht)                                                 │
│  • Telefon (optional)                                               │
│  • Objekt: ○ Vorderhaus ○ Alter Speicher ○ Beide (Radio-Buttons)    │
│  • Check-in Datum (Datepicker)                                      │
│  • Check-out Datum (Datepicker)                                     │
│  • Anzahl Personen (Dropdown: 1-6)                                  │
│  • Nachricht (Textarea, Pflicht)                                    │
│  • [Honeypot-Feld, unsichtbar]                                      │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ POST /api/contact
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Vercel Backend Function                                            │
│  src/pages/api/contact.ts                                           │
│                                                                     │
│  1. Honeypot prüfen (Spam?)                                         │
│  2. Pflichtfelder validieren                                        │
│  3. E-Mail formatieren                                              │
│  4. Via Nodemailer + SMTP versenden                                 │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  SMTP-Server                                                        │
│  → E-Mail an info@anno1728-ferienhaus-wiesbaden.de                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Dateistruktur

```
src/pages/
├── kontakt.astro              ← DE Kontaktseite (neu)
├── en/
│   └── contact.astro          ← EN Kontaktseite (neu)
└── api/
    └── contact.ts             ← Backend Function (neu)

src/components/
└── ContactForm.astro          ← Wiederverwendbares Formular (neu)

src/i18n/
└── contact.ts                 ← Übersetzungen für Labels (neu)
```

---

## Formularfelder

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| Name | text | Ja | Vollständiger Name |
| E-Mail | email | Ja | Für Antwort |
| Telefon | tel | Nein | Optionale Rückrufnummer |
| Objekt | radio | Nein | Vorderhaus / Alter Speicher / Beide |
| Check-in | date | Nein | Gewünschtes Anreisedatum |
| Check-out | date | Nein | Gewünschtes Abreisedatum |
| Personen | select | Nein | 1-6 Personen |
| Nachricht | textarea | Ja | Freitext |
| Honeypot | text | - | Unsichtbar, Spam-Schutz |

---

## Spam-Schutz: Honeypot

Ein unsichtbares Feld, das nur von Bots ausgefüllt wird:

```html
<!-- Für Menschen unsichtbar (CSS: display:none oder position:absolute; left:-9999px) -->
<input type="text" name="website" tabindex="-1" autocomplete="off">
```

Backend-Logik:
- Wenn `website` ausgefüllt → Fake-Erfolg zurückgeben, keine E-Mail senden
- Bot denkt, Formular wurde erfolgreich gesendet

---

## SMTP-Konfiguration

Umgebungsvariablen in Vercel Dashboard:

| Variable | Beschreibung |
|----------|--------------|
| `SMTP_HOST` | Mailserver-Adresse |
| `SMTP_PORT` | 587 (TLS) oder 465 (SSL) |
| `SMTP_USER` | E-Mail/Benutzername |
| `SMTP_PASS` | Passwort |
| `CONTACT_EMAIL` | info@anno1728-ferienhaus-wiesbaden.de |

---

## E-Mail-Format

```
Betreff: Neue Anfrage von Max Mustermann

Name: Max Mustermann
E-Mail: max@example.com
Telefon: 0170 1234567
Objekt: Beide Objekte
Check-in: 15.03.2026
Check-out: 20.03.2026
Personen: 4

Nachricht:
Wir würden gerne mit unserer Familie anreisen...
```

---

## Fehlerbehandlung

| Situation | Reaktion |
|-----------|----------|
| Honeypot ausgefüllt | "Danke!" (täuscht Bot), keine E-Mail |
| Pflichtfeld fehlt | Fehlermeldung (DE/EN) |
| E-Mail ungültig | "Bitte gültige E-Mail eingeben" |
| SMTP-Fehler | "Technischer Fehler, bitte direkt per E-Mail kontaktieren" |
| Erfolg | Erfolgsmeldung, Formular zurücksetzen |

---

## User Experience

**Während des Sendens:**
- Button zeigt "Wird gesendet..." / "Sending..."
- Button deaktiviert, um Doppel-Klicks zu verhindern

**Nach Erfolg:**
- Grüne Meldung: "Vielen Dank! Wir melden uns in Kürze bei Ihnen."
- Formular wird geleert

**Bei Fehler:**
- Rote Meldung mit spezifischem Hinweis
- Formulardaten bleiben erhalten

---

## Übersetzungen (DE/EN)

| Key | DE | EN |
|-----|----|----|
| title | Kontakt | Contact |
| name | Name | Name |
| email | E-Mail | Email |
| phone | Telefon | Phone |
| property | Welches Objekt? | Which property? |
| property_front | Vorderhaus | Front House |
| property_barn | Alter Speicher | Old Barn |
| property_both | Beide Objekte | Both Properties |
| checkin | Anreise | Check-in |
| checkout | Abreise | Check-out |
| guests | Personen | Guests |
| message | Ihre Nachricht | Your Message |
| submit | Nachricht senden | Send Message |
| sending | Wird gesendet... | Sending... |
| success | Vielen Dank! Wir melden uns in Kürze. | Thank you! We'll get back to you soon. |
| error | Ein Fehler ist aufgetreten. | An error occurred. |

---

## Technische Entscheidungen

| Aspekt | Entscheidung | Begründung |
|--------|--------------|------------|
| E-Mail-Versand | Nodemailer + SMTP | Bestehendes Konto nutzen, kein externer Dienst |
| Spam-Schutz | Honeypot | Einfach, DSGVO-freundlich, kein Google |
| Sprachen | DE + EN | Website ist bereits zweisprachig |
| Objekt-Auswahl | Radio-Buttons (3 Optionen) | Klarer als Checkboxen |

---

*Design erstellt am 2026-01-23 im Brainstorming mit Martin*
