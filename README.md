# Germán García Gil · Portfolio

Bilingual (EN/ES) portfolio built with React + Vite. No database: all content lives in `src/data`, all images in `public/images`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Deploy to Netlify

Connect the repository in Netlify (or drag the `dist/` folder into Netlify Drop). `netlify.toml` already sets the build command (`npm run build`), the publish folder (`dist`), the SPA redirect so routes like `/about` work on refresh, and cache headers.

## Where to edit content

| What | File |
| --- | --- |
| Name, contact, headline stats | `src/data/profile.js` |
| The five areas and “Other skills” | `src/data/areas.js` |
| Case studies and smaller projects | `src/data/projects/*.js` |
| About me | `src/data/about.js` |
| Timeline | `src/data/timeline.js` |
| Interface texts (buttons, labels) | `src/data/ui.js` |

Every text is an `{ en, es }` pair. Inside content strings you can use `**bold**`, `` `code` `` and `[link text](/internal-or-https-url)`.

Content blocks available for project pages: `p`, `h`, `list`, `plus` (“+” card), `alert` (“!” card), `steps` (expandable steps), `figure`, `gallery`, `code`, `kpis`, `columns`, `table`, `link`, `links`, `download`.

To show a “Visit live page” button on the SupplyForge case study, set `SUPPLYFORGE_URL` in `src/data/projects/supplyforge.js`.
