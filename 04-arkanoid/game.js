const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BLOCK_ROWS = 10;
const BLOCK_COLS = 10;
const BLOCK_WIDTH = 32;
const BLOCK_HEIGHT = 16;

const canvas = document.getElementById( 'gameCanvas' );
const ctx = canvas.getContext( '2d' );

const paddle = {
  x: ( CANVAS_WIDTH - 162 ) / 2,
  y: 570,
  width: 162,
  height: 14,
  speed: 8,
};

const keys = { left: false, right: false };

const ball = {
  x: 0,
  y: 0,
  radius: 8,
  dx: 0,
  dy: 0,
  speed: 5,
  attached: true,
};

const gameState = {
  status: 'ready',
  score: 0,
  lives: 3,
};

const BLOCK_COLORS = [ 'red', 'yellow', 'cyan', 'magenta', 'hotpink', 'green', 'gray' ];
const BLOCKS_START_X = ( CANVAS_WIDTH - BLOCK_COLS * BLOCK_WIDTH ) / 2;
const BLOCKS_START_Y = 50;

let blocks = [];
let explosions = [];

function createBlocks() {
  blocks = [];
  for ( let row = 0; row < BLOCK_ROWS; row++ ) {
    for ( let col = 0; col < BLOCK_COLS; col++ ) {
      blocks.push( {
        row,
        col,
        color: BLOCK_COLORS[ ( row * BLOCK_COLS + col ) % BLOCK_COLORS.length ],
        x: BLOCKS_START_X + col * BLOCK_WIDTH,
        y: BLOCKS_START_Y + row * BLOCK_HEIGHT,
        width: BLOCK_WIDTH,
        height: BLOCK_HEIGHT,
        alive: true,
      } );
    }
  }
}

createBlocks();

canvas.addEventListener( 'mousemove', ( e ) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  paddle.x = mouseX - paddle.width / 2;
  clampPaddle();
} );

window.addEventListener( 'keydown', ( e ) => {
  if ( e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' ) keys.left = true;
  if ( e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' ) keys.right = true;
} );

window.addEventListener( 'keyup', ( e ) => {
  if ( e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' ) keys.left = false;
  if ( e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' ) keys.right = false;
} );

const bounceSound = new Audio( 'assets/assets/sounds/ball-bounce.mp3' );
const breakSound = new Audio( 'assets/assets/sounds/break-sound.mp3' );

function playSound( audio ) {
  audio.currentTime = 0;
  audio.play();
}

const overlay = document.getElementById( 'overlay' );
const overlayMessage = document.getElementById( 'overlayMessage' );
const restartButton = document.getElementById( 'restartButton' );

restartButton.addEventListener( 'click', resetGame );

function resetGame() {
  gameState.status = 'ready';
  gameState.score = 0;
  gameState.lives = 3;
  paddle.x = ( CANVAS_WIDTH - paddle.width ) / 2;
  ball.attached = true;
  ball.dx = 0;
  ball.dy = 0;
  createBlocks();
  explosions = [];
  overlay.classList.remove( 'visible' );
}

canvas.addEventListener( 'click', () => {
  if ( gameState.status !== 'ready' ) return;
  gameState.status = 'playing';
  ball.attached = false;
  const angle = ( Math.random() * 60 + 60 ) * Math.PI / 180; // 60-120° respecto a horizontal
  ball.dx = ball.speed * Math.cos( angle );
  ball.dy = -ball.speed * Math.sin( angle );
} );

function clampPaddle() {
  if ( paddle.x < 0 ) paddle.x = 0;
  if ( paddle.x > CANVAS_WIDTH - paddle.width ) paddle.x = CANVAS_WIDTH - paddle.width;
}

function updatePaddle() {
  if ( keys.left ) paddle.x -= paddle.speed;
  if ( keys.right ) paddle.x += paddle.speed;
  clampPaddle();
}

function drawPaddle() {
  drawSprite( ctx, 'paddle', paddle.x, paddle.y, paddle.width, paddle.height );
}

function updateBall() {
  if ( ball.attached ) {
    ball.x = paddle.x + paddle.width / 2;
    ball.y = paddle.y - ball.radius;
    return;
  }
  ball.x += ball.dx;
  ball.y += ball.dy;

  if ( ball.x - ball.radius < 0 ) {
    ball.x = ball.radius;
    ball.dx = -ball.dx;
    playSound( bounceSound );
  } else if ( ball.x + ball.radius > CANVAS_WIDTH ) {
    ball.x = CANVAS_WIDTH - ball.radius;
    ball.dx = -ball.dx;
    playSound( bounceSound );
  }

  if ( ball.y - ball.radius < 0 ) {
    ball.y = ball.radius;
    ball.dy = -ball.dy;
    playSound( bounceSound );
  }

  if ( ball.y - ball.radius > CANVAS_HEIGHT ) {
    loseLife();
    return;
  }

  checkPaddleCollision();
  checkBlockCollision();
}

function checkBlockCollision() {
  for ( const block of blocks ) {
    if ( !block.alive ) continue;
    const withinX = ball.x + ball.radius > block.x && ball.x - ball.radius < block.x + block.width;
    const withinY = ball.y + ball.radius > block.y && ball.y - ball.radius < block.y + block.height;
    if ( !withinX || !withinY ) continue;

    block.alive = false;
    gameState.score += 10;
    ball.dy = -ball.dy;
    playSound( breakSound );
    explosions.push( { x: block.x, y: block.y, color: block.color, startTime: performance.now() } );
    break;
  }

  if ( blocks.every( ( b ) => !b.alive ) ) {
    gameState.status = 'won';
  }
}

function drawBlocks() {
  for ( const block of blocks ) {
    if ( !block.alive ) continue;
    drawSprite( ctx, 'block_' + block.color, block.x, block.y, block.width, block.height );
  }
}

function checkPaddleCollision() {
  if ( ball.dy <= 0 ) return; // solo rebota si baja
  const withinX = ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width;
  const withinY = ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height;
  if ( !withinX || !withinY ) return;

  const paddleCenter = paddle.x + paddle.width / 2;
  const offset = ( ball.x - paddleCenter ) / ( paddle.width / 2 ); // -1..1
  const clampedOffset = Math.max( -1, Math.min( 1, offset ) );

  const maxAngle = 75 * Math.PI / 180; // respecto a la vertical
  const angle = clampedOffset * maxAngle;

  ball.dx = ball.speed * Math.sin( angle );
  ball.dy = -ball.speed * Math.cos( angle );
  ball.y = paddle.y - ball.radius;
  playSound( bounceSound );
}

function loseLife() {
  gameState.lives -= 1;
  if ( gameState.lives <= 0 ) {
    gameState.status = 'lost';
    return;
  }
  gameState.status = 'ready';
  ball.attached = true;
  ball.dx = 0;
  ball.dy = 0;
}

function drawBall() {
  drawSprite( ctx, 'ball', ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2 );
}

function updateExplosions() {
  const now = performance.now();
  explosions = explosions.filter( ( ex ) => now - ex.startTime < EXPLOSION_DURATION );
}

function drawExplosions() {
  const now = performance.now();
  for ( const ex of explosions ) {
    const frames = EXPLOSION_FRAMES[ ex.color ];
    const elapsed = now - ex.startTime;
    const frameIndex = Math.min( frames.length - 1, Math.floor( ( elapsed / EXPLOSION_DURATION ) * frames.length ) );
    drawFrame( ctx, frames[ frameIndex ], ex.x, ex.y, BLOCK_WIDTH, BLOCK_HEIGHT );
  }
}

function drawHUD() {
  ctx.fillStyle = '#fff';
  ctx.font = '16px monospace';
  ctx.textBaseline = 'top';
  ctx.fillText( `Vidas: ${gameState.lives}`, 10, 10 );
  ctx.fillText( `Puntaje: ${gameState.score}`, 10, 30 );
}

function updateOverlay() {
  if ( gameState.status === 'won' ) {
    overlayMessage.textContent = '¡Ganaste!';
    overlay.classList.add( 'visible' );
  } else if ( gameState.status === 'lost' ) {
    overlayMessage.textContent = 'Perdiste';
    overlay.classList.add( 'visible' );
  } else {
    overlay.classList.remove( 'visible' );
  }
}

function render() {
  if ( gameState.status === 'playing' || gameState.status === 'ready' ) {
    updatePaddle();
    updateBall();
  }
  updateExplosions();
  ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
  drawPaddle();
  drawBall();
  drawBlocks();
  drawExplosions();
  drawHUD();
  updateOverlay();
  requestAnimationFrame( render );
}

loadSpritesheet( () => {
  requestAnimationFrame( render );
} );
