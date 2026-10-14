# Lady Pastor Maame Akua Obeng Darko — Official Website

A premium, elegant personal brand website: **Leader. Servant. Visionary. Woman of Faith.**

Pure HTML/CSS/JS — no build step, no dependencies. Deploy to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, cPanel).

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| Leadership & Business | `leadership-business.html` |
| Ministry | `ministry.html` |
| Philanthropy | `philanthropy.html` |
| Speaking & Engagements | `speaking.html` |
| Media / Gallery | `media.html` |
| Contact | `contact.html` |

## Before going live — 5 things to update

1. **WhatsApp number** — search for `233000000000` and replace with the real number
   (international format, no `+`). It appears in `assets/js/main.js` (form handler)
   and the floating WhatsApp button in every page footer.
2. **Email addresses** — replace `connect@example.com` and `invitations@example.com`
   in `contact.html` and `speaking.html`.
3. **Photography (DONE)** — the 10 professional portraits from the `MOD/`
   folder are now wired in. Optimized web copies live in `assets/img/`
   (`maame-hero.jpg`, `maame-signature.jpg`, `maame-executive.jpg`,
   `maame-ministry.jpg`, `maame-boardroom.jpg`, `maame-dusk.jpg`,
   `maame-portrait-01/02/03.jpg`, `og-image.jpg`), used across the hero,
   page splits, and the media gallery's "Portraits" filter (captions honestly
   marked as portrait-session photos).
   Still placeholders (no matching photos exist yet): on-stage/speaking-event
   shots, family/lifestyle moments, humanitarian outreach, and the two YouTube
   video embeds. Event-themed `portrait__placeholder` blocks mark exactly what
   belongs there. To re-optimize photos, run:
   `powershell -NoProfile -ExecutionPolicy Bypass -File _resize.ps1`
4. **Social links** — replace the `href="#"` on social icons in the footers with
   real profile URLs.
5. **Domain** — update `https://maameakuaobengdarko.com/` in the canonical and
   Open Graph tags, plus `sitemap.xml` and `robots.txt`, if a different domain is used.

## Optional upgrades

- **Online donations** — on `philanthropy.html` in the `#support` band, replace the
  WhatsApp/contact buttons with a link to a payment provider (PayPal, Stripe,
  Paystack, MoMo) or embed their donation form.
- **YouTube embeds** — in `media.html`, replace the two video placeholders with
  `<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" ...>` embeds.
- **Testimonials** — the placeholder cards on `index.html` are intentionally empty;
  replace with verified testimonials only.
- **Contact form backend** — forms currently open WhatsApp / the visitor's email
  client with a prefilled message (no backend needed). For server-based email,
  point the forms at Formspree/Netlify Forms.

## Design system

- **Palette** — Deep Navy `#0A1628` · Charcoal `#14161A` · Ivory `#F8F5EF` ·
  Gold `#C6A45E` · Champagne `#EFE3C8` · Ministry Burgundy `#4A1522`
- **Typography** — Playfair Display (headings) + Inter (body), loaded from Google Fonts
- **Behavior** — sticky shrinking nav, scroll reveals, subtle parallax, masonry
  gallery with filters and lightbox, accessible and reduced-motion friendly.

All styles: `assets/css/styles.css` · All behavior: `assets/js/main.js`
