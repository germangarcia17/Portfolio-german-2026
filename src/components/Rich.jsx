import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';

// Minimal inline markup for content strings: **bold**, `code` and [label](href).
// Internal links (starting with "/") go through the router; external ones open in a new tab.
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
const IS_TOKEN = /^(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))$/;

function renderToken(token, key) {
  if (token.startsWith('**')) return <strong key={key}>{token.slice(2, -2)}</strong>;
  if (token.startsWith('`')) return <code key={key} className="inline-code">{token.slice(1, -1)}</code>;
  const match = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (match) {
    const [, label, href] = match;
    if (href.startsWith('/')) return <Link key={key} to={href}>{label}</Link>;
    return <a key={key} href={href} target="_blank" rel="noopener noreferrer">{label}</a>;
  }
  return token;
}

export default function Rich({ text, as: Tag = 'span', className }) {
  const { t } = useLang();
  const value = t(text) ?? '';
  const parts = value.split(TOKEN).filter(Boolean);
  return <Tag className={className}>{parts.map((part, i) => (IS_TOKEN.test(part) ? renderToken(part, i) : part))}</Tag>;
}
