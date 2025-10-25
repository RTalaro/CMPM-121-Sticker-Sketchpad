// al was here
import "./style.css";

document.body.innerHTML = `
  <h1>Sticker Sketchpad</h1>
`;

const canvas = document.createElement("canvas");
canvas.height = 256;
canvas.width = 256;
document.body.appendChild(canvas);

document.body.appendChild(document.createElement("div"));

const clear = document.createElement("button");
clear.textContent = "Clear";
document.body.appendChild(clear);

const undo = document.createElement("button");
undo.textContent = "Undo";
document.body.appendChild(undo);

const redo = document.createElement("button");
redo.textContent = "Redo";
document.body.appendChild(redo);

const area = canvas.getContext("2d")!;
const mouse = { active: false, x: 0, y: 0 };
const drawingChanged = new Event("drawing-changed");

const redoList: number[][][] = [];
const displayList: number[][][] = [];
let currStroke: number[][] = [];

canvas.addEventListener("drawing-changed", redraw);

canvas.addEventListener("mousedown", (e) => {
  mouse.active = true;
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  currStroke.splice(0, redoList.length);
  const point: number[] = [mouse.x, mouse.y];
  currStroke.push(point);
  displayList.push(currStroke);
  redoList.splice(0, redoList.length);
  canvas.dispatchEvent(drawingChanged);
});

canvas.addEventListener("mousemove", (e) => {
  if (mouse.active) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    const point: number[] = [mouse.x, mouse.y];
    currStroke.push(point);
    canvas.dispatchEvent(drawingChanged);
  }
});

canvas.addEventListener("mouseup", () => {
  mouse.active = false;
  currStroke = [];
  canvas.dispatchEvent(drawingChanged);
});

clear.addEventListener("click", () => {
  area.clearRect(0, 0, canvas.width, canvas.height);
  displayList.splice(0, displayList.length);
  currStroke.splice(0, currStroke.length);
  redoList.splice(0, redoList.length);
  canvas.dispatchEvent(drawingChanged);
});

undo.addEventListener("click", () => {
  if (displayList.length > 0) {
    redoList.push(displayList.pop()!);
    canvas.dispatchEvent(drawingChanged);
  }
});

redo.addEventListener("click", () => {
  if (redoList.length > 0) {
    displayList.push(redoList.pop()!);
    canvas.dispatchEvent(drawingChanged);
  }
});

function redraw() {
  console.log(displayList);
  area.clearRect(0, 0, canvas.width, canvas.height);
  for (const stroke of displayList) {
    if (stroke.length > 1) {
      area.beginPath();
      const [x, y] = stroke[0];
      area.moveTo(x, y);
      for (const [x, y] of stroke) {
        area.lineTo(x, y);
      }
      area.stroke();
    }
  }
}
