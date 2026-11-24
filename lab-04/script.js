const first = document.getElementById(document.body.dataset.first);
const second = document.querySelector(document.body.dataset.second);

for (const element of [first, second]) {
  element.tabIndex = 0;
  element.addEventListener('click', () => element.classList.toggle('active'));
  element.addEventListener('keydown', event => {
    if (event.target === element && ['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      element.click();
    }
  });
}

const figure = document.getElementById('city-photo');
const parent = figure.parentElement;
const controls = document.querySelector('.controls');
let width = 544;

function sync() {
  figure.style.width = 'min(100%, ' + width + 'px)';
  controls.querySelector('[data-action="add"]').disabled = figure.isConnected;
  controls.querySelector('[data-action="remove"]').disabled = !figure.isConnected;
  controls.querySelector('[data-action="increase"]').disabled = !figure.isConnected || width >= 800;
  controls.querySelector('[data-action="decrease"]').disabled = !figure.isConnected || width <= 180;
}

controls.addEventListener('click', event => {
  const action = event.target.dataset.action;
  if (action === 'add') parent.insertBefore(figure, controls);
  if (action === 'remove') figure.remove();
  if (action === 'increase') width = Math.min(800, width + 80);
  if (action === 'decrease') width = Math.max(180, width - 80);
  sync();
});
sync();
