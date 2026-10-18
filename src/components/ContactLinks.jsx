import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import { profile } from '../data/profile.js';
import Icon from './Icon.jsx';

export default function ContactLinks({ compact = false }) {
  const { t } = useLang();
  return (
    <ul className={`contact-links ${compact ? 'contact-links--compact' : ''}`}>
      <li>
        <a className="btn btn--primary" href={`mailto:${profile.email}`}>
          <Icon name="mail" size={18} />
          {compact ? profile.email : t(ui.contact.email)}
        </a>
      </li>
      <li>
        <a className="btn btn--outline" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          <Icon name="linkedin" size={18} />
          {compact ? profile.linkedinLabel : t(ui.contact.linkedin)}
        </a>
      </li>
      <li>
        <a className="btn btn--outline" href={profile.phoneHref}>
          <Icon name="phone" size={18} />
          {profile.phone}
        </a>
      </li>
    </ul>
  );
}
