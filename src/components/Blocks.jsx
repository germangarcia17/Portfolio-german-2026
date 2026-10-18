import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import Rich from './Rich.jsx';
import Callout from './Callout.jsx';
import Steps from './Steps.jsx';
import Figure from './Figure.jsx';
import CodeBlock from './CodeBlock.jsx';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';

// Heavier, page-specific widgets are loaded only where they are used.
const widgets = {
  SupplyForgeResults: lazy(() => import('./SupplyForgeResults.jsx')),
};

function SmartLink({ href, children, className }) {
  if (href.startsWith('/')) return <Link to={href} className={className}>{children}</Link>;
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Block({ block }) {
  const { t } = useLang();
  switch (block.type) {
    case 'p':
      return <Rich as="p" text={block.text} />;
    case 'h':
      return <h2 className="block-title">{t(block.text)}</h2>;
    case 'list':
      return (
        <ul className="bullets">
          {block.items.map((item, i) => <Rich key={i} as="li" text={item} />)}
        </ul>
      );
    case 'questions':
      return (
        <ol className="questions">
          {block.items.map((item, i) => <Rich key={i} as="li" text={item} />)}
        </ol>
      );
    case 'plus':
      return <Callout variant="plus" title={block.title} text={block.text} />;
    case 'alert':
      return <Callout variant="alert" title={block.title} text={block.text} />;
    case 'steps':
      return <Steps title={block.title} items={block.items} />;
    case 'figure':
      return <Figure {...block} />;
    case 'gallery':
      return (
        <div className="gallery">
          {block.items.map((item, i) => <Figure key={i} {...item} />)}
        </div>
      );
    case 'code':
      return <CodeBlock {...block} />;
    case 'kpis':
      return (
        <dl className="kpis">
          {block.items.map((kpi, i) => (
            <div className="kpi" key={i}>
              <dt className="kpi__label">{t(kpi.label)}</dt>
              <dd className="kpi__value">{kpi.value}</dd>
            </div>
          ))}
        </dl>
      );
    case 'columns':
      return (
        <div className="columns">
          {block.items.map((col, i) => (
            <div className="column-card" key={i}>
              <h3>{t(col.title)}</h3>
              <Blocks blocks={col.blocks} />
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <div className="table-wrap" tabIndex={0}>
          <table className="table">
            {block.caption && <caption>{t(block.caption)}</caption>}
            <thead>
              <tr>{block.head.map((cell, i) => <th key={i} scope="col">{t(cell)}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (c === 0 ? <th key={c} scope="row">{t(cell)}</th> : <td key={c}><Rich text={cell} /></td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'link':
      return (
        <p className="block-link">
          <SmartLink href={block.href} className="btn btn--outline">
            {t(block.label)}
            <Icon name={block.href.startsWith('/') ? 'arrowRight' : 'external'} size={18} />
          </SmartLink>
        </p>
      );
    case 'links':
      return (
        <p className="block-link block-link--multi">
          {block.items.map((item) => (
            <SmartLink key={item.href} href={item.href} className="btn btn--outline btn--small">
              {t(item.label)}
              <Icon name="external" size={16} />
            </SmartLink>
          ))}
        </p>
      );
    case 'download':
      return (
        <div className="download">
          <a className="btn btn--primary" href={block.href} download>
            <Icon name="download" size={20} />
            {t(block.label)}
          </a>
          {block.note && <p className="download__note">{t(block.note)}</p>}
        </div>
      );
    case 'component': {
      const Widget = widgets[block.name];
      return Widget ? (
        <Suspense fallback={<div className="widget-loading" />}>
          <Widget />
        </Suspense>
      ) : null;
    }
    default:
      return null;
  }
}

export default function Blocks({ blocks, reveal = false }) {
  if (!blocks) return null;
  return blocks.map((block, i) =>
    reveal ? (
      <Reveal key={i} className="block">
        <Block block={block} />
      </Reveal>
    ) : (
      <div key={i} className="block">
        <Block block={block} />
      </div>
    )
  );
}
