# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Tetris clásico en HTML5 Canvas + JS vanilla. Sin dependencias, sin build, sin package.json.

## Run

```bash
start index.html       # abrir directo (Windows)
npx serve .             # o cualquier servidor estático
```

No hay lint/build/test.

## Files

- `index.html` — DOM: `<canvas id="board">` (300×600), panel lateral (score/lines/level/next), overlay pausa/game-over.
- `style.css` — tema dark/retro.
- `game.js` (~300 líneas) — toda la lógica.

## Architecture (game.js)

- Tablero: matriz `ROWS×COLS`, celda = `0` (vacía) o índice de color 1–7.
- Piezas: matrices cuadradas; rotación = transposición + reverso de filas (`rotateCW`).
- `collide` — colisión pieza vs bordes/bloques fijados.
- `tryRotate` — wall kick: si rota y choca, prueba desplazar ±1/±2 columnas.
- `loop` (rAF) — acumula dt, baja pieza al superar `dropInterval`, dibuja, se re-agenda.
- `clearLines` — recorre de abajo hacia arriba, elimina filas completas, inserta vacías arriba.
- Puntuación: tabla `LINE_SCORES = [0,100,300,500,800]` × nivel; hard drop = 2 pts/celda, soft drop = 1 pt/fila.
- Nivel sube cada 10 líneas; velocidad = `max(100, 1000 - (level-1)*90)` ms.
- `ghostY` — proyecta aterrizaje de pieza actual, dibuja con `globalAlpha=0.2`.
- `spawn()` colisiona al generar → `endGame()`.

Tunables en game.js: `COLS`, `ROWS`, `BLOCK`, `COLORS`, `LINE_SCORES`, `dropInterval`. Si cambias `COLS`/`ROWS`/`BLOCK`, ajustar `width`/`height` de `<canvas id="board">` en index.html (`COLS×BLOCK` × `ROWS×BLOCK`).
