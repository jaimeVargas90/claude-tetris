# 02 - Nombre de Jugador

**Estado:** Implementado
**Dependencias:** spec 01 (MVP Arkanoid jugable)
**Fecha:** 2026-07-08

## Objetivo
Agregar pantalla previa que pide nombre de jugador (validado, guardado en localStorage) y lo muestra en el HUD del canvas durante la partida.

## Alcance

### Incluido (in scope)
- Pantalla previa (overlay sobre canvas) con input de texto para nombre, antes de arrancar el juego.
- Validación: nombre vacío bloquea inicio (trim), máx 15 caracteres (`maxlength`).
- Guardado del nombre en `localStorage`, se precarga en el input si ya existe uno guardado.
- Botón "Jugar" habilita inicio del juego solo si el nombre es válido.
- Nombre se muestra en el HUD dentro del canvas (junto a score/vidas) durante toda la partida.

### No incluido (out of scope)
- Highscore o tabla de puntajes ligada al nombre.
- Múltiples jugadores / perfiles.
- Edición del nombre una vez arrancada la partida (hay que refrescar/reiniciar para cambiarlo).
- Backend o autenticación real — solo `localStorage`.

## Modelo de datos
No hay estructuras de juego nuevas. Solo:

- **localStorage key:** `arkanoid_player_name` → string (nombre validado, máx 15 chars, trim).
- **Variable en memoria:** `playerName` (string) — se lee de localStorage al cargar, se actualiza al confirmar el input.

## Plan de implementación

1. **HTML** (`index.html`): agregar overlay `nameOverlay` con input (`maxlength="15"`), mensaje de error oculto, botón "Jugar". Visible por defecto al cargar; canvas queda debajo pero juego no arranca todavía (status inicial `naming` en vez de `ready`).
2. **game.js — estado y carga:** nuevo `gameState.status = 'naming'` inicial. Leer `localStorage.getItem('arkanoid_player_name')` al cargar y precargar el input si existe.
3. **game.js — validación y submit:** listener en botón "Jugar" (y Enter): `trim()`, bloquea si vacío (muestra mensaje error), si válido guarda en `playerName`, persiste en `localStorage`, oculta `nameOverlay`, pasa `gameState.status = 'ready'`.
4. **game.js — HUD:** en la función de dibujo del HUD existente (score/vidas), agregar `ctx.fillText(playerName, ...)` en posición libre del canvas.
5. **game.js — resetGame():** no tocar `playerName` (persiste entre partidas de la misma sesión); no vuelve a pedir nombre al reiniciar con "restartButton".

## Criterios de aceptación
- [ ] Al abrir el juego por primera vez (sin nombre guardado), aparece overlay pidiendo nombre antes de poder jugar.
- [ ] Input tiene límite de 15 caracteres (no se puede escribir más).
- [ ] Click en "Jugar" (o Enter) con input vacío o solo espacios muestra error y no arranca el juego.
- [ ] Click en "Jugar" con nombre válido oculta el overlay, arranca el juego en estado `ready` (como antes).
- [ ] Nombre ingresado queda guardado en `localStorage` bajo `arkanoid_player_name`.
- [ ] Al recargar la página, el input aparece precargado con el último nombre guardado.
- [ ] Durante la partida, el nombre se ve dentro del canvas (HUD), visible junto a score/vidas.
- [ ] Al usar "restartButton" (reinicio de partida existente), no vuelve a pedir nombre — sigue mostrando el mismo.

## Decisiones tomadas y descartadas
- **localStorage vs. solo memoria:** se eligió localStorage para recordar nombre entre sesiones, evita pedirlo cada vez. Descartado "solo memoria" por peor UX sin costo real de implementación.
- **Sin highscore:** se descartó ligar nombre a tabla de puntajes — se deja fuera de alcance para spec futura, evita mezclar dos features en una.
- **Overlay reutilizando patrón existente** (`overlay`/`.visible` ya usado por game-over): se prefirió sobre modal nuevo con librería, consistente con el resto del juego (vanilla, sin dependencias).
- **Validación solo cliente (trim + maxlength), sin sanitización extra:** no hay persistencia en servidor ni riesgo de inyección real (solo se hace `fillText` en canvas, no `innerHTML`), así que no hace falta escapar HTML.
- **No se permite editar nombre in-game:** simplifica el estado; requiere refrescar. Se descartó botón "cambiar nombre" para mantener MVP acotado.
