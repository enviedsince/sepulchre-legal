# Sepulchre — Premium Public Website v15 (static GitHub Pages build)

## What this is
A public product-information and purchase-routing website, not a Discord administration dashboard or payment gateway. Seven pages: Home, Features, Commands, Purchase, FAQ, Embed Studio, Status information. Styled in red/black/silver; designed for low-motion accessibility, mobile, and desktop.

## Install on GitHub Pages
1. Back up the existing website repository first.
2. Unzip **the contents** into the website repository root next to `index.html` (not inside another directory). Keep the `assets/` folder. Each HTML contains its own CSS and JavaScript to avoid the previously observed unstyled-white-page failure if an asset path is broken. Source copies are in `assets/style.css` and `assets/site.js`; the links and images use **relative paths** so the site also works from `https://YOURNAME.github.io/sepulchre-legal/` as a GitHub project site.
3. Commit and push. Confirm GitHub Pages source is set to the correct branch and directory. After the Pages deployment finishes, hard refresh using Ctrl+Shift+R.
4. Keep any existing `terms/`, `privacy/`, `refunds/`, `docs/`, and `commands-data.json` files when updating the official Sepulchrebot repository. This ZIP does not overwrite them. The footer links to the existing official published policy pages.
5. Test Home → Purchase → Discord and the command catalog from the published Pages URL, not only the local file.

## Purchase flow
Navigation `Purchase` opens `purchase.html`. Button `Purchase through Discord` and final `Continue to Discord` open the **published official support server**: https://discord.gg/88nA6GTD7Q. There is no checkout and no collection of payment or Discord credentials. Price is the published $5.99 USD one-time per-server license (from Sepulchre v14 review), and available payment methods must be confirmed with staff.

## Logo
`assets/sepulchre-mark-cropped.png` is a locally embedded **preview extraction from the supplied V14 screenshot**, not a replacement for the user's original high-resolution master logo. To achieve fully sharp branding, replace this image with the high-resolution original from your production `assets/` directory and update the matching image paths in generated HTML. The original public favicon is also accessible at `https://raw.githubusercontent.com/Sepulchrebot/sepulchrebot.github.io/main/assets/sepulchre-sp-crimson-new-favicon.png` but is small. No proprietary font files from third-party references are redistributed; this site uses DM Sans, Manrope and Instrument Serif with fallbacks.

## Commands
`commands.html` first tries `./commands-data.json`, so deployment to the existing official repository reuses the existing 316-declaration file. If absent, it fetches the original published repository JSON over HTTPS: `https://raw.githubusercontent.com/Sepulchrebot/sepulchrebot.github.io/main/commands-data.json`. **Internet access is needed if the file isn't local.** If CORS/network blocks retrieval, a link to the original command directory appears; invented commands never appear. Legacy commerce commands are hidden by default. This is a source catalog, not proof of live command registration.

## Other pages
The Embed Studio creates, previews, copies, and downloads JSON in-browser only. The status page does not claim a live bot status. FAQ answers reflect published purchase/license statements and general setup. Existing official Terms/Privacy/Refund URLs are linked, not rewritten. The website runs without a build step or framework. JavaScript adds movement/search/editing but CSS remains functional if JavaScript is unavailable.

## Testing
Open `index.html`, or run `python -m http.server 8000` inside this folder then open `http://localhost:8000`. Chrome/Chromium or Firefox recommended. On GitHub Pages, all pages/assets must be uploaded together. This build does not deploy or change the user's GitHub repository or Discord bot.

## Previews and browser check limitation
The `previews/` folder contains **Pillow-generated static visual concepts**, not real browser screenshots. The local Chromium browser in this execution environment returned `ERR_BLOCKED_BY_ADMINISTRATOR` even for `data:` and `file:` URLs, so a genuine Chrome screenshot could not be captured. The site passed file/path/markup checks, CSS token parsing, and Node.js JavaScript syntax checks; this is **not** a claim that interactive browser behavior was validated end-to-end. Test the published GitHub Pages deployment before replacing the public site.

Each HTML page embeds CSS and JS. If you customize `assets/style.css` or `assets/site.js`, regenerate the inlined copies before deployment (or edit the inline CSS/JS directly). The `tools/rebuild-inline.py` utility updates those copies.
