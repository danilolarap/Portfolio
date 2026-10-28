# Danilo portfolio

An interactive portfolio built with Next.js, TypeScript, Tailwind CSS, and an isometric block world. Visitors can explore the world with a keyboard or touch controls, open four stations, and navigate the full portfolio through a sticky menu. The interface supports Spanish and English.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Use `npm run build` to verify a production build, `npm run typecheck` to check TypeScript, and `npm run format:check` to check source formatting.

## Structure

- `src/app/page.tsx` composes the portfolio sections in the required order.
- `src/components/Hero.tsx` manages the interactive world and its controls.
- `src/components/GameCanvas.tsx` renders the isometric scene.
- `src/components/` contains one component for each portfolio section.
- `src/data/content.ts` holds the Spanish and English copy and the section types.

## Content still needed

The interface deliberately marks missing information as pending. Before final submission, add a real resume PDF, project details and screenshots, at least three authentic testimonials, education and work history, and confirmed contact channels. Do not replace placeholders with invented claims.

## Deployment

The application is ready for a standard Next.js deployment on Vercel. Import the GitHub repository into Vercel, keep the detected Next.js settings, and deploy after the final content has been reviewed.
