import { Link, useLocation, useParams } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { areas } from '../data/areas.js';
import { projects } from '../data/projects/index.js';
import Blocks from '../components/Blocks.jsx';
import Icon from '../components/Icon.jsx';
import { AreaLabels } from '../components/ProjectCard.jsx';
import useDocumentTitle from '../useDocumentTitle.js';
import NotFound from './NotFound.jsx';

const toolsLabel = { en: 'Tools and technologies', es: 'Herramientas y tecnologías' };

export default function ProjectPage() {
  const { slug } = useParams();
  const { state } = useLocation();
  const { t } = useLang();
  const project = projects[slug];
  useDocumentTitle(project ? t(project.title) : null);

  if (!project || project.kind !== 'page') return <NotFound />;

  // Go back to the field the visitor came from, or the project's main field.
  const backArea = areas.find((a) => a.id === (state?.fromArea ?? project.areas[0]));

  return (
    <article className="project">
      <header className="project__hero">
        <div className="container container--narrow">
          <Link to={`/area/${backArea.id}`} className="back-link">
            <Icon name="arrowLeft" size={18} /> {t(backArea.label)}
          </Link>
          <p className="project__org">{t(project.org)}</p>
          <h1 className="project__title">{t(project.title)}</h1>
          <p className="project__lead">{t(project.summary)}</p>
          <AreaLabels project={project} />
          {project.tools && (
            <p className="project__tools">
              <span>{t(toolsLabel)}:</span> {t(project.tools)}
            </p>
          )}
          {project.live && (
            <p className="project__live">
              <a className="btn btn--primary" href={project.live.href} target="_blank" rel="noopener noreferrer">
                {t(project.live.label)} <Icon name="external" size={18} />
              </a>
            </p>
          )}
        </div>
      </header>
      <div className="container container--narrow project__body">
        <Blocks blocks={project.body} reveal />
      </div>
    </article>
  );
}
