import { useMemo, useState } from 'react';
import { useLang } from '../i18n.jsx';
import Rich from './Rich.jsx';

// Figures taken from the final workbook (stock_actual, riesgo_almacen and ventas_mensuales).
const MONTHS = {
  en: ['Oct*', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  es: ['oct*', 'nov', 'dic', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep'],
};

const REVENUE = {
  fasteners: [1162865, 1734558, 2129962, 2318852, 2310557, 2708704, 2733805, 2705514, 2367991, 2104444, 1644798, 1603006],
  'power-tools': [321171, 474898, 526797, 703267, 653777, 769536, 686450, 749824, 668678, 624953, 524122, 441852],
  'hand-tools': [183558, 276081, 344395, 374364, 375333, 433854, 438475, 407914, 367038, 334628, 262105, 234810],
  locks: [164856, 245693, 321470, 385722, 382474, 426532, 441452, 394451, 367989, 362251, 262732, 225742],
  safety: [164157, 218960, 294635, 334215, 313573, 365396, 380888, 381965, 320796, 294975, 230209, 209431],
  anchors: [146648, 231609, 268903, 308262, 290148, 333856, 318876, 298666, 275640, 304747, 210978, 229461],
  abrasives: [118661, 184515, 232996, 244574, 256309, 296628, 300297, 276746, 241377, 223628, 191559, 160112],
  electrical: [105508, 157538, 184136, 202279, 202196, 243428, 245902, 225878, 200908, 185449, 157937, 142863],
};

const WAREHOUSES = [
  { code: 'BCN', name: { en: 'Barcelona', es: 'Barcelona' }, pct: 13.81, below: 347, total: 2513 },
  { code: 'SVQ', name: { en: 'Seville', es: 'Sevilla' }, pct: 12.78, below: 315, total: 2464 },
  { code: 'MAD', name: { en: 'Madrid', es: 'Madrid' }, pct: 12.6, below: 323, total: 2563 },
  { code: 'VLC', name: { en: 'Valencia', es: 'Valencia' }, pct: 11.93, below: 294, total: 2464 },
  { code: 'BIO', name: { en: 'Bilbao', es: 'Bilbao' }, pct: 10.78, below: 261, total: 2421 },
];

const ABC = [
  { cls: 'A', skus: 19.95, revenue: 4579851 },
  { cls: 'B', skus: 26.54, revenue: 858827 },
  { cls: 'C', skus: 53.51, revenue: 286264 },
];

const copy = {
  kpiTitle: { en: 'The four dashboard KPIs', es: 'Los cuatro KPIs del dashboard' },
  kpis: [
    { value: '€164,376', valueEs: '164.376 €', label: { en: 'Order amount', es: 'Importe del pedido' }, note: { en: '11,221 units · 451 SKUs', es: '11.221 unidades · 451 SKUs' } },
    { value: '€1.02M', valueEs: '1,02 M€', label: { en: 'Dead stock value', es: 'Valor del stock muerto' }, note: { en: '1.35% of €75.6M stock value · 61 SKUs', es: '1,35% de 75,6 M€ de stock · 61 SKUs' } },
    { value: '12.4%', valueEs: '12,4%', label: { en: 'Product-warehouse positions below minimum', es: 'Posiciones producto-almacén bajo mínimo' }, note: { en: '1,540 of 12,425', es: '1.540 de 12.425' } },
    { value: '279', valueEs: '279', label: { en: 'Stock-outs', es: 'Roturas de stock' }, note: { en: 'SKUs with 0 units available', es: 'SKUs con 0 unidades disponibles' } },
  ],
  answersTitle: { en: 'Answers for Monday’s meeting', es: 'Respuestas para la reunión del lunes' },
  answers: [
    {
      q: { en: 'What to reorder now?', es: '¿Qué reponer ya?' },
      a: {
        en: '**451 SKUs** (279 out of stock + 172 below their target cover): **11,221 units for €164,376** at purchase cost. The biggest lines are timber construction screws and bulk boxes of DIN 912 socket screws.',
        es: '**451 SKUs** (279 rotos + 172 por debajo de su cobertura objetivo): **11.221 unidades por 164.376 €** a coste de compra. Las líneas más grandes son tornillos de construcción para madera y cajas a granel de tornillos DIN 912.',
      },
    },
    {
      q: { en: 'How much money is stuck?', es: '¿Cuánto dinero está parado?' },
      a: {
        en: '**€1.02M in dead stock** (no sales in 90 days), 1.35% of the €75.6M stock value. The bigger story is overstock: **4,212 SKUs have more than 180 days of cover** and hold €74.1M, 98% of the stock value.',
        es: '**1,02 M€ en stock muerto** (sin ventas en 90 días), el 1,35% de los 75,6 M€ de stock. Lo más llamativo es el sobrestock: **4.212 SKUs tienen más de 180 días de cobertura** y suman 74,1 M€, el 98% del valor del stock.',
      },
    },
    {
      q: { en: 'Which warehouse is worst?', es: '¿Qué almacén está peor?' },
      a: {
        en: '**Barcelona (BCN)**: 13.8% of its products are below the reorder point. Bilbao is the healthiest at 10.8%.',
        es: '**Barcelona (BCN)**: el 13,8% de sus productos está por debajo del punto de pedido. Bilbao es el más sano, con un 10,8%.',
      },
    },
  ],
  recoTitle: { en: 'My recommendation', es: 'Mi recomendación' },
  reco: {
    en: 'Place the €164k order before the campaign, starting with the A-class stock-outs, and prioritise transfers to Barcelona. At the same time, the real lever for cash is not buying less but selling the overstock: B2B packs and campaign discounts on the products with the most days of cover.',
    es: 'Lanzar el pedido de 164 k€ antes de la campaña, empezando por las roturas de clase A, y priorizar los traspasos hacia Barcelona. A la vez, la verdadera palanca de caja no es comprar menos sino vender el sobrestock: packs B2B y descuentos de campaña en los productos con más días de cobertura.',
  },
  rankTitle: { en: 'Warehouse ranking · % of products below minimum', es: 'Ranking de almacenes · % de productos bajo mínimo' },
  status: {
    critical: { en: 'Worst', es: 'Peor' },
    warning: { en: 'Watch', es: 'Vigilar' },
    good: { en: 'Best', es: 'Mejor' },
  },
  abcTitle: { en: 'ABC classification by 90-day revenue', es: 'Clasificación ABC por ingresos de 90 días' },
  abcSkus: { en: 'of SKUs', es: 'de los SKUs' },
  abcRevenue: { en: 'of revenue', es: 'de los ingresos' },
  abcNote: {
    en: 'One in five products brings in 80% of the revenue: those are the SKUs that can never run out.',
    es: 'Uno de cada cinco productos genera el 80% de los ingresos: son los SKUs que nunca pueden faltar.',
  },
  trendTitle: { en: 'Monthly net revenue by category', es: 'Ingresos netos mensuales por categoría' },
  trendNote: {
    en: 'Oct 2025 – Sep 2026, all categories, all channels. *October starts on the 11th, when the sales data begins. Hover or tap the chart to see each month.',
    es: 'Oct 2025 – sep 2026, todas las categorías y canales. *Octubre empieza el día 11, cuando arrancan los datos de ventas. Pasa el ratón o toca el gráfico para ver cada mes.',
  },
  all: { en: 'All categories', es: 'Todas' },
  showTable: { en: 'Show the data as a table', es: 'Ver los datos en tabla' },
  month: { en: 'Month', es: 'Mes' },
  revenue: { en: 'Net revenue', es: 'Ingresos netos' },
  peak: { en: 'Peak', es: 'Pico' },
  seasonal: {
    en: 'The pattern is the same in every category: demand builds from autumn, peaks in March–May and drops over the summer. The November campaign lands on the way up.',
    es: 'El patrón se repite en todas las categorías: la demanda crece desde otoño, alcanza su pico entre marzo y mayo y cae en verano. La campaña de noviembre llega en plena subida.',
  },
};

function formatEuro(value, lang) {
  if (value >= 1e6) return lang === 'es' ? `${(value / 1e6).toFixed(2).replace('.', ',')} M€` : `€${(value / 1e6).toFixed(2)}M`;
  return lang === 'es' ? `${Math.round(value / 1000)} k€` : `€${Math.round(value / 1000)}k`;
}

function statusOf(i, total) {
  if (i === 0) return 'critical';
  if (i === total - 1) return 'good';
  return 'warning';
}

function TrendChart() {
  const { t, lang } = useLang();
  const [category, setCategory] = useState('all');
  const [hover, setHover] = useState(null);

  const series = useMemo(() => {
    if (category !== 'all') return REVENUE[category];
    return MONTHS.en.map((_, i) => Object.values(REVENUE).reduce((sum, arr) => sum + arr[i], 0));
  }, [category]);

  const W = 640;
  const H = 260;
  const pad = { top: 16, right: 16, bottom: 30, left: 56 };
  const max = Math.max(...series) * 1.1;
  const x = (i) => pad.left + (i * (W - pad.left - pad.right)) / (series.length - 1);
  const y = (v) => pad.top + (1 - v / max) * (H - pad.top - pad.bottom);
  const path = series.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${path} L${x(series.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  const peakIndex = series.indexOf(Math.max(...series));
  const months = MONTHS[lang];

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    const step = (W - pad.left - pad.right) / (series.length - 1);
    const i = Math.round((px - pad.left) / step);
    setHover(Math.max(0, Math.min(series.length - 1, i)));
  };

  const active = hover ?? peakIndex;

  return (
    <div className="sf-chart">
      <div className="chips" role="group" aria-label={t(copy.trendTitle)}>
        {['all', ...Object.keys(REVENUE)].map((key) => (
          <button
            key={key}
            type="button"
            className={`chip ${category === key ? 'is-active' : ''}`}
            aria-pressed={category === key}
            onClick={() => setCategory(key)}
          >
            {key === 'all' ? t(copy.all) : key}
          </button>
        ))}
      </div>
      <div className="sf-chart__frame">
        <p className="sf-chart__readout" aria-live="polite">
          <strong>{months[active]}</strong> · {formatEuro(series[active], lang)}
          {hover === null && <span className="sf-chart__peak"> ({t(copy.peak)})</span>}
        </p>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="sf-chart__svg"
          role="img"
          aria-label={`${t(copy.trendTitle)}: ${category === 'all' ? t(copy.all) : category}`}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {ticks.map((v, i) => (
            <g key={i}>
              <line x1={pad.left} x2={W - pad.right} y1={y(v)} y2={y(v)} className="sf-chart__grid" />
              <text x={pad.left - 8} y={y(v) + 4} className="sf-chart__axis" textAnchor="end">{formatEuro(v, lang)}</text>
            </g>
          ))}
          {months.map((m, i) => (
            <text key={m} x={x(i)} y={H - 8} className="sf-chart__axis" textAnchor="middle">{m}</text>
          ))}
          <path d={area} className="sf-chart__area" />
          <path d={path} className="sf-chart__line" />
          <line x1={x(active)} x2={x(active)} y1={pad.top} y2={y(0)} className="sf-chart__cross" />
          <circle cx={x(active)} cy={y(series[active])} r="6" className="sf-chart__dot" />
          <rect x={pad.left} y={pad.top} width={W - pad.left - pad.right} height={H - pad.top - pad.bottom} fill="transparent" />
        </svg>
      </div>
      <details className="sf-chart__table">
        <summary>{t(copy.showTable)}</summary>
        <div className="table-wrap">
          <table className="table table--compact">
            <thead><tr><th scope="col">{t(copy.month)}</th><th scope="col">{t(copy.revenue)}</th></tr></thead>
            <tbody>
              {series.map((v, i) => (
                <tr key={i}><th scope="row">{months[i]}</th><td>{v.toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB')} €</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

export default function SupplyForgeResults() {
  const { t, lang } = useLang();
  const maxPct = 15;

  return (
    <div className="sf-results">
      <h3 className="sf-results__title">{t(copy.kpiTitle)}</h3>
      <dl className="kpis kpis--four">
        {copy.kpis.map((kpi, i) => (
          <div className="kpi" key={i}>
            <dt className="kpi__label">{t(kpi.label)}</dt>
            <dd className="kpi__value">{lang === 'es' ? kpi.valueEs : kpi.value}</dd>
            <dd className="kpi__note">{t(kpi.note)}</dd>
          </div>
        ))}
      </dl>

      <h3 className="sf-results__title">{t(copy.answersTitle)}</h3>
      <div className="answers">
        {copy.answers.map((item, i) => (
          <div className="answer" key={i}>
            <p className="answer__q"><span className="answer__num">{i + 1}</span>{t(item.q)}</p>
            <Rich as="p" className="answer__a" text={item.a} />
          </div>
        ))}
      </div>

      <div className="sf-grid">
        <section className="sf-panel">
          <h3 className="sf-results__title">{t(copy.rankTitle)}</h3>
          <ol className="ranking">
            {WAREHOUSES.map((w, i) => {
              const status = statusOf(i, WAREHOUSES.length);
              return (
                <li key={w.code} className={`ranking__row ranking__row--${status}`}>
                  <span className="ranking__name"><strong>{w.code}</strong> {t(w.name)}</span>
                  <span className="ranking__bar" aria-hidden="true">
                    <span style={{ width: `${(w.pct / maxPct) * 100}%` }} />
                  </span>
                  <span className="ranking__value">{lang === 'es' ? `${w.pct.toFixed(1).replace('.', ',')}%` : `${w.pct.toFixed(1)}%`}</span>
                  {status !== 'warning' && <span className={`status status--${status}`}>{t(copy.status[status])}</span>}
                </li>
              );
            })}
          </ol>
        </section>
        <section className="sf-panel">
          <h3 className="sf-results__title">{t(copy.abcTitle)}</h3>
          <ul className="abc">
            {ABC.map((row) => {
              const share = (row.revenue / ABC.reduce((s, r) => s + r.revenue, 0)) * 100;
              const fmt = (n) => n.toFixed(0);
              return (
                <li key={row.cls} className="abc__row">
                  <span className={`abc__badge abc__badge--${row.cls}`}>{row.cls}</span>
                  <span className="abc__text">
                    <strong>{fmt(row.skus)}%</strong> {t(copy.abcSkus)} → <strong>{fmt(share)}%</strong> {t(copy.abcRevenue)} ({formatEuro(row.revenue, lang)})
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="sf-panel__note">{t(copy.abcNote)}</p>
        </section>
      </div>

      <section className="sf-panel">
        <h3 className="sf-results__title">{t(copy.trendTitle)}</h3>
        <p className="sf-panel__note">{t(copy.trendNote)}</p>
        <TrendChart />
        <p className="sf-panel__note">{t(copy.seasonal)}</p>
      </section>

      <div className="reco">
        <h3 className="sf-results__title">{t(copy.recoTitle)}</h3>
        <p>{t(copy.reco)}</p>
      </div>
    </div>
  );
}
