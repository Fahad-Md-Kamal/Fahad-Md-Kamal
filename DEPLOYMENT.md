# Deployment Guide — Fahad-Md-Kamal Portfolio

How this specific repo is set up and deployed. Written from the actual
state of the repo (checked via `gh api repos/.../pages`, `git remote -v`,
`vite.config.ts`) — not a generic template.

## Current setup

- **Remote:** `git@github.com:Fahad-Md-Kamal/Fahad-Md-Kamal.git`
- **Source branch:** `portfolio` (the branch you edit and commit on)
- **Vite base path:** `/Fahad-Md-Kamal/` (set in `vite.config.ts`, prod only)
- **GitHub Pages source:** **legacy branch-based deploy from `gh-pages`**
  (confirmed via `gh api repos/Fahad-Md-Kamal/Fahad-Md-Kamal/pages` →
  `"build_type":"legacy","source":{"branch":"gh-pages"}`)
- **Live URL:** https://fahad-md-kamal.github.io/Fahad-Md-Kamal/

### About `.github/workflows/deploy.yml`

This workflow exists in the repo and is wired to run on push to `main`
using the newer Actions-based Pages deployment
(`actions/deploy-pages@v2`). **It does not currently publish anything** —
Pages is set to the legacy `gh-pages`-branch source, not "GitHub Actions",
so this workflow's deploy job has no effect even if it runs. The only
thing that actually publishes the live site is `npm run deploy` (below).
If you ever want the Actions workflow to be the real deploy path instead,
switch the Pages source in Settings → Pages → Build and deployment →
Source → "GitHub Actions", and push to `main` instead of `portfolio`.

## Routine deploy (the normal case)

You're on the `portfolio` branch, you've made changes, and you want them
live.

```bash
# 1. Sanity-check the build compiles
npm run build

# 2. (optional) preview it locally
npm run dev
# or: npm run preview

# 3. Commit and push your source changes
git add <files>
git commit -m "Describe the change"
git push origin portfolio

# 4. Build + publish to GitHub Pages (this is the actual deploy step)
npm run deploy
```

`npm run deploy` runs `npm run build && gh-pages -d dist` — it rebuilds
`dist/` and force-pushes it to the `gh-pages` branch via the `gh-pages`
npm package. GitHub Pages serves directly from that branch, so the site
updates within roughly a minute.

### Verify it went live

```bash
git fetch origin gh-pages
git log origin/gh-pages -1 --oneline

curl -sIL https://fahad-md-kamal.github.io/Fahad-Md-Kamal/ | head -5
# look for a fresh "last-modified" header
```

## Common edits

**Add/update a project:** edit `src/data/projects.json`, put any image
under `public/images/projects/` (that's the only image directory —
Vite's `publicDir` is `public/`, so files must live there to be served),
then run the routine deploy above.

**Update profile/experience/education/certifications:** edit the
matching file in `src/data/` (`profile.json`, `experience.json`,
`education.json`, `certifications.json`), then deploy.

**Add a new top-level section:** add a component in `src/components/`,
wire it into `src/App.tsx` and, if it should be reachable from the nav,
into `navLinks` in `src/components/Header.tsx`.

## Troubleshooting

- **404 / broken asset paths after deploy:** check `vite.config.ts` —
  `base` must stay `/Fahad-Md-Kamal/` to match this repo's Pages URL.
- **Images not loading:** files must exist under `public/images/...`
  — that's the only image directory this repo uses (a duplicate
  top-level `images/` folder existed at one point and was removed).
- **`npm run deploy` fails on push:** `gh-pages` pushes over SSH/HTTPS
  using your existing git credentials — make sure `git push` works
  normally first.
- **Pushed to `portfolio` but the site didn't change:** expected —
  pushing source doesn't publish by itself. You still need to run
  `npm run deploy`.
























