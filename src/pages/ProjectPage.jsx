import { Link, useParams } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { areas } from '../data/areas.js';
import { caseStudies, projectPath, projects } from '../data/projects/index.js';
import { SUPPLYFORGE_URL } from '../data/projects/supplyforge.js';
import Blocks from '../components/Blocks.jsx';
import TagList from '../components/TagList.jsx';
import Icon from '../components/Icon.jsx';
import Reveal from '../components/Reveal.jsx';
import useDocumentTitle from '../useDocumentTitle.js';
import NotFound from './NotFound.jsx';

export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = useLang();
  const project = projects[slug];
  useDocumentTitle(project ? t(project.title) : null);

  if (!project || project.kind !== 'page') return <NotFound />;

  const index = caseStudies.findIndex((p) => p.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const primaryArea = project.areas[0];
  const projectAreas = areas.filter((a) => project.areas.includes(a.id));

  return (
    <article className="project">
      <header className="project__hero">
        <div className="container container--narrow">
          <Link to={`/?area=${primaryArea}`} className="back-link">
            <Icon name="arrowLeft" size={18} /> {t(ui.backToProjects)}
          </Link>
          <p className="project__eyebrow">
            <span className="pill pill--accent">{t(ui.caseStudy)}</span>
            <span>{t(project.org)}</span>
          </p>
          <h1 className="project__title">{t(project.title)}</h1>
          <p className="project__lead">{t(project.summary)}</p>
          <TagList tags={project.tags} />
          <p className="project__areas">
            {projectAreas.map((a) => (
              <Link key={a.id} to={`/?area=${a.id}`} className="area-chip">
                <Icon name={a.icon} size={16} /> {t(a.label)}
              </Link>
            ))}
          </p>
          {slug === 'supplyforge' && SUPPLYFORGE_URL && (
            <p>
              <a className="btn btn--outline" href={SUPPLYFORGE_URL} target="_blank" rel="noopener noreferrer">
                {t(ui.visitSite)} <Icon name="external" size={18} />
              </a>
            </p>
          )}
        </div>
      </header>
      <div className="container container--narrow project__body">
        <Blocks blocks={project.body} reveal />
      </div>
      <Reveal className="container container--narrow">
        <Link to={projectPath(next.slug)} className="next-card">
          <span className="next-card__label">{t(ui.nextProject)}</span>
          <span className="next-card__title">{t(next.title)}</span>
          <Icon name="arrowRight" size={24} className="next-card__arrow" />
        </Link>
      </Reveal>
    </article>
  );
}
