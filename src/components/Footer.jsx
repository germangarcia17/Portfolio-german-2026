import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { profile } from '../data/profile.js';
import ContactLinks from './ContactLinks.jsx';
import Icon from './Icon.jsx';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer" id="contact">
      <div className="container site-footer__inner">
        <div>
          <h2 className="site-footer__title">{t(ui.contact.title)}</h2>
          <p className="site-footer__text">{t(ui.contact.text)}</p>
          <p className="site-footer__loc"><Icon name="pin" size={18} /> {t(profile.location)}</p>
        </div>
        <ContactLinks compact />
      </div>
      <div className="container site-footer__base">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>{t(ui.footer.built)}</p>
      </div>
    </footer>
  );
}
