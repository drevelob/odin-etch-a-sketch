const canvas = document.querySelector('.game_canvas');
const gridBtn = document.querySelector('.tool_grid');
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
    divUnit.addEventListener('mouseover', drawSketch)

    canvas.appendChild(divUnit);
  }
}

function drawSketch() {
  this.className = 'draw'
}

gridBtn.addEventListener('click', displayModal);

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
      resolution = gridModal.returnValue
      createSketch(resolution);
    }

    inputModal.value = '';
    confirmBtn.value = '';
    gridModal.returnValue = '';
  });
}