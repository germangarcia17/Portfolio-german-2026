import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import Rich from './Rich.jsx';

// "+" card: extra information worth mentioning. "!" card: a warning or caveat.
export default function Callout({ variant = 'plus', title, text, children }) {
  const { t } = useLang();
  const isPlus = variant === 'plus';
  return (
    <aside className={`callout callout--${variant}`}>
      <span className="callout__symbol" aria-hidden="true">{isPlus ? '+' : '!'}</span>
      <div className="callout__body">
        <p className="callout__label">{t(title) || t(isPlus ? ui.plusLabel : ui.alertLabel)}</p>
        {text && <Rich as="p" text={text} />}
        {children}
      </div>
    </aside>
  );
}
