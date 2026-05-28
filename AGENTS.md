# AGENTS.md - CardForge

## Project Overview

CardForge is a **HearthStone card DIY tool**. Users can customize card types (minion, spell, weapon, hero, battlegrounds minion, location), classes, rarity, stats, and card faces — then export the result as a PNG image. The site supports PWA offline use.

- **Repo**: [Vincent-the-gamer/cardforge](https://github.com/Vincent-the-gamer/cardforge)
- **Tech Stack**: Vue 3 (Composition API) + TypeScript + Vite + Pinia + UnoCSS

---

## Tech Stack & Key Dependencies

| Category     | Technology                                     |
| ------------ | ---------------------------------------------- |
| Framework    | Vue 3 (SFC `<script setup lang="ts">`)         |
| Language     | TypeScript (strict mode)                       |
| Build        | Vite 6                                         |
| State        | Pinia                                          |
| Styling      | UnoCSS (Wind3 preset + attributify + icons)    |
| i18n         | vue-i18n (zh / en)                             |
| Utilities    | @vueuse/core                                   |
| Image Export | modern-screenshot (`domToPng`)                 |
| PWA          | vite-plugin-pwa                                |
| Auto-imports | unplugin-auto-import + unplugin-vue-components |

---

## Project Structure

```
src/
├── assets/              # Static assets (fonts, images)
├── components/
│   ├── Card/            # Card face components per type
│   │   ├── Card.vue           # Root card component (type dispatcher)
│   │   ├── Minion.vue
│   │   ├── Spell.vue
│   │   ├── Weapon.vue
│   │   ├── Hero.vue
│   │   ├── BattlegroundsMinion.vue
│   │   ├── Location.vue
│   │   ├── Mask.vue           # Export overlay mask
│   │   └── Watermark.vue      # Set watermark overlay
│   └── Menu/            # Configuration menus per card type
│       ├── MinionMenu.vue
│       ├── SpellMenu.vue
│       ├── WeaponMenu.vue
│       ├── HeroMenu.vue
│       ├── BattlegroundMinionMenu.vue
│       └── LocationMenu.vue
├── datatypes/           # TypeScript enums & type definitions
│   ├── card.ts          # CardType, CardClass, Rarity, Flag, WaterMark, etc.
│   └── websocket.ts     # WebSocket state types
├── hooks/               # Shared composables (auto-imported)
│   ├── useCardClassMap.ts
│   ├── useStyledDescription.ts
│   └── useWaterMarkMap.ts
├── i18n/                # Internationalization
│   ├── index.ts
│   ├── en/              # English translation JSON
│   └── zh/              # Simplified Chinese translation JSON
├── layouts/             # Page layout components
│   ├── CardPageLayout.vue
│   ├── MobileCardPageLayout.vue
│   ├── CardLayout.vue
│   └── FormLayout.vue
├── store/               # Pinia store
│   └── index.ts         # Single store: useStore("card")
├── utils/               # Utility functions
│   ├── isMobile.ts      # Mobile device detection
│   └── toggleDark.ts    # Dark mode toggle
├── App.vue              # Root component
├── main.ts              # App entry point
└── main.css             # Global styles
```

---

## Coding Conventions

### Vue Components

- **Always use `<script setup lang="ts">`** — the project exclusively uses Composition API with `<script setup>`.
- Component names are **PascalCase** in templates (e.g., `<CardPageLayout />`).
- Props, emits, and refs are typed with TypeScript.

### Auto-Imports (Do NOT manually import these)

These are auto-imported globally — **never add manual `import` statements for them**:

- **Vue APIs**: `ref`, `reactive`, `computed`, `watch`, `onMounted`, etc.
- **@vueuse/core**: `useDark`, `useTitle`, `useMouseInElement`, `usePageLeave`, `useI18n`, etc.
- **vue-i18n**: `useI18n`
- **Custom hooks** (`src/hooks/*`): `useCardClassMap`, `useStyledDescription`, `useWaterMarkMap`
- **Data types** (`src/datatypes/*`): `CardType`, `CardClass`, `Rarity`, `ClassType`, `KindType`, `Flag`, `WaterMark`, `WebSocketState`
- **Store** (`src/store/*`): `useStore`
- **Components** (`src/components/*`): All components in the `components/` tree are auto-registered.

### Path Aliases

- `@/` → `src/` (e.g., `@/utils/isMobile`)
- `~/` → project root

### State Management

- There is one Pinia store: `useStore("card")`.
- All card configuration lives in this store (card type, class, rarity, stats, description, etc.).
- Use store actions (e.g., `store.setCardType(...)`) when updating state from menus.

### Styling

- Use **UnoCSS utility classes** (Tailwind/Wind3-compatible).
- **Attributify mode** is enabled — use `flex="~ row"` instead of `class="flex flex-row"` when preferred.
- Custom UnoCSS rules exist for: `bg-rgba-*`, `font-family-*`, `hearth-stroke-*`, `white-space-*`, `box-shadow-*`.
- Shortcuts: `button`, `select`, `input-text`.
- Icons via `i-{collection}-{name}` (e.g., `i-grommet-icons-menu`).

### i18n

- All user-facing strings must use `$t("key")` in templates or `t("key")` in `<script>`.
- Translation keys are added to both `src/i18n/en/` and `src/i18n/zh/` JSON files.
- Default locale is `"en"`.

### Card Types Architecture

- The root `Card.vue` component dispatches rendering based on `store.cardType` (enum `CardType`).
- Each card type has a corresponding **Card component** (`components/Card/`) and **Menu component** (`components/Menu/`).
- When adding a new card type: create both components, add the enum variant, hook it up in `Card.vue` and `CardPageLayout.vue`.

### Image Export

- Uses `modern-screenshot`'s `domToPng()` to capture the `#card` element.
- Before capture: card text color is forced to `black`, and `Mask.vue` overlay is toggled on.

### Mobile Support

- `isMobile()` from `@/utils/isMobile` determines device type.
- Separate layouts: `CardPageLayout.vue` (desktop) vs `MobileCardPageLayout.vue` (mobile).
- Responsive breakpoint: 1024px.

---

## Commands

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start dev server on `localhost:8080` |
| `pnpm build`   | Production build                     |
| `pnpm preview` | Preview production build             |
| `pnpm dep`     | Update dependencies (taze)           |

---

## Key Rules for Agents

1. **Do not manually import** Vue APIs, VueUse, vue-i18n, Pinia store, data types, or hooks — they are auto-imported.
2. **Always use `<script setup lang="ts">`** and Composition API.
3. **Keep i18n in sync** — when adding user-facing strings, add keys to both EN and ZH translation files.
4. **Follow the Card/Menu component pattern** — new card types need a pair of components.
5. **Use store actions** (not direct state mutation) when modifying card state from menu components.
6. **Respect the existing UnoCSS patterns** — use utility classes and attributify syntax consistently.
7. **TypeScript strict mode is on** — avoid `any`, provide proper types.
8. **Pinia store is the single source of truth** for all card configuration state.
