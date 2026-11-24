import { readFileSync, writeFileSync } from 'node:fs';

const profile = JSON.parse(readFileSync(new URL('../shared/profile.json', import.meta.url)));
const {name,group,variant,birthDate,birthCity,school,university,hobbies,favorites,
  city,cityDescription,cityUrl,cityNote,books,photoAlt,photoCredit,photoSource,photoLicense} = profile;
const escape = text => String(text).replace(/[&<>"']/g, symbol =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[symbol]);

const labels = [
  'ПІБ', 'Дата та місце народження', 'Освіта', 'Захоплення',
  ...hobbies, 'Улюблені твори', ...favorites, cityDescription
];
const first = variant % 10 + 1;
const list = (items, tag, start) => '<' + tag + '>' + items.map((item, i) =>
  '<li id="item-' + (start+i) + '" data-order="' + (start+i) + '">' + escape(item) + '</li>').join('') +
  '</' + tag + '>';
const buttons = '<div class="controls">' + Object.entries({
  add:'Додати', increase:'Збільшити', decrease:'Зменшити', remove:'Видалити'
}).map(([action,label]) => '<button type="button" data-action="'+ action +'">'+ label + '</button>').join('') + '</div>';

for (const num of [1,4]) {
  const interactive = num === 4;
  const html = `<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="keywords" content="HTML5, Ілля Локотош, ІО-41, лабораторна робота">
  <meta name="description" content="Сторінка автора Іллі Локотоша для курсу Основи FE-технологій">
  <title>${escape(name)} (${group}) | ЛР №${num} | Варіант ${variant}</title>
  ${interactive ? '<link rel="stylesheet" href="./style.css"><script type="module" src="./script.js"></script>' : '<link rel="stylesheet" href="../shared/base.css"><link rel="stylesheet" href="../shared/profile.css">'}
</head>
<body${interactive ? ` data-first="item-${first}" data-second="#item-${first+1}"` : ''}>
<main>
  <nav><a href="../">Усі лабораторні</a></nav>
  <h1>Про автора</h1>
  <div class="panel profile-top">
    <h2 id="item-1" data-order="1">${escape(name)}</h2>
    <p id="item-2" data-order="2">Дата й місце народження — ${escape(birthDate)}, ${escape(birthCity)}.</p>
    <p id="item-3" data-order="3">Освіта — ${escape(school)}, ${escape(university)}.</p>
    <div class="interests">
      <div><h3 id="item-4" data-order="4">Захоплення</h3>${list(hobbies,'ul',5)}</div>
      <div><h3 id="item-8" data-order="8">Улюблені твори</h3>${list(favorites,'ol',9)}<p>Улюблені книги — ${escape(books.join(', '))}.</p></div>
    </div>
  </div>
  ${interactive ? `<p class="profile-note">Клацніть «${escape(labels[first-1])}» або «${escape(labels[first])}» для зміни кольорів.</p>` : ''}
  <section class="city panel">
    <h2>${escape(city)}</h2>
    <p id="item-12" data-order="12">${escape(cityDescription)}</p>
    ${cityNote ? '<p class="profile-note">' + escape(cityNote) + '</p>' : ''}
    <figure class="profile-photo" id="city-photo">
      <a href="${escape(cityUrl)}"><img src="../shared/city.jpg" alt="${escape(photoAlt)}"></a>
      <figcaption>Фото <a href="${escape(photoSource)}">${escape(photoCredit)}</a> · <a href="${escape(photoLicense)}">CC BY 4.0</a></figcaption>
    </figure>
    ${interactive ? buttons : ''}
  </section>
</main>
</body>
</html>
`;
  writeFileSync(new URL('../lab-0' + num + '/index.html', import.meta.url), html);
}
