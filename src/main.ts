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
const cursor = { active: false, x: 0, y: 0 };

canvas.addEventListener("mousedown", (e) => {
  cursor.active = true;
  cursor.x = e.offsetX;
  cursor.y = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (cursor.active) {
    area.beginPath();
    area.moveTo(cursor.x, cursor.y);
    area.lineTo(e.offsetX, e.offsetY);
    area.stroke();
    cursor.x = e.offsetX;
    cursor.y = e.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  cursor.active = false;
});

clear.addEventListener("click", () => {
  area.clearRect(0, 0, canvas.width, canvas.height);
});
