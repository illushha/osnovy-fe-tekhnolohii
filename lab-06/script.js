const button = document.querySelector('button');
const output = document.querySelector('#result');
const status = document.querySelector('#status');

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
      const fields = [
        ['Поштовий індекс', user.location.postcode],
        ['Місто', user.location.city],
        ['Ім’я', user.name.first + ' ' + user.name.last],
        ['Електронна пошта', user.email]
      ];
      for (const [label, value] of fields) {
        const term = document.createElement('dt');
        term.textContent = label;
        const description = document.createElement('dd');
        description.textContent = value;
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
