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

class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

function getCellSize(canvas, rows, cols) {

  const cellWidth = canvas.width / cols;
  console.log(canvas.width, cols);
  const cellHeight = canvas.height / rows;

  return new Size(cellWidth, cellHeight);
}

function drawGrid(topLeft, canvas, rows, cols, active) {
  
  const size = getCellSize(canvas, rows, cols);

  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {
      ctx.strokeRect(col*size.width,row*size.height, size.width,size.height);
    }
  }

  // Looping through active cells
  for(const pos of active) {
    const realX = pos.x - topLeft.x;
    const realY = pos.y - topLeft.y;

    if(realX >= 0 && realX < cols && realY >= 0 && realY < rows) {
      ctx.fillRect(realX*size.width, realY*size.height, size.width, size.height);
    } 
  }


}

function onWindowResize(canvas) {
  resizeCanvasToWindow(canvas);
  drawGrid();
}

function triggerCell(pos) {
  if(active.has(pos)) {
    active.delete(pos);
  }
  else {
    active.add(pos);
  }
}

//----------------------------------------------------------------------
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const rows = 40;
const cols = 40;

window.addEventListener('resize', onWindowResize);

canvas.addEventListener("click", (event) => {
  console.log("Canvas clicked", event);
  
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const size = getCellSize(canvas, rows, cols);
  const realX = Math.floor(x / size.width);
  const realY = Math.floor(y / size.height);

  triggerCell(new Position(realX,realY));
  drawGrid(new Position(0,0), canvas, rows, cols, active);
});

const active = new Set();
pos = new Position(3,4)
active.add(new Position(3,4));

resizeCanvasToWindow(canvas);
drawGrid(new Position(0,0), canvas, rows, cols, active);
