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
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Contact form error:', errorMessage);
    console.error('SMTP Config:', {
      host: import.meta.env.SMTP_HOST,
      port: import.meta.env.SMTP_PORT,
      user: import.meta.env.SMTP_USER ? '***set***' : '***missing***',
      pass: import.meta.env.SMTP_PASS ? '***set***' : '***missing***',
    });
    return new Response(
      JSON.stringify({
        error: 'Server error. Please try again later.',
        debug: errorMessage
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
