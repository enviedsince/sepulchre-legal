# Sepulchre website — concept release

A standalone, original seven-page HTML/CSS/JavaScript website inspired by the structure and interactions in the supplied bored.rest and YUSA Tweaks single-file webpage saves. **No third-party webpage code, private data, prices, logos, testimonials, server counts, or policies are redistributed here.**

## Pages

- `index.html` — Home, feature bento, dashboard hero concept and onboarding
- `commands.html` — Searchable, filtered **example** command catalog
- `embeds.html` — Working Discord-style embed builder, live preview, fields, templates, JSON import/export
- `status.html` — System status layout, unconnected by default, optional JSON telemetry endpoint
- `faq.html` — Expandable FAQ
- `dashboard.html` — Interactive mock management UI with browser-local toggles only
- `pricing.html` — Pricing layout with **TBD / concept-only** plans until actual commercial terms are supplied

## Open locally

Double-click `index.html` to open the offline site. Navigation and editing work locally. For testing optional telemetry endpoints and browsers that restrict local file features, host the folder on any static server; e.g., from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Before publishing

1. Edit `assets/config.js` with **your official** HTTPS bot invite URL, Discord support URL, and (if applicable) dashboard URL. Empty buttons show a setup dialog instead of redirecting elsewhere.
2. If you have real status telemetry, set `statusEndpoint` to a URL returning a JSON object like:

```json
{"status":"operational","message":"All systems ready","servers":12,"users":1900,"latency_ms":62,"uptime":99.8}
```

   Status must be one of `operational`, `degraded`, or `outage`. The endpoint must be read-only, safe for public access, use HTTPS in production and enable CORS for the website origin. Counters remain blank when disconnected. The graph is a static demonstration and remains labeled as such even after connecting counters.
3. Replace the **illustrative** entries in the `COMMANDS` array in `assets/site.js` with the bot's verified commands, descriptions, and permission requirements.
4. Replace TBD licensing cards with your official offers; publish approved Terms of Service, Privacy Policy, and Refund Policy before offering paid plans.
5. Replace `assets/sepulchre-mark.svg` with your final original brand logo if you want to use the official production emblem. This website includes an original vector placeholder logo.
6. Connect an authenticated server-side API before presenting the dashboard as a functional Discord administration tool. Do **not** put Discord bot tokens, client secrets, or DB credentials in HTML/JS.
7. Review actual Discord OAuth scopes, role hierarchy, member intent requirements, and permissions before adding a production invite link.
8. Ensure all advertised features and bot versions match the deployed release.

## Important security and functionality notes

- Embeds are designed locally. JSON is copied or downloaded by the user; **no messages are posted**. Only valid `https://` image URLs are loaded in preview.
- Dashboard toggles are intentionally browser-local mock controls. They do not authenticate or modify any server.
- FAQ policy answers are deliberately noncommittal about terms not supplied.
- Charts, counts in the dashboard mock, and sample interface visuals are design placeholders, **not claimed metrics**.
- Pages have responsive CSS for mobile, reduced-motion support, and semantic controls.
- No external JS frameworks or CDNs are required.

## Page previews

The `previews` folder contains real Chromium screenshots of every page at desktop viewport size and a mobile homepage preview, generated from these exact files.
