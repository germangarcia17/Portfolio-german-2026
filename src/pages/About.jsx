import { useLang } from '../i18n.jsx';
import { about } from '../data/about.js';
import { profile } from '../data/profile.js';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import useDocumentTitle from '../useDocumentTitle.js';

export default function About() {
  const { t } = useLang();
  useDocumentTitle(t(about.title));

  return (
    <div className="about">
      <header className="page-hero">
        <div className="container page-hero__inner">
          <img className="page-hero__avatar" src="/images/german-portrait-240.webp" width="240" height="240" alt="" />
          <div>
            <h1 className="page-title">{t(about.title)}</h1>
            <p className="page-lead">{t(about.lead)}</p>
          </div>
        </div>
      </header>

      <section className="container about__section">
        <Reveal>
          <h2 className="section-title">{t(about.story.title)}</h2>
          <div className="prose">
            {about.story.paragraphs.map((para, i) => <Rich key={i} as="p" text={para} />)}
          </div>
          <ul className="tool-list" aria-label="Tools">
            {about.story.tools.map((tool) => <li key={tool} className="tag">{tool}</li>)}
          </ul>
        </Reveal>
      </section>

      <section className="container about__section">
        <Reveal><h2 className="section-title">{t(about.strengths.title)}</h2></Reveal>
        <div className="strengths">
          {about.strengths.items.map((item, i) => (
            <Reveal key={item.id} id={item.id} delay={(i % 2) * 90} className="strength">
              <span className="strength__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="strength__icon"><Icon name={item.icon} size={24} /></span>
              <h3 className="strength__title">{t(item.title)}</h3>
              <Rich as="p" text={item.text} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container about__section about__duo">
        <Reveal className="info-card">
          <span className="info-card__icon"><Icon name="rocket" size={24} /></span>
          <h2 className="info-card__title">{t(about.goals.title)}</h2>
          <p>{t(about.goals.text)}</p>
        </Reveal>
        <Reveal className="info-card" delay={90}>
          <span className="info-card__icon"><Icon name="search" size={24} /></span>
          <h2 className="info-card__title">{t(about.interests.title)}</h2>
          <p>{t(about.interests.text)}</p>
        </Reveal>
      </section>

      <section className="container about__section">
        <Reveal><h2 className="section-title">{t(about.hobbies.title)}</h2></Reveal>
        <ul className="hobbies">
          {about.hobbies.items.map((hobby, i) => (
            <Reveal as="li" key={i} delay={i * 50} className={`hobby ${hobby.note ? 'hobby--star' : ''}`}>
              <Icon name={hobby.icon} size={26} />
              <span>{t(hobby.label)}</span>
              {hobby.note && <span className="hobby__note">{t(hobby.note)}</span>}
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container about__section">
        <Reveal className="mountain">
          <img src="/images/german-mountain.webp" width="800" height="800" alt={t(about.photo.alt)} loading="lazy" decoding="async" />
          <p className="mountain__caption">{t(about.photo.caption)}</p>
          <p className="mountain__sign">— {profile.name.split(' ')[0]}</p>
        </Reveal>
      </section>
    </div>
  );
}
