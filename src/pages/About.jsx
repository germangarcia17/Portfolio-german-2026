import { useLang } from '../i18n.jsx';
import { about } from '../data/about.js';
import { profile } from '../data/profile.js';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import ContactLinks from '../components/ContactLinks.jsx';
import useDocumentTitle from '../useDocumentTitle.js';

export default function About() {
  const { t } = useLang();
  useDocumentTitle(t(about.title));

  return (
    <div className="about">
      <header className="about-hero">
        <div className="container container--mid about-hero__inner">
          <picture className="about-hero__photo">
            <source type="image/webp" srcSet="/images/german-portrait-240.webp 240w, /images/german-portrait-480.webp 480w" sizes="240px" />
            <img src="/images/german-portrait-480.jpg" width="480" height="480" alt={profile.name} fetchpriority="high" />
          </picture>
          <div>
            <h1 className="page-title">{t(about.title)}</h1>
            <p className="about-hero__name">{profile.name}</p>
            <p className="about-hero__role">{t(profile.role)}</p>
            <p className="about-hero__pitch">{t(profile.pitch)}</p>
            <p className="about-hero__loc"><Icon name="pin" size={18} /> {t(profile.location)}</p>
            <ContactLinks />
          </div>
        </div>
      </header>

      <div className="container container--mid">
        <Reveal as="section" className="about__section">
          <h2 className="section-title">{t(about.story.title)}</h2>
          <div className="prose">
            {about.story.paragraphs.map((para, i) => <Rich key={i} as="p" text={para} />)}
          </div>
        </Reveal>

        <Reveal as="section" className="about__section">
          <h2 className="section-title">{t(about.strengths.title)}</h2>
          <ul className="bullets strengths">
            {about.strengths.items.map((item) => (
              <li key={item.id} id={item.id}>
                <strong>{t(item.title)}</strong>
                <Rich text={item.text} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="about__section">
          <h2 className="section-title">{t(about.goals.title)}</h2>
          <p className="prose">{t(about.goals.text)}</p>
        </Reveal>

        <Reveal as="section" className="about__section">
          <h2 className="section-title">{t(about.interests.title)}</h2>
          <p className="prose">{t(about.interests.text)}</p>
        </Reveal>

        <Reveal as="section" className="about__section">
          <h2 className="section-title">{t(about.hobbies.title)}</h2>
          <p className="prose">{t(about.hobbies.text)}</p>
        </Reveal>

        <Reveal className="mountain">
          <img src="/images/german-mountain.webp" width="800" height="800" alt={t(about.photo.alt)} loading="lazy" decoding="async" />
          <p className="mountain__caption">{t(about.photo.caption)}</p>
        </Reveal>
      </div>
    </div>
  );
}
