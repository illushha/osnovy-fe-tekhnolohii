import variants from '../shared/task-variants.json';

const sets = [
  [1,2,3,4,5], [1,3,4,5,6], [1,4,5,6,7], [1,2,4,6,8], [1,3,5,7,9],
  [1,2,4,5,6], [1,3,4,6,7], [1,2,5,6,8], [1,4,6,3,2], [1,3,4,7,9],
  [1,4,5,2,6], [1,5,7,8,9], [1,8,9,6,5], [1,6,4,2,7], [1,3,5,6,6],
  [1,7,2,8,4], [1,4,3,5,7], [1,5,6,8,2], [1,4,2,3,8], [1,6,9,7,4]
];
const fields = {
  2: ['Ім’я', user => user.name.first + ' ' + user.name.last],
  3: ['Мобільний телефон', user => user.cell],
  4: ['Місто', user => user.location.city],
  5: ['Країна', user => user.location.country],
  6: ['Поштовий індекс', user => user.location.postcode],
  7: ['Електронна пошта', user => user.email],
  8: ['Телефон', user => user.phone],
  9: ['Координати', user => user.location.coordinates.latitude + ', ' + user.location.coordinates.longitude]
};
const button = document.querySelector('button');
const output = document.querySelector('#result');
const status = document.querySelector('#status');
const fieldsForVariant = sets[variants.api - 1];

button.addEventListener('click', () => {
  button.disabled = true;
  output.replaceChildren();
  status.textContent = 'Завантаження…';
  fetch('https://randomuser.me/api/', {signal: AbortSignal.timeout(12000)})
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(data => {
      const user = data.results?.[0];
      if (!user) throw new Error('У відповіді відсутній профіль');
      const photo = document.createElement('img');
      photo.alt = 'Фото користувача';
      photo.width = 128;
      photo.height = 128;
      photo.src = user.picture.large;
      const list = document.createElement('dl');
      for (const key of fieldsForVariant.slice(1)) {
        const [label, getValue] = fields[key];
        const term = document.createElement('dt');
        term.textContent = label;
        const description = document.createElement('dd');
        description.textContent = getValue(user);
        list.append(term, description);
      }
      output.append(photo,list);
      status.textContent = 'Профіль завантажено.';
    })
    .catch(error => {
      status.textContent = 'Не вдалося завантажити профіль. Спробуйте ще раз.';
      console.warn('Random User:', error.message);
    })
    .finally(() => { button.disabled = false; });
});
