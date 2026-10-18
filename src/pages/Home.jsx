import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { areas } from '../data/areas.js';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import useDocumentTitle from '../useDocumentTitle.js';

// The Projects page only asks the question and lists the fields;
// each field has its own page with its projects.
export default function Home() {
  const { t } = useLang();
  useDocumentTitle(null);

  return (
    <section className="picker" aria-labelledby="picker-title">
      <div className="container">
        <Reveal>
          <h1 id="picker-title" className="picker__question">{t(ui.question)}</h1>
        </Reveal>
        <ul className="picker__grid">
          {areas.map((area, i) => (
            <Reveal as="li" key={area.id} delay={i * 60}>
              <Link to={`/area/${area.id}`} className="area-card">
                <span className="area-card__label">
                  {t(area.label)}
                  {area.featured && <span className="pill pill--accent">{t(ui.mainFocus)}</span>}
                </span>
                <span className="area-card__teaser">{t(area.teaser)}</span>
                <Icon name="arrowRight" size={20} className="area-card__arrow" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
