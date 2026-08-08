# SET Architecture

Site vitrine premium pour une agence d'architecture française. Accompagne les particuliers de la première idée à la réalisation via une méthode en 7 étapes.

## Run & Operate

- `pnpm --filter @workspace/set-architecture run dev` — frontend (port 5173)
- `pnpm --filter @workspace/api-server run dev` — API (port 8080)
- `pnpm run typecheck` — vérification TypeScript globale
- `pnpm run build` — typecheck + build de tous les packages
- `pnpm --filter @workspace/api-spec run codegen` — regénérer hooks API et schémas Zod
- `pnpm --filter @workspace/db run push` — pousser le schéma DB (dev uniquement)
- Variables d'env : voir `.env.example`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend : React 19, Vite 7, Tailwind CSS 4
- API : Express 5
- DB : PostgreSQL + Drizzle ORM
- Validation : Zod, drizzle-zod
- Codegen API : Orval (OpenAPI)

## Déploiement gratuit (sans Replit)

Le site frontend est une SPA statique — seul `@workspace/set-architecture` est nécessaire en production.

### Build local

```powershell
pnpm install
pnpm --filter @workspace/set-architecture run build
# Sortie : artifacts/set-architecture/dist/public/
```

### Netlify

Connecter le repo GitHub. Le fichier `netlify.toml` à la racine configure tout automatiquement.

### Vercel

Connecter le repo GitHub. Le fichier `vercel.json` à la racine configure tout automatiquement.

### Cloudflare Pages

| Paramètre | Valeur |
|-----------|--------|
| Build command | `pnpm install && pnpm --filter @workspace/set-architecture run build` |
| Output directory | `artifacts/set-architecture/dist/public` |
| Variables d'env | `PORT=5173`, `BASE_PATH=/` |

Le fichier `_redirects` (SPA fallback) est copié automatiquement depuis `artifacts/set-architecture/public/`.

## Where things live

- `artifacts/set-architecture/` — site principal (App.tsx, styles, composants UI)
- `artifacts/api-server/` — API Express (health check pour l'instant)
- `lib/api-spec/openapi.yaml` — contrat API
- `lib/db/src/schema/` — schéma PostgreSQL (Drizzle)

## Gotchas

- Les formulaires contact et réservation sont simulés côté client (pas de backend branché)
- `DATABASE_URL` requis uniquement pour l'API et Drizzle, pas pour le frontend
