const canvas = document.querySelector('.game_canvas');
let resolution = 32;
let sketch = createSketch(resolution);

function createSketch(unit) {
  const size = unit ** 2;
  const width = 800;
  const pixels = width / unit + 'px';

  for (let i = 0; i < size; i++) {
    const divUnit = document.createElement('div');

    divUnit.className = 'canvas_unit';
    divUnit.style.height = pixels;
    divUnit.style.width = pixels;

    canvas.appendChild(divUnit);
  }
}