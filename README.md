# Основи FE-технологій

Локотош Ілля Миколайович, ІО-41. Номер за загальним списком — 74.

## Опубліковані лабораторні

[Головна сторінка](https://illushha.github.io/osnovy-fe-tekhnolohii/)

| Робота | Код | Сторінка |
| --- | --- | --- |
| №1 Сторінка автора в HTML5 | [Код](lab-01/) | [Відкрити](https://illushha.github.io/osnovy-fe-tekhnolohii/lab-01/) |
| №2 Таблиці та CSS-трансформації | [Код](lab-02/) | [Відкрити](https://illushha.github.io/osnovy-fe-tekhnolohii/lab-02/) |
| №3 Верстка Float і Flex | [Код](lab-03/) | [Відкрити](https://illushha.github.io/osnovy-fe-tekhnolohii/lab-03/) |
| №4 Події та керування зображенням | [Код](lab-04/) | [Відкрити](https://illushha.github.io/osnovy-fe-tekhnolohii/lab-04/) |
| №5 Регулярні вирази та палітра | [Код](lab-05/) | [Відкрити](https://illushha.github.io/osnovy-fe-tekhnolohii/lab-05/) |
| №6 Запит до Random User API | [Код](lab-06/) | [Відкрити](https://illushha.github.io/osnovy-fe-tekhnolohii/lab-06/) |
| №7 Профіль і галерея в React | [Код](lab-07/) | [Відкрити](https://illushha.github.io/osnovy-fe-tekhnolohii/lab-07/) |
| №8 Адаптивна верстка за макетом | [Код](lab-08/) | [Відкрити](https://illushha.github.io/osnovy-fe-tekhnolohii/lab-08/) |

## Варіанти

Формула для таблиць і переліків: `(74 - 1) % кількість_варіантів + 1`.

| Робота | Варіант або правило |
| --- | --- |
| №1 | Єдине завдання |
| №2 | 4 для таблиці та CSS-фігури |
| №3 | 4 для обох способів верстки |
| №4 | Елементи 5 і 6 за формулою `(74 % 10) + 1` |
| №5 | 14 для форми (із 15) і 4 для таблиці (із 10) |
| №6 | 14 із 20 |
| №7 | Елементи 5 і 6 з №4, галерея з шести карток |
| №8 | 14 із 30 |

## Локальний запуск

Потрібні Node.js 22.12 або новіший і npm. У каталозі репозиторію:

```sh
npm ci
npm run dev
```

Відкрийте надруковану Vite адресу. З головної сторінки можна перейти до кожної лабораторної. Для №6 потрібен доступ до Random User API. Дійсні дані у №5 відкриваються в окремому вікні браузера.

```sh
npm run build
npm run preview
```

Дані профілю зберігаються в `shared/profile.json`. Після зміни даних виконайте `node scripts/make-profile.mjs`, щоб оновити HTML для №1 і №4. №7 читає JSON прямо під час збірки.

## Документація

- [Налаштування джерела GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Розгортання Vite на GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [Nu Html Checker](https://validator.github.io/validator/)
- [Random User API](https://randomuser.me/documentation#results)

## Зображення

- Варшава: [Igor123121, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Old_Town_Market_Square.,_2026,_Warsaw,_Poland.jpg), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Використано зменшену копію.
- Фото для галереї товарів і демонстраційного макета: [Unsplash License](https://unsplash.com/license). Джерела окремих файлів наведено в [PHOTO-SOURCES.md](PHOTO-SOURCES.md).
