# CLAUDE.md

Este archivo da guía a Claude Code (claude.ai/code) al trabajar en este repositorio.

## Proyecto

Clon de Arkanoid. HTML + CSS + JavaScript vanilla, cero dependencias, jugable en navegador. **Implementación en curso vía specs** — MVP jugable y nombre de jugador ya implementados.

## Estado actual

- `index.html` + `game.js` — juego implementado (canvas 800x600, paleta, bola, bloques, HUD, overlay fin de juego, nombre de jugador en `localStorage`).
- `assets/assets/` — spritesheet (`spritesheet-breakout.png`), `spritesheet.js`, efectos de sonido (`ball-bounce.mp3`, `break-sound.mp3`). `assets/__MACOSX/` es basura de zip de macOS, se puede ignorar/borrar.
- `specs/` — specs implementados: `01-mvp-arkanoid-jugable.md`, `02-nombre-jugador.md`.
- Sin comandos de lint/build/test — ninguno configurado. Correr abriendo `index.html` o `npx serve .`.

## Flujo spec-driven

Esta carpeta usa las skills `spec` / `spec-impl` (traídas vía `skills-lock.json` desde `Klerith/fernando-skills`):

- `/spec` — aclara requisitos con preguntas y respuestas, luego escribe un spec en `specs/NN-slug.md` (estado `Draft`).
- `/spec-impl` — implementa un spec aprobado, marca el spec como `Implementado` al terminar.

Cada spec sigue esta estructura (ver `specs/01-*.md`, `specs/02-*.md` de referencia):
- **Header:** Estado (`Draft`/`Implementado`), Dependencias (specs previos requeridos), Fecha.
- **Objetivo:** 1-2 líneas, qué se construye y por qué.
- **Alcance:** subsecciones "Incluido (in scope)" / "Fuera de alcance (not in scope)", explícitas y exhaustivas.
- **Modelo de datos:** estructuras/objetos JS nuevos con shape exacto (o "no hay estructuras nuevas" si aplica).
- **Plan de implementación:** pasos numerados y secuenciales (solo en specs que agregan lógica de juego sustancial).

Antes de escribir código nuevo desde cero, revisar `specs/` — es el punto de entrada para definir alcance, modelo de datos y plan. Numerar specs nuevos secuencialmente (`03-*.md`, etc.), declarar dependencias de specs previos.

## Idioma

Responder siempre en español en este proyecto.

## Trabajando acá

Parte de un repo de práctica multi-ejercicio (`claude-estudio`) — cada carpeta numerada de nivel superior es independiente. No dejar que cambios se filtren a carpetas hermanas.
