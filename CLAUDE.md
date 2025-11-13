# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **AstroWind** website built with **Astro 5.0** and **Tailwind CSS**. AstroWind is a production-ready template designed for startups, small businesses, SaaS websites, portfolios, marketing sites, and blogs with a focus on web performance and SEO.

**Key Features:**
- Static site generation (SSG) by default with `output: 'static'`
- Blog system with MDX support, categories, tags, and RSS feeds
- Dark mode support configured via `src/config.yaml`
- Image optimization using Astro Assets and Unpic
- SEO-optimized with Open Graph tags and sitemap generation
- Analytics integration (Google Analytics ready)

## Commands

Development workflow commands (run from project root):

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally

# Code Quality
npm run check        # Run all checks (Astro, ESLint, Prettier)
npm run check:astro  # Check Astro files only
npm run check:eslint # Run ESLint only
npm run check:prettier # Check Prettier formatting

npm run fix          # Fix all linting and formatting issues
npm run fix:eslint   # Fix ESLint issues only
npm run fix:prettier # Fix Prettier formatting only
```

## Architecture

### Configuration System

The project uses a **custom Astro integration** (`vendor/integration/`) that creates a virtual module `astrowind:config` to provide centralized configuration:

- **Main config:** `src/config.yaml` - Controls site metadata, blog settings, analytics, UI theme, and all major site behavior
- **Navigation:** `src/navigation.ts` - Defines header menu and footer data using permalink helpers
- **Config access:** Import from `astrowind:config` (e.g., `import { SITE, APP_BLOG } from 'astrowind:config'`)

Key config sections in `src/config.yaml`:
- `site`: Base URL, trailing slashes, Google verification
- `metadata`: Default SEO metadata, Open Graph, Twitter cards
- `apps.blog`: Blog feature toggles, pagination, permalink patterns
- `analytics`: Google Analytics configuration
- `ui.theme`: Theme mode (system/light/dark)

### Content Collections

Blog posts use **Astro Content Collections** with the new loader-based API:

- **Collection definition:** `src/content/config.ts`
- **Post files:** `src/data/post/*.md` or `*.mdx`
- **Schema:** Posts include `publishDate`, `title`, `excerpt`, `image`, `category`, `tags`, `author`, `draft` flag, and metadata
- **Loader:** Uses `glob()` loader to automatically discover posts from `src/data/post/`

### Blog System

The blog architecture is centered around `src/utils/blog.ts`:

**Key functions:**
- `fetchPosts()`: Loads and caches all published posts (sorted by date, excludes drafts)
- `getNormalizedPost()`: Transforms raw post data, generates permalinks, adds reading time
- `getStaticPathsBlogList()`: Generates paginated blog list pages
- `getStaticPathsBlogPost()`: Generates individual post pages
- `getStaticPathsBlogCategory()`: Generates category archive pages
- `getStaticPathsBlogTag()`: Generates tag archive pages
- `getRelatedPosts()`: Finds related posts by category (5 points) and tags (1 point each)

**Routing pattern:**
- Blog posts: `src/pages/[...blog]/` uses dynamic routing
- Permalink pattern: Configured in `src/config.yaml` via `apps.blog.post.permalink` (default: `/%slug%`)
- Categories: `/category/{slug}`
- Tags: `/tag/{slug}`

### Permalinks & Slugs

`src/utils/permalinks.ts` provides centralized URL management:

- `getPermalink(slug, type)`: Generates URLs for pages, posts, categories, tags, assets
- `cleanSlug()`: Normalizes text to URL-safe slugs using `limax` library
- `getCanonical()`: Creates canonical URLs respecting `trailingSlash` config
- Supports special types: 'home', 'blog', 'post', 'category', 'tag', 'asset', 'page'

### Component Structure

**Layouts:** (`src/layouts/`)
- `Layout.astro`: Base layout with SEO, analytics, favicons
- `PageLayout.astro`: Standard page wrapper with Header/Footer
- `MarkdownLayout.astro`: Blog post layout with metadata

**Widgets:** (`src/components/widgets/`)
Reusable page sections: Header, Footer, Hero, Hero2, HeroText, Features, Features2, Features3, Content, Steps, Steps2, CallToAction, Contact, FAQs, Pricing, Testimonials, Stats, Brands, BlogLatestPosts, BlogHighlightedPosts, Announcement, Note

**Blog Components:** (`src/components/blog/`)
Blog-specific UI elements for post lists, single posts, tags, categories

**UI Components:** (`src/components/ui/`)
Base UI elements and form controls

### Markdown Processing

Custom remark/rehype plugins in `src/utils/frontmatter.ts`:
- `readingTimeRemarkPlugin`: Calculates reading time, adds to frontmatter
- `responsiveTablesRehypePlugin`: Makes tables responsive
- `lazyImagesRehypePlugin`: Adds lazy loading to images

### Styling

- **Framework:** Tailwind CSS with custom configuration in `tailwind.config.js`
- **Base styles:** `src/assets/styles/tailwind.css`
- **Custom styles:** `src/components/CustomStyles.astro` for font families and theme colors
- **Dark mode:** Configured via `ui.theme` in `src/config.yaml`
- **Typography:** Uses `@tailwindcss/typography` plugin for markdown content

### Path Aliasing

The `~` alias resolves to `./src/`:
```typescript
import { SITE } from '~/config.yaml'
```

## Important Development Notes

**Content Location:** Blog posts are stored in `src/data/post/`, not `src/content/post/` (collection definition uses glob loader pointing to `src/data/post/`)

**Blog Feature Toggle:** The entire blog can be disabled via `apps.blog.isEnabled: false` in `src/config.yaml`

**Static Output:** Currently configured for static output. Blog only works with static prerendering. SSR support is planned for future versions.

**Image Domains:** External image domains must be added to `image.domains` array in `astro.config.ts`

**Integration Order Matters:** The custom `astrowind` integration must be loaded to provide the virtual config module that other code depends on

**Node Version:** Requires Node.js ^18.17.1 || ^20.3.0 || >= 21.0.0
