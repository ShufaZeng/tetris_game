const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(30, 30); // 每格30像素

const ROWS = 20;
const COLUMNS = 10;
const dropInterval = 1000; // 1秒下移

// I 型方塊
const I = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

// 當前方塊
let piece = I;
let position = { x: 3, y: 0 };

// 清空畫面
function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(piece, position);
}

// 畫出方塊
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

// 每秒更新
function update() {
  position.y++;
  draw();
}

// 鍵盤控制
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    position.x--;
  } else if (event.key === 'ArrowRight') {
    position.x++;
  } else if (event.key === 'ArrowDown') {
    position.y++;
  }
  draw();
});

// 自動下落
setInterval(update, dropInterval);

// 初始化畫面
draw();
