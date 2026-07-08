# Juego de Arkanoid

Clon de Arkanoid en HTML + CSS + JavaScript vanilla, cero dependencias, jugable directo en navegador.

## Estado

Implementado (MVP jugable + nombre de jugador). Ver `specs/` para el detalle de cada feature.

## Cómo jugar

Abrir `index.html` en el navegador (o `npx serve .` para servirlo).

1. Ingresar nombre de jugador (se guarda en `localStorage`).
2. Mover la paleta con mouse o flechas/A-D.
3. Click para lanzar la bola.
4. Romper los 100 bloques sin perder las 3 vidas.

## Contenido

- `index.html`, `game.js` — juego (canvas 800x600, física de bola/paleta, colisión con bloques, HUD, overlay de fin de juego).
- `assets/assets/` — spritesheet (`spritesheet-breakout.png`, `spritesheet.js`) y sonidos (`ball-bounce.mp3`, `break-sound.mp3`).
- `specs/` — specs implementados vía flujo `/spec` + `/spec-impl`:
  - `01-mvp-arkanoid-jugable.md` — juego base.
  - `02-nombre-jugador.md` — nombre de jugador + persistencia en localStorage.

## Desarrollo

Sin lint/build/test configurado. Ver `CLAUDE.md` para flujo spec-driven y convenciones.
