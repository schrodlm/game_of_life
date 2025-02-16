
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
  let flag = false;
  for(let row = 0; row < rows; row++) {
      flag = !flag;
    for(let col = 0; col < cols; col++) {
      if(flag){
        ctx.fillStyle = "red";
      }
      else {
        ctx.fillStyle = "blue";
      }
      ctx.fillRect( col*10, row*10, 10,10);
      flag = !flag;
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
