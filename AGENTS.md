# Mario Xenomorph — project instructions

## Project

- This is a TypeScript game built with Vite and the open-source `phaser` npm package (currently Phaser 4). Do not replace it with Phaser AE unless the user asks for that migration.
- The game entry point is `src/game/main.ts`; scenes and level data live in `src/game/scenes/`.
- Procedural game textures are generated in `src/game/scenes/Game.ts`; static files belong in `public/assets/` and are loaded in `Preloader.ts`.
- The game is deployed as a static Vite build to GitHub Pages. Preserve the relative asset base in `vite/config.prod.mjs` and the workflow in `.github/workflows/deploy.yml`.

## Development commands

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production site in `dist/`.
- `npx tsc --noEmit` checks TypeScript types.

## Editing guidance

- Import Phaser runtime values explicitly from `phaser`; use the `Phaser` namespace only for TypeScript types. Do not rely on a global `Phaser` variable in browser code.
- Keep the three game levels, keyboard controls, HUD, and Polish UI unless the user asks to change them.
- Do not commit generated `dist/`, `node_modules/`, local environment files, or Codex session logs.
- Keep project-specific Codex settings in `.codex/config.toml`; never put credentials or machine-specific paths there.
