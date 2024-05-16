const canvas = document.querySelector('.game_canvas');
const gridBtn = document.querySelector('.tool_grid');
const colors = document.querySelectorAll('.tool_pencil li');
const clearBtn = document.querySelector('.tool_clear');
let resolution = 32;
let pencilColor = 'pencil_black';

createSketch(resolution);
canvas.addEventListener('click', setDrawOnOff);
gridBtn.addEventListener('click', displayModal);
colors.forEach((col) => {
  col.addEventListener('click', setColor);
});
clearBtn.addEventListener('click', clearCanvas);

function createSketch(unit) {
  const size = unit ** 2;
  const width = 800;
  const pixels = width / unit + 'px';

  for (let i = 0; i < size; i++) {
    const divUnit = document.createElement('div');

    divUnit.className = 'canvas_unit';
    divUnit.style.height = pixels;
    divUnit.style.width = pixels;
    divUnit.addEventListener('click', drawSketch);
    canvas.value = false;
    canvas.appendChild(divUnit);
  }
}

function drawSketch() {
  const FILTER = [
    'saturate(1) brightness(1)',
    'saturate(1.15) brightness(0.85)',
    'saturate(1.3) brightness(0.7)',
    'saturate(1.5) brightness(0.5)'
  ];
  this.className = pencilColor;

  switch (this.style.filter) {
    case FILTER[0]:
      this.style.filter = FILTER[1];
      break;
    case FILTER[1]:
      this.style.filter = FILTER[2];
      break;
    case FILTER[2]:
      this.style.filter = FILTER[3];
      break;
    case FILTER[3]:
      break;
    default:
      this.style.filter = FILTER[0];
      break;
  }
}

function setDrawOnOff() {
  const divUnits = canvas.querySelectorAll('div');

  if (canvas.value) {
    divUnits.forEach((unit) => {
      unit.addEventListener('click', drawSketch);
      unit.removeEventListener('mouseover', drawSketch);
    });
    canvas.value = false;
  } else {
    divUnits.forEach((unit) => {
      unit.removeEventListener('click', drawSketch);
      unit.addEventListener('mouseover', drawSketch);
    });
    canvas.value = true;
  }
}

function displayModal() {
  const gridModal = document.querySelector('.grid_modal');
  const inputModal = document.querySelector('.modal_input');
  const confirmBtn = document.querySelector('.modal_confirm');
  const closeBtn = document.querySelector('.modal_close');

  gridModal.showModal();
  inputModal.placeholder = resolution;

  inputModal.addEventListener('change', () => {
    confirmBtn.value = inputModal.value;
  });

  closeBtn.addEventListener('click', () => {
    gridModal.close('');
  });

  gridModal.addEventListener('close', () => {
    if (gridModal.returnValue) {
      canvas.innerHTML = '';
      resolution = gridModal.returnValue;
      createSketch(resolution);
    }

    inputModal.value = '';
    confirmBtn.value = '';
    gridModal.returnValue = '';
  });
}

function setColor() {
  pencilColor = this.className;
}

function clearCanvas() {
  canvas.innerHTML = '';
  createSketch(resolution);
}