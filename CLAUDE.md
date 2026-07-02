# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo

Practice/study repo (`claude-estudio`). Not one app — a collection of small, unrelated exercises, each in its own numbered top-level folder. No shared build, deps, or tooling across folders. Treat each folder as an independent project scoped to itself.

## Folders

- `01-first-code/` — `contador.html`: single-file counter, plain HTML/CSS/inline JS, no build. Open directly in browser.
- `02-asteroids/claude-asteroids-main/` — Asteroids clone: HTML5 canvas + vanilla ES6+ JS, all game logic in `game.js`. Has its own `CLAUDE.md` with full architecture notes — read that before editing anything in this folder. Run via opening `index.html` or `npx serve .`.

No lint/build/test commands anywhere in the repo — none configured.

## Working here

When a task targets one exercise folder, don't let changes leak into sibling folders — they are unrelated and independently runnable.
