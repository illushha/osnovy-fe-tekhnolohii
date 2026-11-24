const fields = [
  ['ПІБ', 'Локотош І.М.', /^[А-ЯІЇЄҐ][а-яіїєґ’ʼ'-]+ [А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/u],
  ['Телефон', '(050)-123-45-67', /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/],
  ['ID-картка', 'АБ №123456', /^[А-ЯІЇЄҐ]{2} №\d{6}$/u],
  ['Дата народження', '24.08.2005', /^\d{2}\.\d{2}\.\d{4}$/],
  ['Електронна пошта', 'user@example.com', /^[\w.+-]+@[a-z0-9-]+\.com$/i],
];
const form = document.querySelector('form');
const status = document.querySelector('#form-status');
const fieldNumbers = [1, 4, 5, 7, 9];
const inputs = fields.map(([label, example, pattern], index) => {
  const id = fieldNumbers[index];
  const field = document.createElement('label');
  field.className = 'field';
  field.append(label);
  const input = document.createElement('input');
  input.id = 'field-' + id;
  input.name = 'field-' + id;
  input.required = true;
  input.placeholder = example;
  input.setAttribute('aria-describedby', 'hint-' + id);
  const hint = document.createElement('small');
  hint.id = 'hint-' + id;
  hint.textContent = 'Формат: ' + example;
  field.append(input, hint);
  form.querySelector('.fields').append(field);
  return {id, label, input, field, pattern};
});

function realDate(value) {
  const [day, month, year] = value.split('.').map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return year > 0 && date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const errors = inputs.filter(({id,input,field,pattern}) => {
    const value = input.value.trim();
    const valid = pattern.test(value) && (id !== 7 || realDate(value));
    field.classList.toggle('invalid', !valid);
    input.setAttribute('aria-invalid', String(!valid));
    return !valid;
  });
  if (errors.length) {
    status.textContent = 'Помилки в полях: ' + errors.map(field => field.label).join(', ') + '.';
    errors[0].input.focus();
    return;
  }

  const result = window.open('', 'lab05-result', 'popup,width=540,height=420');
  if (!result) {
    status.textContent = 'Дозвольте спливальні вікна й повторіть перевірку.';
    return;
  }
  result.opener = null;
  result.document.title = 'Результат перевірки';
  result.document.documentElement.lang = 'uk';
  const heading = result.document.createElement('h1');
  heading.textContent = 'Дані перевірено';
  const list = result.document.createElement('dl');
  for (const { label, input } of inputs) {
    const term = result.document.createElement('dt');
    term.textContent = label;
    const value = result.document.createElement('dd');
    value.textContent = input.value.trim();
    list.append(term,value);
  }
  result.document.body.replaceChildren(heading,list);
  status.textContent = 'Введені дані відкрито в окремому вікні.';
});

const palette = document.querySelector('#palette');
const body = document.querySelector('tbody');
const cells = Array.from({length: 6}, (_,row) => {
  const tr = body.insertRow();
  return Array.from({length: 6}, (_,column) => {
    const cell = tr.insertCell();
    cell.textContent = row * 6 + column + 1;
    return cell;
  });
});
const active = cells[0][3];
const tableStatus = document.querySelector('#table-status');
active.classList.add('target');
active.tabIndex = 0;

function paint(cell, color) {
  const channels = color.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  const luminance = channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  cell.style.backgroundColor = color;
  cell.style.color = luminance >= .179 ? '#000' : '#fff';
}
function paintPattern() {
  const color = palette.value;
  for (let row = 0; row < 6; row++) {
    paint(cells[row][5 - row], color);
  }
  tableStatus.textContent = 'Зафарбовано клітинки за правилом варіанта.';
}
active.addEventListener('mouseenter', () => {
  const value = Math.floor(Math.random() * 0x1000000);
  paint(active, '#' + value.toString(16).padStart(6,'0'));
});
active.addEventListener('click', event => {
  if (event.detail <= 1) {
    paint(active,palette.value);
    tableStatus.textContent = 'Колір клітинки змінено на вибраний у палітрі.';
  }
});
active.addEventListener('dblclick', paintPattern);
active.addEventListener('keydown', event => {
  if (event.key === 'Enter') active.click();
  if (event.key === ' ') {
    event.preventDefault();
    paintPattern();
  }
});
