import "./style.css";

document.body.innerHTML = `
  <h1>Sticker Sketchpad</h1> 
`;

const canvas = document.createElement("canvas");
canvas.height = 256;
canvas.width = 256;

document.body.appendChild(canvas);
