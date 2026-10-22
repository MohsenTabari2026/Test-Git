const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let p1Y = 185, p2Y = 185;
let ballX = 350, ballY = 225, vx = 6, vy = 5;
let score1 = 0, score2 = 0;

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') p1Y -= 45;
  if (e.key === 'ArrowDown') p1Y += 45;
  p1Y = Math.max(0, Math.min(370, p1Y));
});



function draw() {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, 700, 450);

  ctx.strokeStyle = '#FF5E00';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, p1Y, 12, 80);

  ctx.strokeStyle = '#00FFAA';
  ctx.strokeRect(678, p2Y, 12, 80);

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(ballX, ballY, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FF5E00';
  ctx.font = '42px Arial';
  ctx.fillText(score1, 280, 60);
  ctx.fillText(score2, 400, 60);
}

function update() {
  ballX += vx;
  ballY += vy;

  if (ballY < 0 || ballY > 450) vy = -vy;

  if (ballX < 30 && ballY > p1Y && ballY < p1Y + 80) vx = -vx;
  if (ballX > 670 && ballY > p2Y && ballY < p2Y + 80) vx = -vx;

  // هوش مصنوعی بهتر
  if (ballY > p2Y + 30) p2Y += 5.5;
  else if (ballY < p2Y + 50) p2Y -= 5.5;
  p2Y = Math.max(0, Math.min(370, p2Y));

  if (ballX < 0) { score2++; resetBall(6); }
  if (ballX > 700) { score1++; resetBall(-6); }
}

function resetBall(newVx) {
  ballX = 350; ballY = 225; vx = newVx; vy = 5;
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();