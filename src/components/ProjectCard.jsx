import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { areas } from '../data/areas.js';
import { projectPath } from '../data/projects/index.js';
import Icon from './Icon.jsx';
import Blocks from './Blocks.jsx';

// Which fields the project belongs to (Ecommerce, Data Analytics…).
// Inside a <button> only phrasing content is allowed, hence the span variant.
export function AreaLabels({ project, inline = false }) {
  const { t } = useLang();
  const List = inline ? 'span' : 'ul';
  const Item = inline ? 'span' : 'li';
  return (
    <List className="area-labels">
      {areas
        .filter((a) => project.areas.includes(a.id))
        .map((a) => <Item key={a.id} className="area-label">{t(a.label)}</Item>)}
    </List>
  );
}

function Cover({ project }) {
  if (!project.cover) {
    return <span className="pcard__media pcard__media--empty" aria-hidden="true" />;
  }
  const { src, width, height, contain } = project.cover;
  return (
    <span className={`pcard__media ${contain ? 'pcard__media--contain' : ''}`}>
      <img src={src} width={width} height={height} alt="" loading="lazy" decoding="async" />
    </span>
  );
}

// A case study with its own page: the whole card is the link.
export function CaseStudyCard({ project, fromArea }) {
  const { t } = useLang();
  return (
    <Link to={projectPath(project.slug)} state={{ fromArea }} className="pcard pcard--page">
      <Cover project={project} />
      <div className="pcard__body">
        <p className="pcard__org">{t(project.org)}</p>
        <h3 className="pcard__title">{t(project.title)}</h3>
        <p className="pcard__summary">{t(project.summary)}</p>
        <AreaLabels project={project} />
      </div>
      <Icon name="arrowRight" size={22} className="pcard__arrow" />
    </Link>
  );
}

// A smaller project: no image; the card itself expands in place to reveal the details.
export function ExpandCard({ project, initiallyOpen = false }) {
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
      <button
        type="button"
        className="pcard__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="pcard__body">
          <span className="pcard__org">{t(project.org)}</span>
          <span className="pcard__title">{t(project.title)}</span>
          <span className="pcard__summary">{t(project.summary)}</span>
          <AreaLabels project={project} inline />
        </span>
        <Icon name="chevron" size={22} className="pcard__arrow pcard__chevron" />
      </button>
      <div className="pcard__panel" id={panelId} aria-hidden={!open}>
        <div className="pcard__panel-inner">
          <div className="pcard__details">
            <Blocks blocks={project.details} />
          </div>
        </div>
      </div>
    </article>
  );
}
