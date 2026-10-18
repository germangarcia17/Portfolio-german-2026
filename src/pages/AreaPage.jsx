import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { areas, otherSkills } from '../data/areas.js';
import { projects } from '../data/projects/index.js';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import Blocks from '../components/Blocks.jsx';
import { CaseStudyCard, ExpandCard } from '../components/ProjectCard.jsx';
import useDocumentTitle from '../useDocumentTitle.js';
import NotFound from './NotFound.jsx';

function SkillsList() {
  const { t } = useLang();
  return (
    <ul className="skills">
      {otherSkills.map((skill, i) => (
        <Reveal as="li" key={i} delay={(i % 3) * 60} className="skill">
          <h2 className="skill__title">{t(skill.title)}</h2>
          <p className="skill__text">{t(skill.text)}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export default function AreaPage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const { t } = useLang();
  const area = areas.find((a) => a.id === id);
  useDocumentTitle(area ? t(area.label) : null);

  if (!area) return <NotFound />;

  const openProject = params.get('project');
  const list = area.projects.map((slug) => projects[slug]);

  return (
    <div className="area-page">
      <header className="page-hero">
        <div className="container container--mid">
          <Link to="/" className="back-link">
            <Icon name="arrowLeft" size={18} /> {t(ui.backToProjects)}
          </Link>
          <h1 className="page-title">{t(area.label)}</h1>
          {area.intro && (
            <div className="page-intro">
              <Blocks blocks={area.intro} />
            </div>
          )}
        </div>
      </header>
      <div className="container container--mid area-page__list">
        {area.id === 'other-skills' ? (
          <SkillsList />
        ) : (
          <ul className="project-list">
            {list.map((project) => (
              <Reveal as="li" key={project.slug}>
                {project.kind === 'page' ? (
                  <CaseStudyCard project={project} fromArea={area.id} />
                ) : (
                  <ExpandCard project={project} initiallyOpen={openProject === project.slug} />
                )}
              </Reveal>
            ))}
          </ul>
        )}
        {area.outro && (
          <div className="area-page__outro">
            <Blocks blocks={area.outro} />
          </div>
        )}
      </div>
    </div>
  );
}
