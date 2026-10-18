import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import LangToggle from './LangToggle.jsx';

export default function Header() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  // Area pages and case studies all live under "Projects".
  const inProjects = pathname === '/' || pathname.startsWith('/area/') || pathname.startsWith('/projects/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <nav className="main-nav" aria-label="Main">
          <NavLink to="/about" className="main-nav__link">{t(ui.nav.about)}</NavLink>
          <Link to="/" className={`main-nav__link main-nav__link--main ${inProjects ? 'active' : ''}`} aria-current={inProjects ? 'page' : undefined}>
            {t(ui.nav.projects)}
          </Link>
          <NavLink to="/timeline" className="main-nav__link">{t(ui.nav.timeline)}</NavLink>
        </nav>
        <LangToggle />
      </div>
    </header>
  );
}
