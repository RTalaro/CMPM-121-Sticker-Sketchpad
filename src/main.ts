// al was here
import "./style.css";

document.body.innerHTML = `
  <h1>Sticker Sketchpad</h1>
  <button id="clear">Clear</button>
`;

const clear = document.getElementById("clear")!;
const canvas = document.createElement("canvas");
canvas.height = 256;
canvas.width = 256;
document.body.appendChild(canvas);

const area = canvas.getContext("2d")!;

let strokes: Array<Array<Array<number>>> = [];
let currStroke: Array<Array<number>> = [];
const mouse = { active: false, x: 0, y: 0 };

const drawingChanged = new Event("drawing-changed");
canvas.addEventListener("drawing-changed", redraw);

canvas.addEventListener("mousedown", (e) => {
  mouse.active = true;
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  currStroke = [];
  strokes.push(currStroke);
  const point: Array<number> = [mouse.x, mouse.y];
  currStroke.push(point);
  canvas.dispatchEvent(drawingChanged);
});

canvas.addEventListener("mousemove", (e) => {
  if (mouse.active) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    strokes.push(currStroke);
    const point: Array<number> = [mouse.x, mouse.y];
    currStroke.push(point);
    canvas.dispatchEvent(drawingChanged);
  }
});

canvas.addEventListener("mouseup", () => {
  mouse.active = false;
  strokes.push([]);
  canvas.dispatchEvent(drawingChanged);
});

clear.addEventListener("click", () => {
  area.clearRect(0, 0, canvas.width, canvas.height);
  strokes = [];
});

function redraw() {
  area.clearRect(0, 0, canvas.width, canvas.height);
  for (const stroke of strokes) {
    if (stroke.length > 1) {
      area.beginPath();
      const [x, y] = stroke[0];
      area.moveTo(x, y);
      for (const [x, y] of stroke) {
        area.lineTo(x, y);
      }
    }
    area.stroke();
  }
}
