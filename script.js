const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(30, 30); // 將每格設為 30x30 px

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

// I 型方塊
const piece = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

let position = { x: 3, y: 0 };

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawMatrix(piece, position);
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    position.x--;
  } else if (event.key === 'ArrowRight') {
    position.x++;
  } else if (event.key === 'ArrowDown') {
    position.y++;
  }
  update();
});

update();
