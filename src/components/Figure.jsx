import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import Icon from './Icon.jsx';

// Screenshot with caption. Clicking opens it full size in a native <dialog>,
// which gives focus trapping and Esc-to-close for free.
export default function Figure({ src, width, height, alt, caption, narrow = false }) {
  const { t } = useLang();
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const altText = t(alt);

  return (
    <figure className={`figure ${narrow ? 'figure--narrow' : ''}`}>
      <button type="button" className="figure__button" onClick={() => setOpen(true)} aria-label={`${altText}. ${t(ui.zoom)}`}>
        <img src={src} width={width} height={height} alt={altText} loading="lazy" decoding="async" />
        <span className="figure__zoom" aria-hidden="true"><Icon name="zoom" size={18} /></span>
      </button>
      {caption && <figcaption>{t(caption)}</figcaption>}
      <dialog
        ref={dialogRef}
        className="lightbox"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        {open && (
          <div className="lightbox__inner">
            <button type="button" className="lightbox__close" onClick={() => setOpen(false)} aria-label={t(ui.close)}>
              <Icon name="close" size={22} />
            </button>
            <img src={src} width={width} height={height} alt={altText} />
            {caption && <p className="lightbox__caption">{t(caption)}</p>}
          </div>
        )}
      </dialog>
    </figure>
  );
}
