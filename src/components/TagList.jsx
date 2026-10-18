import { useLang } from '../i18n.jsx';

// Tags are written once in English; generic words get a Spanish version here,
// tool and brand names stay as they are.
const es = {
  'Category management': 'Gestión de categorías',
  Sourcing: 'Aprovisionamiento',
  Pricing: 'Precios',
  'Product content': 'Contenido de producto',
  'Pivot tables': 'Tablas dinámicas',
  'Excel dashboard': 'Dashboard en Excel',
  'Web development': 'Desarrollo web',
  Accessibility: 'Accesibilidad',
  'Multilingual SEO': 'SEO multilingüe',
  'Affiliate marketing': 'Marketing de afiliados',
  Catalogue: 'Catálogo',
  'Own brand': 'Marca propia',
  Purchasing: 'Compras',
  Forecasting: 'Previsión',
  Suppliers: 'Proveedores',
  Promotions: 'Promociones',
  Overstock: 'Sobrestock',
  Assortment: 'Surtido',
  Seasonality: 'Estacionalidad',
  'Market analysis': 'Análisis de mercado',
  Growth: 'Crecimiento',
  'SEO audit': 'Auditoría SEO',
  'Digital marketing': 'Marketing digital',
  Degree: 'Grado',
  'GPA 8.1': 'Nota media 8,1',
  International: 'Internacional',
  Teamwork: 'Trabajo en equipo',
  Finland: 'Finlandia',
  'English C2': 'Inglés C2',
  Leadership: 'Liderazgo',
  Hospitality: 'Hostelería',
};

export default function TagList({ tags }) {
  const { lang } = useLang();
  return (
    <ul className="tags">
      {tags.map((tag) => (
        <li key={tag} className="tag">{lang === 'es' ? es[tag] ?? tag : tag}</li>
      ))}
    </ul>
  );
}
