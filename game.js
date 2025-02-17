function resizeCanvasToDisplaySize(canvas) {
  const displayWidth = canvas.clientWidth;   // CSS-computed width (e.g., calc(100% - 40px))
  const displayHeight = canvas.clientHeight; // CSS-computed height
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}


class Position {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  // Custom method to generate a unique key for the position
  getKey() {
    return `${this.x},${this.y}`;
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
      ctx.fillStyle = "white";
      ctx.fillRect(col*size.width,row*size.height, size.width,size.height);
      ctx.fillStyle = "black";
      ctx.strokeRect(col*size.width,row*size.height, size.width,size.height);
    }
  }

  // Looping through active cells
  for(const [key,pos] of active) {
    const realX = pos.x - topLeft.x;
    const realY = pos.y - topLeft.y;

    if(realX >= 0 && realX < cols && realY >= 0 && realY < rows) {
      ctx.fillRect(realX*size.width, realY*size.height, size.width, size.height);
    } 
  }


}

function triggerCell(pos) {
  if(active.has(pos.getKey())) {
    active.delete(pos.getKey());
  }
  else {
    active.set(pos.getKey(), pos);
  }
}

//-----------------------------event listeners--------------------------

//----------------------------------------------------------------------
const canvas = document.getElementById("gameCanvas");
const top_left_output = document.getElementById("coords-output");
const ctx = canvas.getContext("2d");
const rows = 40;
const cols = 40;
top_left = new Position(0,0);

window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(canvas);
  drawGrid(top_left, canvas, rows, cols, active);
});

canvas.addEventListener("click", (event) => {
  console.log("Canvas clicked", event);
  
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const size = getCellSize(canvas, rows, cols);
  const realX = Math.floor(x / size.width);
  const realY = Math.floor(y / size.height);

  triggerCell(new Position(realX,realY));
  drawGrid(top_left, canvas, rows, cols, active);
});

const active = new Map();
resizeCanvasToDisplaySize(canvas);
drawGrid(top_left, canvas, rows, cols, active);
top_left_output.textContent = top_left.x + "," + top_left.y;
