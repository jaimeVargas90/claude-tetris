# CLAUDE.md

Este archivo da guía a Claude Code (claude.ai/code) al trabajar en este repositorio.

## Proyecto

Clon de Arkanoid. Plan: HTML + CSS + JavaScript vanilla, cero dependencias, jugable en navegador. **Todavía no implementado** — el repo por ahora solo tiene assets y tooling de spec, sin código de juego.

## Estado actual

- `assets/assets/` — spritesheet (`spritesheet-breakout.png`), `spritesheet.js`, efectos de sonido (`ball-bounce.mp3`, `break-sound.mp3`). `assets/__MACOSX/` es basura de zip de macOS, se puede ignorar/borrar.
- No existen todavía `index.html`, `game.js`, ni config de build.
- Sin comandos de lint/build/test — ninguno configurado.

## Flujo spec-driven

Esta carpeta usa las skills `spec` / `spec-impl` (desde `.agents/skills/`, traídas vía `skills-lock.json` desde `Klerith/fernando-skills`):

- `/spec` — aclara requisitos con preguntas y respuestas, luego escribe un spec en `specs/NN-slug.md` (estado `Draft`).
- `/spec-impl` — implementa un spec aprobado.

Antes de escribir código de juego desde cero, revisar si existe un spec en `specs/` (todavía no existe al momento de escribir esto) — es el punto de entrada pensado para definir alcance, modelo de datos y plan de implementación.

## Idioma

Responder siempre en español en este proyecto.

## Trabajando acá

Parte de un repo de práctica multi-ejercicio (`claude-estudio`) — cada carpeta numerada de nivel superior es independiente. No dejar que cambios se filtren a carpetas hermanas.
