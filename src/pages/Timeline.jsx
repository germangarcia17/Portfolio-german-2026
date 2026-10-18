import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { timeline } from '../data/timeline.js';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import TagList from '../components/TagList.jsx';
import useDocumentTitle from '../useDocumentTitle.js';

const kindIcon = { work: 'briefcase', study: 'cap', project: 'rocket' };
const kindLabel = {
  work: { en: 'Work', es: 'Trabajo' },
  study: { en: 'Education', es: 'Formación' },
  project: { en: 'Project', es: 'Proyecto' },
};
export default function Timeline() {
  const { t } = useLang();
  useDocumentTitle(t(ui.nav.timeline));

  return (
    <div className="timeline-page">
      <header className="page-hero">
        <div className="container">
          <h1 className="page-title">{t(ui.nav.timeline)}</h1>
          <ul className="legend">
            {Object.keys(kindIcon).map((k) => (
              <li key={k} className={`legend__item legend__item--${k}`}>
                <Icon name={kindIcon[k]} size={16} /> {t(kindLabel[k])}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div className="container">
        <ol className="timeline">
          {timeline.map((item, i) => (
            <Reveal as="li" key={item.id} id={item.id} delay={(i % 3) * 60} className={`tl-item tl-item--${item.kind} ${item.ongoing ? 'is-ongoing' : ''}`}>
              <span className="tl-item__dot" aria-hidden="true"><Icon name={kindIcon[item.kind]} size={18} /></span>
              <div className="tl-item__card">
                <p className="tl-item__meta">
                  <span className="tl-item__date">{t(item.date)}</span>
                  {item.ongoing && <span className="pill pill--live">{t(ui.ongoing)}</span>}
                  <span className="visually-hidden">· {t(kindLabel[item.kind])}</span>
                </p>
                <h2 className="tl-item__title">{t(item.title)}</h2>
                <p className="tl-item__text">{t(item.text)}</p>
                <TagList tags={item.tags} />
                {item.link && (
                  <Link to={item.link.to} className="tl-item__link">
                    {t(item.link.label)} <Icon name="arrowRight" size={16} />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}
