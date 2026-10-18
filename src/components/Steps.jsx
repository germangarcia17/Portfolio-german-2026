import { useId, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import Icon from './Icon.jsx';
import Rich from './Rich.jsx';
import Blocks from './Blocks.jsx';

// Numbered steps: a short summary is always visible, the full content expands on click.
export default function Steps({ title, items }) {
  const { t } = useLang();
  const baseId = useId();
  const [open, setOpen] = useState(() => new Set());
  const allOpen = open.size === items.length;

  const toggle = (index) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)));

  return (
    <section className="steps">
      <div className="steps__head">
        <div>
          <h2 className="steps__title">{t(title) || t(ui.steps)}</h2>
          <p className="steps__hint">{t(ui.stepHint)}</p>
        </div>
        <button type="button" className="btn btn--ghost btn--small" onClick={toggleAll}>
          {t(allOpen ? ui.collapseAll : ui.expandAll)}
        </button>
      </div>
      <ol className="steps__list">
        {items.map((step, i) => {
          const isOpen = open.has(i);
          const panelId = `${baseId}-panel-${i}`;
          return (
            <li key={i} className={`step ${isOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="step__toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="step__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="step__text">
                  <span className="visually-hidden">{t(ui.step)} {i + 1}: </span>
                  <span className="step__title">{t(step.title)}</span>
                  <Rich className="step__summary" text={step.summary} />
                </span>
                <Icon name="chevron" className="step__chevron" size={22} />
              </button>
              <div className="step__panel" id={panelId} role="region" aria-hidden={!isOpen}>
                <div className="step__panel-inner">
                  <div className="step__content">
                    <Blocks blocks={step.blocks} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
