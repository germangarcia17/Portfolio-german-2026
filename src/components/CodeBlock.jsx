import { useState } from 'react';
import { useLang } from '../i18n.jsx';
import { ui } from '../data/ui.js';
import Icon from './Icon.jsx';
import Rich from './Rich.jsx';

const SQL_KEYWORDS = /\b(select|from|join|on|where|and|or|in|group|by|order|as|desc|asc|between|date|sum|count|round|avg|nullif|date_trunc|false|true)\b/gi;
const M_KEYWORDS = /\b(each|if|then|else|let|in|null|type|Table\.\w+|List\.\w+|Number\.\w+|JoinKind\.\w+|Replacer\.\w+|Int64\.Type)\b/g;
const XL_KEYWORDS = /\b(SUMIFS|SUM|IFS|XLOOKUP)\b/g;

// Tiny highlighter: escapes the code, then wraps comments, strings and keywords.
function highlight(code, lang) {
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const keywords = lang === 'sql' ? SQL_KEYWORDS : lang === 'm' ? M_KEYWORDS : XL_KEYWORDS;
  return escaped
    .split('\n')
    .map((line) => {
      const commentAt = line.search(/\/\/|--/);
      const codePart = commentAt >= 0 ? line.slice(0, commentAt) : line;
      const comment = commentAt >= 0 ? `<span class="tok-comment">${line.slice(commentAt)}</span>` : '';
      const pieces = codePart.split(/("[^"]*"|'[^']*')/);
      const html = pieces
        .map((piece, i) => (i % 2 === 1 ? `<span class="tok-string">${piece}</span>` : piece.replace(keywords, '<span class="tok-kw">$1</span>')))
        .join('');
      return html + comment;
    })
    .join('\n');
}

export default function CodeBlock({ title, code, lang = 'sql', note }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };

  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__lang">{lang === 'm' ? 'Power Query M' : lang === 'excel' ? 'Excel' : 'SQL'}</span>
        {title && <span className="code__title">{t(title)}</span>}
        <button type="button" className="code__copy" onClick={copy} aria-live="polite">
          <Icon name={copied ? 'check' : 'copy'} size={16} />
          <span>{t(copied ? ui.copied : ui.copy)}</span>
        </button>
      </div>
      <pre tabIndex={0}>
        <code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} />
      </pre>
      {note && <Rich as="p" className="code__note" text={note} />}
    </div>
  );
}
