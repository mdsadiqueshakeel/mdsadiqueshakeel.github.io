# Md Sadique Shakeel Portfolio

A cinematic, recruiter-focused developer portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and shadcn-style UI primitives.

## Highlights

- Resume-driven content for experience, projects, certifications, achievements, education, links, and metrics.
- Interactive hero with a lightweight Three.js system model.
- Premium project showcases for Smart Attendance System, GrowthAffinity, and GramFlix.
- Dark/light mode, smooth scrolling, animated reveal states, responsive layout, custom cursor, and accessible semantic sections.
- Resume download served from `public/Md_Sadique_Shakeel_SDE.pdf`.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber / Three.js
- next-themes
- lucide-react

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

The production build creates a static export in `out/`, which is what GitHub Pages deploys.

Preview the exported site locally:

```bash
npm run start
```

## GitHub Pages Deployment

Deployment is fully automated through GitHub Actions.

1. Push the repository to GitHub.
2. In the GitHub repository, open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**.
4. Push to the `main` branch.
5. The workflow in `.github/workflows/deploy.yml` will install dependencies, typecheck, lint, build the static export, upload `out/`, and deploy it to GitHub Pages.

The site is configured for the user-site domain:

```txt
https://mdsadiqueshakeel.github.io
```

Because this is a root GitHub Pages domain, `next.config.ts` does not set a `basePath` or `assetPrefix`. Static assets, routes, and downloads are emitted with root-relative paths that work correctly on `mdsadiqueshakeel.github.io`.

`public/.nojekyll` is included so GitHub Pages serves Next.js `_next` assets correctly.

No required environment variables are needed for the current static portfolio.
