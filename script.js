/*--- 畫布設定 ------------------------------------------------------------*/
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(30, 30); // 每格 30×30px

/*--- DOM 元素 -----------------------------------------------------------*/
const scoreDisplay   = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');
const startButton     = document.getElementById('startButton');

/*--- 遊戲基礎資料 -------------------------------------------------------*/
const ROWS = 20;
const COLUMNS = 10;
let score = 0;
let animationId = null;
let gameRunning = false;

const arena = createMatrix(COLUMNS, ROWS);

const colors = [
  null,            // 0 代表空格
  'cyan',          // 1: I
  'blue',          // 2: J
  'orange',        // 3: L
  'yellow',        // 4: O
  'green',         // 5: S
  'purple',        // 6: T
  'red'            // 7: Z
];

/*--- 工具函式 -----------------------------------------------------------*/
function createMatrix(w, h) {
  const matrix = [];
  while (h--) matrix.push(new Array(w).fill(0));
  return matrix;
}

function createPiece(type) {
  switch (type) {
    case 'I': return [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]];
    case 'J': return [[0,1,0],[0,1,0],[1,1,0]];
    case 'L': return [[0,1,0],[0,1,0],[0,1,1]];
    case 'O': return [[2,2],[2,2]];
    case 'S': return [[0,3,3],[3,3,0],[0,0,0]];
    case 'T': return [[0,4,0],[4,4,4],[0,0,0]];
    case 'Z': return [[5,5,0],[0,5,5],[0,0,0]];
  }
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (
        m[y][x] !== 0 &&
