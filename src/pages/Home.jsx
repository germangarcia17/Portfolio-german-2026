import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { profile } from '../data/profile.js';
import { areas, otherSkills } from '../data/areas.js';
import { projects } from '../data/projects/index.js';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import Blocks from '../components/Blocks.jsx';
import ContactLinks from '../components/ContactLinks.jsx';
import { CaseStudyCard, ExpandCard } from '../components/ProjectCard.jsx';
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
          <p className="hero__pitch">{t(profile.pitch)}</p>
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
      <div className="container">
        <ul className="highlights">
          {profile.highlights.map((h, i) => (
            <Reveal as="li" key={i} delay={i * 80} className="highlight">
              <span className="highlight__value">{h.value}</span>
              <span className="highlight__label">{t(h.label)}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AreaPicker({ current, onPick }) {
  const { t } = useLang();
  return (
    <section className="picker" aria-labelledby="picker-title">
      <div className="container">
        <Reveal>
          <h2 id="picker-title" className="picker__question">{t(ui.question)}</h2>
          <p className="picker__hint">{t(ui.questionHint)}</p>
        </Reveal>
        <div className="picker__grid">
          {areas.map((area, i) => (
            <Reveal key={area.id} delay={i * 60} className={`picker__cell ${area.featured ? 'picker__cell--featured' : ''}`}>
              <button
                type="button"
                className={`area-card ${current === area.id ? 'is-active' : ''}`}
                aria-pressed={current === area.id}
                aria-controls="area-panel"
                onClick={() => onPick(area.id)}
              >
                <span className="area-card__icon"><Icon name={area.icon} size={area.featured ? 30 : 24} /></span>
                <span className="area-card__label">
                  {t(area.label)}
                  {area.featured && <span className="pill pill--accent">{t(ui.mainFocus)}</span>}
                </span>
                <span className="area-card__teaser">{t(area.teaser)}</span>
                <Icon name="arrowRight" size={20} className="area-card__arrow" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AreaPanel({ area, openProject }) {
  const { t } = useLang();
  const list = area.projects.map((slug) => projects[slug]);
  const pages = list.filter((p) => p.kind === 'page');
  const small = list.filter((p) => p.kind === 'expand');

  return (
    <section id="area-panel" className="area-panel" aria-live="polite">
      <div className="container">
        <div key={area.id} className="area-panel__content">
          <p className="eyebrow">{t(ui.projectsIn)}</p>
          <h2 className="area-panel__title">{t(area.label)}</h2>
          <div className="area-panel__intro">
            <Blocks blocks={area.intro} />
          </div>
          <div className="case-grid">
            {pages.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 80}>
                <CaseStudyCard project={project} currentArea={area.id} />
              </Reveal>
            ))}
          </div>
          {small.length > 0 && (
            <div className="expand-grid">
              {small.map((project, i) => (
                <Reveal key={project.slug} delay={(i % 2) * 80}>
                  <ExpandCard project={project} currentArea={area.id} initiallyOpen={openProject === project.slug} />
                </Reveal>
              ))}
            </div>
          )}
          {area.outro && (
            <div className="area-panel__outro">
              <Blocks blocks={area.outro} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function OtherSkills() {
  const { t } = useLang();
  return (
    <section className="skills" aria-labelledby="skills-title">
      <div className="container">
        <Reveal><h2 id="skills-title" className="section-title">{t(ui.otherSkills)}</h2></Reveal>
        <ul className="skills__grid">
          {otherSkills.map((skill, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 70} className="skill">
              <span className="skill__icon"><Icon name={skill.icon} size={22} /></span>
              <div>
                <h3 className="skill__title">{t(skill.title)}</h3>
                <p className="skill__text">{t(skill.text)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('area');
  const current = areas.some((a) => a.id === requested) ? requested : 'ecommerce';
  const area = areas.find((a) => a.id === current);
  const openProject = params.get('project');
  useDocumentTitle(null);

  // Deep links such as /?area=seo jump straight to that area's projects.
  useEffect(() => {
    if (requested && !openProject) {
      requestAnimationFrame(() => document.getElementById('area-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
    // Only on first load: later changes scroll from onPick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPick = (id) => {
    setParams({ area: id }, { replace: true, preventScrollReset: true });
    requestAnimationFrame(() => document.getElementById('area-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <>
      <Hero />
      <AreaPicker current={current} onPick={onPick} />
      <AreaPanel area={area} openProject={openProject} />
      <OtherSkills />
    </>
  );
}
