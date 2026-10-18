// Image sizes are stored next to the paths so every <img> gets width/height
// and the layout never jumps while images load.
const sizes = {
  'data-1-folder': [1396, 193],
  'data-2-raw': [1345, 550],
  'data-3-clean': [1348, 585],
  'data-4-pivot': [970, 566],
  'data-5-variation': [706, 348],
  'data-5-filters': [1600, 595],
  'data-6-pies': [1368, 628],
  'data-6-bars': [974, 475],
  'data-7-hp-stockout': [1080, 133],
  'printer-before': [479, 734],
  'printer-after': [508, 510],
  'printer-popup': [779, 311],
  'tuhogartech-og': [1200, 630],
  'sf-sql-1': [533, 340],
  'sf-sql-2': [1518, 364],
  'sf-sql-3': [650, 367],
  'sf-sql-5': [933, 373],
  'sf-csv-files': [867, 184],
  'sf-pq-suppliers': [1261, 348],
  'sf-pq-group': [863, 595],
  'sf-pq-merge': [839, 753],
  'sf-pq-stock': [1368, 420],
  'sf-pq-steps': [317, 797],
  'sf-dashboard': [1600, 406],
  'watchout-tours': [1600, 712],
  'furniture-project': [1600, 749],
};

export function img(name, alt, caption, extra = {}) {
  const [width, height] = sizes[name];
  return { type: 'figure', src: `/images/${name}.webp`, width, height, alt, caption, ...extra };
}

export const p = (en, es) => ({ type: 'p', text: { en, es } });
export const h = (en, es) => ({ type: 'h', text: { en, es } });
export const list = (items) => ({ type: 'list', items });
export const plus = (en, es, title) => ({ type: 'plus', text: { en, es }, title });
export const alert = (en, es, title) => ({ type: 'alert', text: { en, es }, title });
export const link = (href, en, es) => ({ type: 'link', href, label: { en, es } });
