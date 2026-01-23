# Contact Form Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a bilingual contact form (DE/EN) that sends booking inquiries via email using Nodemailer and the existing SMTP account.

**Architecture:** Astro page with reusable ContactForm component, Vercel serverless function for email sending via Nodemailer, honeypot spam protection.

**Tech Stack:** Astro 5, Vercel Functions, Nodemailer, TypeScript

---

## Task 1: Install Nodemailer

**Files:**
- Modify: `package.json`

**Step 1: Install nodemailer package**

Run:
```bash
cd ~/Documents/code/anno1728 && pnpm add nodemailer && pnpm add -D @types/nodemailer
```

**Step 2: Verify installation**

Run:
```bash
cd ~/Documents/code/anno1728 && cat package.json | grep nodemailer
```

Expected: `"nodemailer": "^X.X.X"` in dependencies

**Step 3: Commit**

```bash
cd ~/Documents/code/anno1728 && git add package.json pnpm-lock.yaml && git commit -m "chore: add nodemailer for contact form email sending"
```

---

## Task 2: Create i18n translations file

**Files:**
- Create: `src/i18n/contact.ts`

**Step 1: Create the i18n directory and translations file**

Create `src/i18n/contact.ts`:

```typescript
export const contactTranslations = {
  de: {
    title: 'Kontakt',
    subtitle: 'Haben Sie Fragen oder möchten Sie buchen? Schreiben Sie uns!',
    name: 'Name',
    namePlaceholder: 'Ihr vollständiger Name',
    email: 'E-Mail',
    emailPlaceholder: 'ihre@email.de',
    phone: 'Telefon',
    phonePlaceholder: '+49 123 456789 (optional)',
    property: 'Welches Objekt interessiert Sie?',
    propertyFront: 'Vorderhaus',
    propertyBarn: 'Alter Speicher',
    propertyBoth: 'Beide Objekte',
    checkin: 'Anreise',
    checkout: 'Abreise',
    guests: 'Anzahl Personen',
    guestsPlaceholder: 'Bitte wählen',
    message: 'Ihre Nachricht',
    messagePlaceholder: 'Wie können wir Ihnen helfen?',
    submit: 'Nachricht senden',
    sending: 'Wird gesendet...',
    success: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
    errorRequired: 'Bitte füllen Sie alle Pflichtfelder aus.',
    errorEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    errorServer: 'Ein Fehler ist aufgetreten. Bitte kontaktieren Sie uns direkt per E-Mail.',
    required: 'Pflichtfeld',
  },
  en: {
    title: 'Contact',
    subtitle: 'Have questions or want to book? Get in touch with us!',
    name: 'Name',
    namePlaceholder: 'Your full name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone',
    phonePlaceholder: '+49 123 456789 (optional)',
    property: 'Which property interests you?',
    propertyFront: 'Main House',
    propertyBarn: 'Old Granary',
    propertyBoth: 'Both Properties',
    checkin: 'Check-in',
    checkout: 'Check-out',
    guests: 'Number of Guests',
    guestsPlaceholder: 'Please select',
    message: 'Your Message',
    messagePlaceholder: 'How can we help you?',
    submit: 'Send Message',
    sending: 'Sending...',
    success: 'Thank you! We will get back to you soon.',
    errorRequired: 'Please fill in all required fields.',
    errorEmail: 'Please enter a valid email address.',
    errorServer: 'An error occurred. Please contact us directly via email.',
    required: 'Required',
  },
} as const;

export type ContactLang = keyof typeof contactTranslations;
export type ContactTranslation = typeof contactTranslations.de;
```

**Step 2: Verify file exists**

Run:
```bash
ls -la ~/Documents/code/anno1728/src/i18n/
```

Expected: `contact.ts` file listed

**Step 3: Commit**

```bash
cd ~/Documents/code/anno1728 && git add src/i18n/contact.ts && git commit -m "feat: add contact form translations (DE/EN)"
```

---

## Task 3: Create ContactForm component

**Files:**
- Create: `src/components/ContactForm.astro`

**Step 1: Create the component**

Create `src/components/ContactForm.astro`:

```astro
---
import { contactTranslations, type ContactLang } from '../i18n/contact';

interface Props {
  lang?: ContactLang;
}

const { lang = 'de' } = Astro.props;
const t = contactTranslations[lang];
---

<form id="contact-form" class="contact-form" data-lang={lang}>
  <!-- Honeypot field (hidden from humans, bots fill it) -->
  <div class="hp-field" aria-hidden="true">
    <label for="website">Website</label>
    <input type="text" name="website" id="website" tabindex="-1" autocomplete="off" />
  </div>

  <div class="form-row">
    <div class="form-group">
      <label for="name">{t.name} <span class="required">*</span></label>
      <input type="text" name="name" id="name" required placeholder={t.namePlaceholder} />
    </div>
    <div class="form-group">
      <label for="email">{t.email} <span class="required">*</span></label>
      <input type="email" name="email" id="email" required placeholder={t.emailPlaceholder} />
    </div>
  </div>

  <div class="form-group">
    <label for="phone">{t.phone}</label>
    <input type="tel" name="phone" id="phone" placeholder={t.phonePlaceholder} />
  </div>

  <fieldset class="form-group">
    <legend>{t.property}</legend>
    <div class="radio-group">
      <label class="radio-label">
        <input type="radio" name="property" value="vorderhaus" />
        <span>{t.propertyFront}</span>
      </label>
      <label class="radio-label">
        <input type="radio" name="property" value="alter-speicher" />
        <span>{t.propertyBarn}</span>
      </label>
      <label class="radio-label">
        <input type="radio" name="property" value="beide" />
        <span>{t.propertyBoth}</span>
      </label>
    </div>
  </fieldset>

  <div class="form-row form-row-three">
    <div class="form-group">
      <label for="checkin">{t.checkin}</label>
      <input type="date" name="checkin" id="checkin" />
    </div>
    <div class="form-group">
      <label for="checkout">{t.checkout}</label>
      <input type="date" name="checkout" id="checkout" />
    </div>
    <div class="form-group">
      <label for="guests">{t.guests}</label>
      <select name="guests" id="guests">
        <option value="">{t.guestsPlaceholder}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="message">{t.message} <span class="required">*</span></label>
    <textarea name="message" id="message" rows="5" required placeholder={t.messagePlaceholder}></textarea>
  </div>

  <div id="form-status" class="form-status" role="alert" aria-live="polite"></div>

  <button type="submit" id="submit-btn" class="submit-btn">
    <span class="btn-text">{t.submit}</span>
    <span class="btn-loading" style="display: none;">{t.sending}</span>
  </button>
</form>

<script define:vars={{ translations: contactTranslations }}>
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusDiv = document.getElementById('form-status');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const lang = form.dataset.lang || 'de';
  const t = translations[lang];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    statusDiv.className = 'form-status';
    statusDiv.textContent = '';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      });

      const result = await response.json();

      if (response.ok) {
        statusDiv.className = 'form-status success';
        statusDiv.textContent = t.success;
        form.reset();
      } else {
        statusDiv.className = 'form-status error';
        statusDiv.textContent = result.error || t.errorServer;
      }
    } catch (error) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = t.errorServer;
    } finally {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });
</script>

<style>
  .contact-form {
    max-width: 600px;
  }

  /* Honeypot - hidden from humans */
  .hp-field {
    position: absolute;
    left: -9999px;
    top: -9999px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-row-three {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 600px) {
    .form-row,
    .form-row-three {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }

  legend {
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #333;
  }

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.35rem;
    color: #333;
  }

  .required {
    color: #8B2332;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="date"],
  select,
  textarea {
    width: 100%;
    padding: 0.65rem 0.85rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: #8B2332;
    box-shadow: 0 0 0 2px rgba(139, 35, 50, 0.15);
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: normal;
    cursor: pointer;
  }

  .radio-label input[type="radio"] {
    width: auto;
    margin: 0;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .submit-btn {
    background: #8B2332;
    color: #fff;
    border: none;
    padding: 0.85rem 2rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: #6B1A26;
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .form-status {
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    display: none;
  }

  .form-status.success {
    display: block;
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .form-status.error {
    display: block;
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
</style>
```

**Step 2: Verify component exists**

Run:
```bash
ls -la ~/Documents/code/anno1728/src/components/
```

Expected: `ContactForm.astro` file listed

**Step 3: Commit**

```bash
cd ~/Documents/code/anno1728 && git add src/components/ContactForm.astro && git commit -m "feat: add ContactForm component with honeypot spam protection"
```

---

## Task 4: Create API endpoint for contact form

**Files:**
- Create: `src/pages/api/contact.ts`

**Step 1: Create the API endpoint**

Create `src/pages/api/contact.ts`:

```typescript
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: parseInt(import.meta.env.SMTP_PORT || '587'),
  secure: import.meta.env.SMTP_PORT === '465',
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

const propertyLabels: Record<string, { de: string; en: string }> = {
  vorderhaus: { de: 'Vorderhaus', en: 'Main House' },
  'alter-speicher': { de: 'Alter Speicher', en: 'Old Granary' },
  beide: { de: 'Beide Objekte', en: 'Both Properties' },
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, property, checkin, checkout, guests, message, website, lang = 'de' } = data;

    // Honeypot check - if filled, it's a bot
    if (website) {
      // Return fake success to fool the bot
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    if (!name || !email || !message) {
      const errorMsg = lang === 'en'
        ? 'Please fill in all required fields.'
        : 'Bitte füllen Sie alle Pflichtfelder aus.';
      return new Response(JSON.stringify({ error: errorMsg }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorMsg = lang === 'en'
        ? 'Please enter a valid email address.'
        : 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      return new Response(JSON.stringify({ error: errorMsg }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Format property label
    const propertyLabel = property ? propertyLabels[property]?.[lang as 'de' | 'en'] || property : '-';

    // Build email content
    const subject = lang === 'en'
      ? `New inquiry from ${name}`
      : `Neue Anfrage von ${name}`;

    const htmlContent = `
      <h2>${lang === 'en' ? 'New Contact Inquiry' : 'Neue Kontaktanfrage'}</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${lang === 'en' ? 'Name' : 'Name'}:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${lang === 'en' ? 'Email' : 'E-Mail'}:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${lang === 'en' ? 'Phone' : 'Telefon'}:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${lang === 'en' ? 'Property' : 'Objekt'}:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${propertyLabel}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${lang === 'en' ? 'Check-in' : 'Anreise'}:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${checkin || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${lang === 'en' ? 'Check-out' : 'Abreise'}:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${checkout || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${lang === 'en' ? 'Guests' : 'Personen'}:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${guests || '-'}</td>
        </tr>
      </table>
      <h3 style="margin-top: 20px;">${lang === 'en' ? 'Message' : 'Nachricht'}:</h3>
      <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 4px;">${message}</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">${lang === 'en' ? 'Sent via contact form on anno-1728.de' : 'Gesendet über das Kontaktformular auf anno-1728.de'}</p>
    `;

    const textContent = `
${lang === 'en' ? 'New Contact Inquiry' : 'Neue Kontaktanfrage'}
==============================

${lang === 'en' ? 'Name' : 'Name'}: ${name}
${lang === 'en' ? 'Email' : 'E-Mail'}: ${email}
${lang === 'en' ? 'Phone' : 'Telefon'}: ${phone || '-'}
${lang === 'en' ? 'Property' : 'Objekt'}: ${propertyLabel}
${lang === 'en' ? 'Check-in' : 'Anreise'}: ${checkin || '-'}
${lang === 'en' ? 'Check-out' : 'Abreise'}: ${checkout || '-'}
${lang === 'en' ? 'Guests' : 'Personen'}: ${guests || '-'}

${lang === 'en' ? 'Message' : 'Nachricht'}:
${message}

---
${lang === 'en' ? 'Sent via contact form on anno-1728.de' : 'Gesendet über das Kontaktformular auf anno-1728.de'}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: `"Anno 1728 Website" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.CONTACT_EMAIL || import.meta.env.SMTP_USER,
      replyTo: email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Server error. Please try again later.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
```

**Step 2: Verify API endpoint exists**

Run:
```bash
ls -la ~/Documents/code/anno1728/src/pages/api/
```

Expected: `contact.ts` file listed

**Step 3: Commit**

```bash
cd ~/Documents/code/anno1728 && git add src/pages/api/contact.ts && git commit -m "feat: add contact form API endpoint with Nodemailer"
```

---

## Task 5: Create German contact page

**Files:**
- Create: `src/pages/kontakt.astro`

**Step 1: Create the German contact page**

Create `src/pages/kontakt.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import ContactForm from '../components/ContactForm.astro';
---

<Layout title="Kontakt - Anno 1728">
  <h1>Kontakt</h1>
  <p class="intro">
    Haben Sie Fragen zu unseren Ferienwohnungen oder möchten Sie eine Buchungsanfrage stellen?
    Füllen Sie einfach das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
  </p>

  <ContactForm lang="de" />

  <section class="alternative-contact">
    <h2>Oder kontaktieren Sie uns direkt</h2>
    <p>
      <strong>E-Mail:</strong> <a href="mailto:info@anno1728-ferienhaus-wiesbaden.de">info@anno1728-ferienhaus-wiesbaden.de</a><br />
      <strong>Telefon:</strong> <a href="tel:+491606044181">+49 160 6044181</a>
    </p>
  </section>
</Layout>

<style>
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .intro {
    color: #555;
    margin-bottom: 2rem;
    max-width: 600px;
  }

  .alternative-contact {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
  }

  .alternative-contact h2 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .alternative-contact a {
    color: #8B2332;
  }
</style>
```

**Step 2: Verify page exists**

Run:
```bash
ls -la ~/Documents/code/anno1728/src/pages/kontakt.astro
```

Expected: File exists

**Step 3: Commit**

```bash
cd ~/Documents/code/anno1728 && git add src/pages/kontakt.astro && git commit -m "feat: add German contact page"
```

---

## Task 6: Create English contact page

**Files:**
- Create: `src/pages/en/contact.astro`

**Step 1: Create the English contact page**

Create `src/pages/en/contact.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import ContactForm from '../../components/ContactForm.astro';
---

<Layout title="Contact - Anno 1728" lang="en">
  <h1>Contact</h1>
  <p class="intro">
    Do you have questions about our vacation apartments or would you like to make a booking inquiry?
    Simply fill out the form and we will get back to you as soon as possible.
  </p>

  <ContactForm lang="en" />

  <section class="alternative-contact">
    <h2>Or contact us directly</h2>
    <p>
      <strong>Email:</strong> <a href="mailto:info@anno1728-ferienhaus-wiesbaden.de">info@anno1728-ferienhaus-wiesbaden.de</a><br />
      <strong>Phone:</strong> <a href="tel:+491606044181">+49 160 6044181</a>
    </p>
  </section>
</Layout>

<style>
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .intro {
    color: #555;
    margin-bottom: 2rem;
    max-width: 600px;
  }

  .alternative-contact {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
  }

  .alternative-contact h2 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .alternative-contact a {
    color: #8B2332;
  }
</style>
```

**Step 2: Verify page exists**

Run:
```bash
ls -la ~/Documents/code/anno1728/src/pages/en/contact.astro
```

Expected: File exists

**Step 3: Commit**

```bash
cd ~/Documents/code/anno1728 && git add src/pages/en/contact.astro && git commit -m "feat: add English contact page"
```

---

## Task 7: Add contact link to navigation

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Add contact to navigation labels**

In `src/layouts/Layout.astro`, find the `nav` object (around line 26-42) and add `kontakt`:

Change from:
```javascript
const nav = isEnglish ? {
	home: 'Home',
	vorderhaus: 'Main House',
	alterSpeicher: 'Old Granary',
	geschichte: 'History',
	ausfluege: 'Excursions',
	essen: 'Dining',
	buchungen: 'Bookings'
} : {
	home: 'Home',
	vorderhaus: 'Vorderhaus',
	alterSpeicher: 'Alter Speicher',
	geschichte: 'Geschichte',
	ausfluege: 'Ausflüge',
	essen: 'Essen',
	buchungen: 'Buchungen'
};
```

To:
```javascript
const nav = isEnglish ? {
	home: 'Home',
	vorderhaus: 'Main House',
	alterSpeicher: 'Old Granary',
	geschichte: 'History',
	ausfluege: 'Excursions',
	essen: 'Dining',
	buchungen: 'Bookings',
	kontakt: 'Contact'
} : {
	home: 'Home',
	vorderhaus: 'Vorderhaus',
	alterSpeicher: 'Alter Speicher',
	geschichte: 'Geschichte',
	ausfluege: 'Ausflüge',
	essen: 'Essen',
	buchungen: 'Buchungen',
	kontakt: 'Kontakt'
};
```

**Step 2: Add contact link to nav element**

Find the `<nav>` element (around line 75-83) and add contact link:

Change from:
```html
<nav>
	<a href={basePath + '/'}>{nav.home}</a>
	<a href={basePath + '/vorderhaus/'}>{nav.vorderhaus}</a>
	<a href={basePath + '/alter-speicher/'}>{nav.alterSpeicher}</a>
	<a href={basePath + '/geschichte/'}>{nav.geschichte}</a>
	<a href={basePath + '/ausfluege/'}>{nav.ausfluege}</a>
	<a href={basePath + '/essen/'}>{nav.essen}</a>
	<a href={basePath + '/buchungen/'}>{nav.buchungen}</a>
</nav>
```

To:
```html
<nav>
	<a href={basePath + '/'}>{nav.home}</a>
	<a href={basePath + '/vorderhaus/'}>{nav.vorderhaus}</a>
	<a href={basePath + '/alter-speicher/'}>{nav.alterSpeicher}</a>
	<a href={basePath + '/geschichte/'}>{nav.geschichte}</a>
	<a href={basePath + '/ausfluege/'}>{nav.ausfluege}</a>
	<a href={basePath + '/essen/'}>{nav.essen}</a>
	<a href={basePath + '/buchungen/'}>{nav.buchungen}</a>
	<a href={basePath + (isEnglish ? '/contact/' : '/kontakt/')}>{nav.kontakt}</a>
</nav>
```

**Step 3: Verify build works**

Run:
```bash
cd ~/Documents/code/anno1728 && pnpm build
```

Expected: Build succeeds

**Step 4: Commit**

```bash
cd ~/Documents/code/anno1728 && git add src/layouts/Layout.astro && git commit -m "feat: add contact link to navigation"
```

---

## Task 8: Create .env.example file

**Files:**
- Create: `.env.example`

**Step 1: Create example environment file**

Create `.env.example`:

```
# SMTP Configuration for Contact Form
SMTP_HOST=smtp.your-provider.de
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
CONTACT_EMAIL=info@your-domain.de
```

**Step 2: Add .env to .gitignore if not already**

Run:
```bash
cd ~/Documents/code/anno1728 && grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore
```

**Step 3: Commit**

```bash
cd ~/Documents/code/anno1728 && git add .env.example .gitignore && git commit -m "docs: add .env.example for SMTP configuration"
```

---

## Task 9: Test locally with .env file

**Files:**
- Create: `.env` (local only, not committed)

**Step 1: Create local .env file**

Create `.env` with actual credentials (DO NOT COMMIT):

```
SMTP_HOST=smtp.anno1728-ferienhaus-wiesbaden.de
SMTP_PORT=587
SMTP_USER=info@anno1728-ferienhaus-wiesbaden.de
SMTP_PASS=pierrot2rat*coup7KERN8stylist
CONTACT_EMAIL=info@anno1728-ferienhaus-wiesbaden.de
```

**Step 2: Start dev server**

Run:
```bash
cd ~/Documents/code/anno1728 && pnpm dev
```

**Step 3: Test the form**

1. Open http://localhost:4321/kontakt/
2. Fill in the form with test data
3. Submit and check if email arrives

**Step 4: Test English version**

1. Open http://localhost:4321/en/contact/
2. Verify labels are in English
3. Submit test message

---

## Task 10: Configure Vercel environment variables

**Manual step in Vercel Dashboard:**

1. Go to https://vercel.com/dashboard
2. Select the Anno 1728 project
3. Go to Settings → Environment Variables
4. Add these variables:

| Name | Value |
|------|-------|
| `SMTP_HOST` | `smtp.anno1728-ferienhaus-wiesbaden.de` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `info@anno1728-ferienhaus-wiesbaden.de` |
| `SMTP_PASS` | `[password from 1Password]` |
| `CONTACT_EMAIL` | `info@anno1728-ferienhaus-wiesbaden.de` |

5. Deploy and test on production

---

## Summary

After completing all tasks:

- [x] Nodemailer installed
- [x] i18n translations for DE/EN
- [x] ContactForm component with honeypot
- [x] API endpoint for email sending
- [x] German contact page at /kontakt/
- [x] English contact page at /en/contact/
- [x] Navigation updated
- [x] Environment variables documented
- [x] Local testing complete
- [x] Vercel configuration complete

**Total commits:** 8
**New files:** 6
**Modified files:** 2
