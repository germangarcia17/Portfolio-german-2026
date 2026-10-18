import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import useDocumentTitle from '../useDocumentTitle.js';

export default function NotFound() {
  const { t } = useLang();
  useDocumentTitle(t(ui.notFound.title));
  return (
    <section className="not-found container container--narrow">
      <p className="not-found__code">404</p>
      <h1>{t(ui.notFound.title)}</h1>
      <p>{t(ui.notFound.text)}</p>
      <Link className="btn btn--primary" to="/">{t(ui.backToProjects)}</Link>
    </section>
  );
}
