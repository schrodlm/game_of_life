
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvasToWindow(canvas) {
  // Match canvas internal size to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawGrid() {

  const rows = 40;
  const cols = 40;
  const cellSize = 10;
  
  const gridWidth = cols * cellSize;
  const gridHeight = rows * cellSize;

  const offsetX = (canvas.width - gridWidth) / 2;
  const offsetY = (canvas.height - gridHeight) / 2;

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      ctx.strokeRect(offsetX + col*10, offsetY + row*10, 10,10);
    }
  }
}

function onWindowResize() {
  resizeCanvasToWindow(canvas);
  drawGrid();
}

window.addEventListener('resize', onWindowResize);

resizeCanvasToWindow(canvas);
drawGrid();
