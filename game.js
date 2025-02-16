function resizeCanvasToWindow(canvas) {
  // Match canvas internal size to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


function drawGrid(canvas, rows, cols) {
  
  const cellWidth = canvas.width / cols;  
  const cellHeight = canvas.height / rows;

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      ctx.strokeRect(col*cellWidth,row*cellHeight, cellWidth,cellHeight);
    }
  }
}

function onWindowResize(canvas) {
  resizeCanvasToWindow(canvas);
  drawGrid();
}
//----------------------------------------------------------------------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const rows = 40;
const cols = 40;

window.addEventListener('resize', onWindowResize);

const active = new Map();
//active.set({1,2}, true);

resizeCanvasToWindow(canvas);
drawGrid(canvas, rows, cols);
