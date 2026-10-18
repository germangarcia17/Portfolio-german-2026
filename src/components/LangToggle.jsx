import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';

// Big, always-visible language switch. English is the default.
export default function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={t(ui.langSwitch)}>
      {['en', 'es'].map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          className={`lang-toggle__btn ${lang === code ? 'is-active' : ''}`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
