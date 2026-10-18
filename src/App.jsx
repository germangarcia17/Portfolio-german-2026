import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { useLang } from './i18n.jsx';
import { ui } from './data/ui.js';

const About = lazy(() => import('./pages/About.jsx'));
const Timeline = lazy(() => import('./pages/Timeline.jsx'));
const ProjectPage = lazy(() => import('./pages/ProjectPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!hash) return undefined;
    // Pages are lazy-loaded, so the target may appear a few frames later.
    const id = decodeURIComponent(hash.slice(1));
    let frame;
    let tries = 0;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else if (tries++ < 120) frame = requestAnimationFrame(seek);
    };
    frame = requestAnimationFrame(seek);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

function SkipLink() {
  const { t } = useLang();
  return <a className="skip-link" href="#main">{t(ui.skip)}</a>;
}

export default function App() {
  return (
    <>
      <SkipLink />
      <ScrollManager />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
