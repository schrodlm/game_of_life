function resizeCanvasToWindow(canvas) {
  // Match canvas internal size to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Position {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

function drawGrid(topLeft, canvas, rows, cols, active) {
  
  const cellWidth = canvas.width / cols;  
  const cellHeight = canvas.height / rows;

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      ctx.strokeRect(col*cellWidth,row*cellHeight, cellWidth,cellHeight);
    }
  }

  // Looping through active cells
  for(const pos of active) {
    const realX = pos.x - topLeft.x;
    const realY = pos.y - topLeft.y;

    if(realX >= 0 && realX < cols && realY >= 0 && realY < rows) {
      ctx.fillRect(realX*cellWidth, realY*cellHeight, cellWidth, cellHeight);
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

const active = new Set();
pos = new Position(3,4)
active.add(new Position(3,4));

resizeCanvasToWindow(canvas);
drawGrid(new Position(0,0), canvas, rows, cols, active);
