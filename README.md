# fitness-zettel

Fitness Zettel is a minimalistic PWA to track your workouts.

The style is modeled after its real handwritten counterpart.

The data you save, is stored only on your device.

## Stack

- Typescript
- Vite as bundler and Dev-Server, with vite-plugin-pwa to generate a ServiceWorker and make it installable
- React
- Dexie (IndexedDB) for local data storage
- wouter for client side routing
- roughjs and Virgil-Font for the handdrawn style

## Development

- `npm run dev` to start the Dev-Server
- `npm run build` to run a production build

## Deployment

The PWA is hosted on GitHub Pages.

Pushes to `main` are deployed automatically via GitHub Actions CI/CD.

