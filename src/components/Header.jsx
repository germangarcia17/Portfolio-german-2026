import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { profile } from '../data/profile.js';
import LangToggle from './LangToggle.jsx';

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={profile.name}>
          <span className="brand__mark" aria-hidden="true">GG</span>
          <span className="brand__name">{profile.name}</span>
        </Link>
        <nav className="main-nav" aria-label="Main">
          <NavLink to="/" end className="main-nav__link">{t(ui.nav.projects)}</NavLink>
          <NavLink to="/about" className="main-nav__link">{t(ui.nav.about)}</NavLink>
          <NavLink to="/timeline" className="main-nav__link">{t(ui.nav.timeline)}</NavLink>
        </nav>
        <LangToggle />
      </div>
    </header>
  );
}
