# Jak na to — EOS Registrace

## Overview

Static Next.js page at `/jak-na-to` explaining how to register via the EOS member platform at eos.trampoliny.cz. Linked from the activity page sidebar when `registration.type === "eos"`.

## Architecture

- **Page:** `app/jak-na-to/page.tsx` — static content, one Sanity fetch for EOS login URL
- **URL:** `/jak-na-to`
- **Screenshots:** stored in `public/jak-na-to/step-1.png`, `step-2.png`, etc. — added manually by client
- **EOS login URL:** stored in Sanity `siteConfig` singleton, fetched at render time
- **Sidebar link:** `app/aktivity/[slug]/page.tsx` — "Jak na to →" updated from `href="#"` to `href="/jak-na-to"`

## Page Layout

1. **Nav** — fixed, same as all pages
2. **Hero section** — dark (`bg-border-dark`) background
   - Orange label: "Registrace"
   - H1: "Jak se přihlásit přes EOS"
   - Perex: short description of what EOS is
3. **Steps section** — alternating layout (desktop: text/screenshot side by side, mobile: stacked)
   - Each step: large orange step number (`01`, `02`...), step title, description text
   - Screenshot on alternating side (odd steps: text left + screenshot right; even: screenshot left + text right)
   - Screenshots styled with subtle border + box-shadow to look like UI previews
   - Content is hardcoded with placeholder steps — client fills in real text and uploads real screenshots
4. **CTA band** — dark background
   - Heading: "Máš účet?"
   - Button: "Otevřít EOS →" — URL from Sanity `siteConfig.eosLoginUrl`, fallback to `https://eos.trampoliny.cz/`
5. **Footer**

## Sanity Changes

### New schema type: `siteConfig`

```ts
// sanity/schemaTypes/siteConfig.ts
{
  name: 'siteConfig',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    {
      name: 'eosLoginUrl',
      title: 'EOS — přihlašovací odkaz',
      type: 'url',
    }
  ]
}
```

Register in `sanity/schemaTypes/index.ts`.

### New query

```ts
// sanity/lib/queries.ts
export type SiteConfig = {
  eosLoginUrl?: string
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    return await client.fetch(
      `*[_type == "siteConfig"][0] { eosLoginUrl }`,
      {},
      { next: { tags: ['siteConfig'] } }
    )
  } catch {
    return {}
  }
}
```

## Content (Placeholders)

Steps are hardcoded in the page component as a TypeScript array:

```ts
const steps = [
  {
    number: '01',
    title: 'Otevři přihlašovací stránku',
    description: '[doplnit popis]',
    image: '/jak-na-to/step-1.png',
  },
  // ... more steps
]
```

Client replaces placeholder text and adds real screenshots to `public/jak-na-to/`.

## Files Affected

- `app/jak-na-to/page.tsx` — new
- `sanity/schemaTypes/siteConfig.ts` — new
- `sanity/schemaTypes/index.ts` — register siteConfig
- `sanity/lib/queries.ts` — add SiteConfig type + getSiteConfig()
- `app/aktivity/[slug]/page.tsx` — update "Jak na to →" href from `#` to `/jak-na-to`
- `public/jak-na-to/` — screenshots added manually by client
