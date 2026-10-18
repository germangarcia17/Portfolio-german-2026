import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { profile } from '../data/profile.js';
import { areas } from '../data/areas.js';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import ContactLinks from '../components/ContactLinks.jsx';
import useDocumentTitle from '../useDocumentTitle.js';

function Hero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__hello">{t(ui.hello)}</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__role">{t(profile.role)}</p>
          <p className="hero__intro">{t(profile.intro)}</p>
          <p className="hero__loc"><Icon name="pin" size={18} /> {t(profile.location)}</p>
          <ContactLinks />
        </div>
        <div className="hero__photo">
          <picture>
            <source type="image/webp" srcSet="/images/german-portrait-240.webp 240w, /images/german-portrait-480.webp 480w" sizes="(max-width: 720px) 180px, 300px" />
            <img src="/images/german-portrait-480.jpg" width="480" height="480" alt={profile.name} fetchpriority="high" />
          </picture>
        </div>
      </div>
    </section>
  );
}

// The Projects page: a short introduction, then the question and the fields.
// Each field has its own page with its projects.
export default function Home() {
  const { t } = useLang();
  useDocumentTitle(null);

  return (
    <>
      <Hero />
      <section className="picker" aria-labelledby="picker-title">
        <div className="container">
          <Reveal>
            <h2 id="picker-title" className="picker__question">{t(ui.question)}</h2>
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
    </>
  );
}
