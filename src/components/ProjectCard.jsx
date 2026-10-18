import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { areas } from '../data/areas.js';
import { projectPath } from '../data/projects/index.js';
import Icon from './Icon.jsx';
import Blocks from './Blocks.jsx';
import TagList from './TagList.jsx';


function AlsoIn({ project, currentArea }) {
  const { t } = useLang();
  const others = areas.filter((a) => a.id !== currentArea && project.areas.includes(a.id));
  if (!others.length) return null;
  return (
    <p className="also-in">
      {t(ui.alsoIn)}: {others.map((a) => t(a.label)).join(' · ')}
    </p>
  );
}

// A case study with its own page: the whole card is a link.
export function CaseStudyCard({ project, currentArea }) {
  const { t } = useLang();
  return (
    <article className="pcard pcard--page">
      <div className="pcard__media">
        {project.cover ? (
          <img src={project.cover.src} width={project.cover.width} height={project.cover.height} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="pcard__metric" aria-hidden="true">
            <span className="pcard__metric-value">{project.metric?.value}</span>
            <span className="pcard__metric-label">{t(project.metric?.label)}</span>
          </div>
        )}
      </div>
      <div className="pcard__body">
        <p className="pcard__eyebrow">
          <span className="pill pill--accent">{t(ui.caseStudy)}</span>
          <span>{t(project.org)}</span>
        </p>
        <h3 className="pcard__title">
          <Link to={projectPath(project.slug)} className="pcard__link">{t(project.title)}</Link>
        </h3>
        <p className="pcard__summary">{t(project.summary)}</p>
        <TagList tags={project.tags} />
        <AlsoIn project={project} currentArea={currentArea} />
        <span className="pcard__cta" aria-hidden="true">
          {t(ui.viewCase)} <Icon name="arrowRight" size={18} />
        </span>
      </div>
    </article>
  );
}

// A smaller project: expands in place to reveal the details.
export function ExpandCard({ project, currentArea, initiallyOpen = false }) {
  const { t } = useLang();
  const [open, setOpen] = useState(initiallyOpen);
  const panelId = useId();
  const ref = useRef(null);

  useEffect(() => {
    if (initiallyOpen) {
      setOpen(true);
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [initiallyOpen]);

  return (
    <article ref={ref} id={`project-${project.slug}`} className={`pcard pcard--expand ${open ? 'is-open' : ''}`}>
      <div className="pcard__body">
        <p className="pcard__eyebrow">
          <span className="pill">{t(ui.quick)}</span>
          <span>{t(project.org)}</span>
        </p>
        <h3 className="pcard__title">{t(project.title)}</h3>
        <p className="pcard__summary">{t(project.summary)}</p>
        <TagList tags={project.tags} />
        <AlsoIn project={project} currentArea={currentArea} />
        <button type="button" className="pcard__toggle" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
          {t(open ? ui.showLess : ui.showMore)}
          <Icon name="chevron" size={18} className="pcard__chevron" />
        </button>
        <div className="pcard__panel" id={panelId} aria-hidden={!open}>
          <div className="pcard__panel-inner">
            <div className="pcard__details">
              <Blocks blocks={project.details} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
