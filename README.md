# Miro Mariapori Portfolio

Personal portfolio and CV website for [mariapori.dev](https://mariapori.dev).
The site presents Miro Mariapori's background, work experience, projects, and
contact details in English and Finnish.

## Tech Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- `next-intl` for English and Finnish localization
- CSS Modules and global CSS for styling
- Next Metadata API, generated `robots.txt`, generated sitemap, and JSON-LD
- `@vercel/analytics` for analytics

## Features

- Localized routes for `en` and `fi`
- Pages for about/home, CV, projects, and contact
- Locale switcher and shared header/footer
- Search-friendly metadata, Open Graph data, Twitter card data, and structured
  data for profile, website, collection, and contact pages
- Static assets for profile images, icons, favicons, and web app manifest
- Optional PM2 process configuration for a self-hosted production server

## Project Structure

```text
messages/                Localized page copy for English and Finnish
public/                  Static assets, profile images, icons, and manifest
src/app/                 App Router routes, sitemap, robots, and global styles
src/app/[locale]/        Localized pages and shared localized layout
src/components/          Header, footer, language switcher, and JSON-LD helper
src/config/site.ts       Site metadata, routes, locales, and contact links
src/i18n/                next-intl routing and request configuration
src/proxy.ts             Next.js Proxy for locale-aware routing
src/utils/               SEO and formatting helpers
```

## Requirements

- Node.js 20.9 or newer
- npm, using the included `package-lock.json`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default locale is
English, with Finnish available under `/fi`.

## Scripts

```bash
npm run dev      # Start the local development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## Content

Most rendered site content is stored in:

- `messages/en.json`
- `messages/fi.json`

Site-wide settings such as the production URL, supported locales, route list,
profile image, email, phone number, LinkedIn URL, and GitHub URL live in
`src/config/site.ts`.

When adding a new page, update the localized route content, navigation labels,
metadata, and `siteConfig.routes` so the sitemap and language alternates stay in
sync.

`NEXT_PUBLIC_SITE_URL` is used when generating absolute URLs for metadata,
structured data, robots, and the sitemap. If it is not set, the project falls
back to `https://mariapori.dev`.

## Deployment

For a typical Node deployment:

```bash
npm install
npm run build
npm run start
```

The included `ecosystem.config.js` can be used with PM2. It starts the Next.js
production server on port `3000` and is configured for the production project
path used on the target host.
