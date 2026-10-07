# Daléas Danse — refonte du site

Site statique [Astro](https://astro.build), prêt pour Netlify.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
```

## Modifier le contenu

**Tout ce qui change chaque saison est dans [`src/data/site.ts`](src/data/site.ts)** :

| Quoi | Variable |
|---|---|
| Bandeau d'annonce de l'accueil (rentrée, gala…) | `announcement` |
| Saison affichée | `season` |
| Horaires des cours | `schedule` |
| Tarifs, règlement | `membership`, `kidsPricing`, `mainPricing`, `unlimited`, `singleClass`, `card10`, `pricingRules` |
| Stages week-end / été | `weekends`, `summerCamp` (`past: false` affiche le bouton « S'inscrire ») |
| Téléphones, e-mail, adresse, réseaux | `site` |

Le nombre de cours par semaine et la vue « par jour » du planning sont calculés automatiquement.

## Structure

- `src/pages/` — une page par fichier. Les URL de l'ancien WordPress sont conservées à l'identique (SEO).
- `src/components/` — header, footer, boutons, en-tête de page.
- `src/styles/global.css` — tokens de design (couleurs, typo, espacements).
- `src/assets/img/` — photos (optimisées en WebP au build).
- `public/_redirects` — redirections 301 des anciennes URL WordPress.

## À compléter avant mise en ligne

- `src/pages/mentions-legales.astro` : SIRET, responsable de publication, hébergeur.
- Photos en meilleure résolution (les originales du site font ~700 px de large).

## Publication

Chaque envoi sur la branche `main` publie automatiquement le site sur GitHub Pages
(`.github/workflows/deploy.yml`). Le script `scripts/base-path.mjs` adapte les liens
au sous-dossier du dépôt ; il est ignoré sur un domaine propre.
