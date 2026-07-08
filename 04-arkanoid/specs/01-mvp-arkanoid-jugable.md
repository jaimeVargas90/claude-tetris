# 01 - MVP Arkanoid Jugable

**Estado:** Draft
**Dependencias:** Ninguna (primer spec del proyecto)
**Fecha:** 2026-07-08

## Objetivo
Construir un MVP jugable de Arkanoid de una sola pantalla (canvas 800x600) con paleta controlada por mouse y teclado, bola con física de rebote variable, un layout fijo de bloques (10x10), 3 vidas, puntaje básico y overlay de fin de juego (victoria o derrota).

## Alcance

### Incluido (in scope)
- Canvas único de 800x600 px, un solo nivel/pantalla.
- Paleta (`paddle`) controlada simultáneamente por mouse (posición X sigue el cursor) y teclado (flechas / A-D).
- Bola (`ball`) que arranca pegada a la paleta y se lanza con click.
- Física de rebote en la paleta: el ángulo de salida varía según el punto de impacto (golpe en el borde = ángulo más cerrado).
- Colisión bola-pared (laterales y superior) con rebote reflejado simple.
- Layout fijo de bloques: 10 columnas x 10 filas (100 bloques), usando los 7 colores de `SPRITES.blocks`.
- Colisión bola-bloque: al romper, +10 puntos y el bloque desaparece (opcional: reutilizar animación `EXPLOSION_FRAMES` ya definida en `spritesheet.js`).
- Sistema de vidas: 3 vidas. Perder la bola (cae debajo de la paleta) resta 1 vida y reposiciona la bola pegada a la paleta.
- HUD en esquina superior del canvas: vidas y puntaje, visibles durante el juego.
- Condición de fin de juego: 0 vidas (derrota) o 0 bloques restantes (victoria).
- Overlay único de fin de juego: mismo componente visual para victoria y derrota, mensaje distinto según el caso, botón "Reiniciar" que reinicia el estado del juego en JS (sin recargar la página).
- Sonido: reproducir `ball-bounce.mp3` en rebotes (paleta/pared) y `break-sound.mp3` al romper un bloque.
- Gráficos: usar `spritesheet-breakout.png` vía las utilidades ya existentes en `spritesheet.js` (`loadSpritesheet`, `drawSprite`, `drawFrame`) para paleta, bola y bloques.

### Fuera de alcance (not in scope)
- Múltiples niveles / progresión de niveles.
- Power-ups de cualquier tipo.
- Pantallas separadas de "Ganaste" / "Game Over" (se resuelve con un único overlay).
- Persistencia de puntaje (highscores, localStorage, etc.).
- Ajustes de dificultad, velocidad progresiva de la bola, o balas múltiples.
- Responsive / adaptación a otros tamaños de pantalla (fijo 800x600).

## Modelo de datos

Todo el estado vive en memoria (variables JS), sin persistencia entre sesiones.

### `gameState` (objeto global)
```js
gameState = {
  status: 'ready' | 'playing' | 'won' | 'lost', // 'ready' = bola pegada a paleta, esperando click
  score: 0,
  lives: 3,
}
```

### `paddle`
```js
paddle = {
  x: 0,        // posición izquierda, sigue mouse/teclado, clamp dentro de [0, 800 - width]
  y: 570,      // fija cerca del borde inferior
  width: 162,  // igual a SPRITES.paddle.sw
  height: 14,
  speed: 8,    // px por frame al mover con teclado
}
```

### `ball`
```js
ball = {
  x: 0, y: 0,       // posición (centro o esquina, a definir en implementación)
  radius: 8,        // basado en SPRITES.ball 16x16
  dx: 0, dy: 0,     // velocidad actual
  speed: 5,         // magnitud de velocidad constante
  attached: true,   // true = pegada a la paleta, sigue su x
}
```

### `blocks`
```js
blocks = [
  { row: 0, col: 0, color: 'red', x: 0, y: 0, width: 32, height: 16, alive: true },
  // ... 100 elementos (10x10), color asignado cíclicamente entre los 7 colores de SPRITES.blocks
]
```

### Constantes de layout
```js
CANVAS_WIDTH = 800
CANVAS_HEIGHT = 600
BLOCK_ROWS = 10
BLOCK_COLS = 10
BLOCK_WIDTH = 32
BLOCK_HEIGHT = 16
```

## Plan de implementación

1. **Estructura base.** Crear `index.html` (canvas 800x600) y `game.js`. Cargar `spritesheet.js` y `loadSpritesheet()`. Loop de render vacío (canvas negro) para confirmar que todo carga.
2. **Paleta.** Dibujar `paddle` con `drawSprite`. Mover con mouse (`mousemove` sobre canvas) y teclado (flechas/A-D), con clamp a los bordes del canvas.
3. **Bola pegada + lanzamiento.** Dibujar `ball` pegada a la paleta (`attached: true`, sigue x de paleta). Al hacer click, lanzar con `dx/dy` iniciales y `attached: false`.
4. **Física de movimiento y rebote en paredes/techo.** Mover bola cada frame, rebote reflejado en paredes laterales y techo. Bola cae debajo de la paleta → resta vida, reposiciona bola (`attached: true`) si quedan vidas.
5. **Rebote en paleta con ángulo variable.** Detectar colisión bola-paleta, calcular ángulo de salida según punto de impacto relativo al centro de la paleta.
6. **Bloques y colisión.** Generar array de 100 bloques (10x10) con colores cíclicos, dibujar con `drawSprite`. Detectar colisión bola-bloque: marcar `alive: false`, sumar 10 puntos, rebotar bola.
7. **HUD.** Dibujar vidas y puntaje en esquina superior del canvas cada frame.
8. **Condiciones de fin y overlay.** Detectar 0 vidas (derrota) o 0 bloques vivos (victoria). Mostrar overlay con mensaje correspondiente y botón "Reiniciar" que resetea `gameState`, `paddle`, `ball` y `blocks` sin recargar la página.
9. **Sonido.** Reproducir `ball-bounce.mp3` en rebotes (pared/paleta) y `break-sound.mp3` al romper bloque.
10. **Pulido visual opcional.** Integrar `EXPLOSION_FRAMES` al romper un bloque, si el tiempo lo permite.

## Criterios de aceptación

- [ ] Abrir `index.html` muestra un canvas de 800x600 px con la paleta, la bola pegada a ella y los 100 bloques (10x10) dibujados con el spritesheet.
- [ ] Mover el mouse sobre el canvas mueve la paleta horizontalmente, respetando los límites del canvas.
- [ ] Presionar flechas izquierda/derecha o A/D mueve la paleta, respetando los límites del canvas.
- [ ] Hacer click lanza la bola desde la posición de la paleta.
- [ ] La bola rebota en paredes laterales y techo con ángulo reflejado.
- [ ] La bola rebota en la paleta con ángulo distinto según el punto de impacto (no siempre el mismo ángulo).
- [ ] Al chocar con un bloque, el bloque desaparece, suena `break-sound.mp3` y el puntaje aumenta en 10.
- [ ] Al chocar con paleta o pared, suena `ball-bounce.mp3`.
- [ ] El HUD (esquina superior) muestra vidas y puntaje actualizados en tiempo real.
- [ ] Si la bola cae debajo de la paleta y quedan vidas, se resta 1 vida y la bola vuelve a quedar pegada a la paleta.
- [ ] Si la bola cae debajo de la paleta con 0 vidas restantes, aparece el overlay con mensaje de derrota.
- [ ] Si se rompen los 100 bloques, aparece el overlay con mensaje de victoria.
- [ ] El botón "Reiniciar" del overlay reinicia vidas, puntaje, bloques y posición de bola/paleta sin recargar la página, y el juego vuelve a ser jugable.

## Decisiones tomadas y descartadas

- **Un solo nivel/layout fijo (10x10)** en vez de sistema de niveles. Motivo: es un MVP, niveles múltiples agregan complejidad de progresión y transición de estado que no aporta al objetivo de "jugable primero".
- **Sin power-ups.** Motivo: decisión explícita del usuario para mantener el MVP acotado; queda como candidato a spec futuro.
- **Overlay único para victoria/derrota** (mismo componente, mensaje distinto) en vez de pantallas separadas. Motivo: menos código, mismo propósito (detener juego + reiniciar).
- **Control simultáneo mouse + teclado** para la paleta, en vez de elegir uno solo. Motivo: pedido explícito del usuario; ambos inputs escriben la misma variable `paddle.x`, sin conflicto real ya que el último input gana.
- **Ángulo de rebote variable según punto de impacto en la paleta** en vez de reflejo fijo. Motivo: recomendación aceptada por el usuario — se siente mejor jugado y no agrega complejidad significativa.
- **Sonido y sprites del asset existente** (`spritesheet-breakout.png`, `ball-bounce.mp3`, `break-sound.mp3`) en vez de gráficos/sonidos placeholder. Motivo: los assets ya están en el repo y `spritesheet.js` ya trae utilidades de dibujo listas para usar.
- **Puntaje básico fijo (10 pts/bloque)**, sin multiplicadores ni bonus por color. Motivo: decisión explícita del usuario para MVP.
- **Sin persistencia** (localStorage/highscores). Motivo: fuera de alcance del MVP, todo el estado vive en memoria y se pierde al recargar.

## Riesgos identificados

- **Autoplay de audio bloqueado por el navegador.** Los navegadores modernos bloquean audio antes de interacción del usuario. Mitigación: el primer sonido se dispara recién en el click de lanzamiento de la bola, que ya es una interacción explícita del usuario.
- **Túnel de colisión (tunneling) a alta velocidad.** Si `ball.speed` es muy alta relativa al tamaño de bloque/paleta, la bola puede "atravesar" objetos en un frame. Mitigación: mantener `speed` moderada (valor de referencia: 5px/frame) y, si aparece el problema, usar detección de colisión por segmento en vez de por punto.
- **Ángulo de rebote extremo en los bordes de la paleta.** Un ángulo demasiado horizontal puede dejar la bola "atrapada" rebotando sin subir. Mitigación: clamp del ángulo resultante a un rango razonable (ej. no más de ~75° respecto a la vertical).
