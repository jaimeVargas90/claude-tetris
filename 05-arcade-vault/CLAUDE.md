@AGENTS.md

# CLAUDE.md

Este archivo guía a Claude Code (claude.ai/code) al trabajar en este repositorio.

## Qué es

Arcade Vault: plataforma para jugar online y competir por puntos/leaderboards. Por ahora es scaffold fresco de `create-next-app` (App Router, Next.js 16.2.10, React 19.2.4, TS, Tailwind v4) — sin lógica de juego todavía.

## Styles
Usa siempre /frontend-design para diseñas interfaces de usuario.

## Comandos

- `npm run dev` — servidor dev
- `npm run build` — build producción
- `npm run start` — correr build producción
- `npm run lint` — eslint (flat config, `eslint.config.mjs`)

Sin test runner configurado.

## Nota versión Next.js

Next.js más nuevo/distinto al de datos de entrenamiento — puede haber cambios de API/convenciones/estructura. Antes de escribir código, revisar `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`, `04-community`) por la guía relevante y respetar avisos de deprecación.

## Flujo: spec-driven design

Repo sigue desarrollo spec-driven vía comandos `/spec` y `/spec-impl` del skill pack `Klerith/fernando-skills` (se instala con `npx skills@latest add Klerith/fernando-skills`, aún no presente en este checkout). Cuando esos skills estén disponibles, usarlos para planear/implementar features en vez de cambios ad hoc.

## Estructura

- `app/` — raíz App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `public/` — assets estáticos

