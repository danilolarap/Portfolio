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

## Characters and projects

Use **Personajes / Characters** below Play and Controls to choose Steve, Alex, End Dragon, or Purple Traveler. The selection is saved in the browser. Characters share a cuboid renderer with pixel textures, shoulder and hip animation, smooth turning, and support for reduced motion preferences.

The project cards appear from right to left on desktop: RoomLayout, PackGuide, TiltClock, and MarbleOverdrive. On mobile they stack in that same reading order. Covers keep their original proportions and open at full size when clicked. The same covers are used in the world's project station.

Original cover files belong in `public/projects/`:

- `roomlayout.jpg` — original artwork included.
- `packguide.jpg` — original artwork included.
- `tiltclock.jpg` — original artwork included.
- `marbleoverdrive.png` — original artwork included.

The three JPEG covers were copied byte-for-byte from the supplied JFIF files; only their filename extensions changed. Missing covers display the project name. Keep the supplied images unchanged; do not replace them with generated artwork.

## Content still needed

The interface deliberately marks missing information as pending. Before final submission, add a real resume PDF, project details and screenshots, education and work history, and confirmed contact channels. Do not replace placeholders with invented claims.

Testimonials include the supplied quotes and portraits for Diego Sandoval (5/5), Juan Pinilla (5/5), and Nicolás Ramos (4/5), with English translations and Nether star ratings. Original portrait files are preserved in `public/testimonials/`; the cards display a 4:3 crop without modifying the source images.

## Deployment

The application is ready for a standard Next.js deployment on Vercel. Import the GitHub repository into Vercel, keep the detected Next.js settings, and deploy after the final content has been reviewed.
