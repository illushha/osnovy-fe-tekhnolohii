import React, { Component, useState } from 'react';
import { createRoot } from 'react-dom/client';
import profile from '../shared/profile.json';
import cityPhoto from '../shared/city.jpg';
import '../shared/base.css';
import '../shared/profile.css';
import './style.css';

const goods = [
  ['Навушники', 2490, 'headphones'],
  ['Фотоапарат', 18990, 'camera'],
  ['Клавіатура', 1990, 'keyboard'],
  ['Годинник', 3490, 'watch'],
  ['Ноутбук', 29990, 'laptop'],
  ['Смартфон', 16990, 'phone']
];
const photographs = import.meta.glob('./goods/*.jpg', { eager: true, query: '?url', import: 'default' });
const currency = new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 });

function Header({ name, group, variant }) {
  return <header>
    <nav><a href="../">Усі лабораторні</a> · <a href="#gallery">Галерея</a></nav>
    <h1>Про автора</h1>
    <p className="kicker">{name} · {group} · Варіант {variant}</p>
  </header>;
}

function Image({ city, cityDescription, cityUrl, cityNote, photoAlt, photoSource, photoCredit, photoLicense, descriptionProps }) {
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(544);
  return <section className="city panel">
    <h2>{city}</h2>
    <p {...descriptionProps}>{cityDescription}</p>
    {cityNote && <p className="profile-note">{cityNote}</p>}
    {visible && <figure className="profile-photo" style={{width: 'min(100%, ' + width + 'px)'}}>
      <a href={cityUrl}><img src={cityPhoto} alt={photoAlt}/></a>
      <figcaption>Фото <a href={photoSource}>{photoCredit}</a> · <a href={photoLicense}>CC BY 4.0</a></figcaption>
    </figure>}
    <div className="controls">
      <button onClick={() => setVisible(true)} disabled={visible}>Додати</button>
      <button onClick={() => setWidth(value => Math.min(value + 80, 800))} disabled={!visible || width >= 800}>Збільшити</button>
      <button onClick={() => setWidth(value => Math.max(value - 80, 180))} disabled={!visible || width <= 180}>Зменшити</button>
      <button onClick={() => setVisible(false)} disabled={!visible}>Видалити</button>
    </div>
  </section>;
}

class Content extends Component {
  state = { active: {} };

  elementProps(order) {
    const first = this.props.profile.variant % 10 + 1;
    if (order !== first && order !== first + 1) return {'data-order': order};
    const toggle = () => this.setState(({active}) => ({active: {...active, [order]: !active[order]}}));
    return {
      'data-order': order, tabIndex: 0, className: this.state.active[order] ? 'active' : '',
      onClick: toggle,
      onKeyDown: event => {
        if (['Enter', ' '].includes(event.key)) {
          event.preventDefault();
          toggle();
        }
      }
    };
  }

  render() {
    const { profile } = this.props;
    const { name, birthDate, birthCity, school, university, hobbies, favorites, books, cityDescription, variant } = profile;
    const labels = ['ПІБ', 'Дата та місце народження', 'Освіта', 'Захоплення', ...hobbies, 'Улюблені твори', ...favorites, cityDescription];
    const first = variant % 10 + 1;
    return <>
      <div className="panel profile-top">
        <h2 {...this.elementProps(1)}>{name}</h2>
        <p {...this.elementProps(2)}>Дата й місце народження — {birthDate}, {birthCity}.</p>
        <p {...this.elementProps(3)}>Освіта — {school}, {university}.</p>
        <div className="interests">
          <div><h3 {...this.elementProps(4)}>Захоплення</h3><ul>{hobbies.map((item,i) =>
            <li key={i} {...this.elementProps(i+5)}>{item}</li>)}</ul></div>
          <div><h3 {...this.elementProps(8)}>Улюблені твори</h3><ol>{favorites.map((item,i) =>
            <li key={i} {...this.elementProps(i+9)}>{item}</li>)}</ol><p>Улюблені книги — {books.join(', ')}.</p></div>
        </div>
      </div>
      <p className="profile-note">Клацніть «{labels[first-1]}» або «{labels[first]}» для зміни кольорів.</p>
      <Image {...profile} descriptionProps={this.elementProps(12)}/>
    </>;
  }
}

function GoodsCard({ name, price, image }) {
  return <article className="goods-card">
    <img src={image} alt={name} loading="lazy"/>
    <div><h3>{name}</h3><p>{currency.format(price)}</p></div>
  </article>;
}

function App() {
  return <main>
    <Header {...profile}/>
    <Content profile={profile}/>
    <section id="gallery" className="panel">
      <h2>Галерея товарів</h2>
      <div className="goods-list">{goods.map(([name, price, file]) =>
        <GoodsCard key={file} name={name} price={price} image={photographs['./goods/' + file + '.jpg']}/>)}</div>
    </section>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
