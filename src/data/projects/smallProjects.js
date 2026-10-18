import { p, list, img, link } from './helpers.js';

// Smaller projects: no page of their own, they expand in place.
export const crm = {
  slug: 'catalogue-crm',
  kind: 'expand',
  areas: ['ecommerce'],
  org: '123tinta.es',
  title: { en: 'Catalogue & CRM management (20k+ SKUs)', es: 'Gestión de catálogo y CRM (+20k SKUs)' },
  summary: {
    en: 'My day-to-day at 123tinta.es: content, pricing, stock, suppliers, promotions and brand strategy for a catalogue of more than 20,000 references.',
    es: 'Mi día a día en 123tinta.es: contenidos, precios, stock, proveedores, promociones y estrategia de marca para un catálogo de más de 20.000 referencias.',
  },
  details: [
    list([
      { en: 'Website content management: groups and subgroups.', es: 'Gestión de contenidos de la web, grupos y subgrupos.' },
      { en: 'Pricing strategy across different channels.', es: 'Estrategia de precios en distintos canales.' },
      { en: 'Product support for other departments: customer service and warehouse.', es: 'Asistencia de producto a otros departamentos: atención al cliente y almacén.' },
      { en: 'Stock and supplier management, plus sales and demand analysis.', es: 'Gestión de stock y proveedores, y análisis de ventas y demanda.' },
      { en: 'Development of promotional and cross-selling strategies.', es: 'Desarrollo de estrategias promocionales y de venta cruzada.' },
      { en: 'Applying the own-brand strategy with its suppliers, and pushing the brand strategy forward.', es: 'Aplicación de la estrategia de marca propia y sus proveedores, así como impulso de la estrategia de marca.' },
    ]),
  ],
};

export const buyer = {
  slug: 'buyer-experience',
  kind: 'expand',
  areas: ['ecommerce', 'category'],
  org: '123tinta.es',
  title: { en: 'Buyer experience', es: 'Experiencia como buyer' },
  summary: {
    en: 'Supplier management end to end: feeds, promotions, quotes, demand forecasting, stock coverage, EOL alternatives and cost control.',
    es: 'Gestión de proveedores de principio a fin: feeds, promociones, presupuestos, previsión de ventas, cobertura de stock, alternativas EOL y control de costes.',
  },
  details: [
    list([
      { en: 'Supplier management: contact, product feeds, and deciding whether to accept their promotions.', es: 'Gestión de proveedores: contacto, feeds de producto y decidir si aceptar o no sus promociones.' },
      { en: 'Preparing quotes, and splitting the team’s work by category.', es: 'Realización de presupuestos y división de equipos por categorías.' },
      { en: 'Sales forecasting and the stock required, coverage and overstock management.', es: 'Previsión de ventas y stock requerido, cobertura y gestión de sobrestock.' },
      { en: 'Alternatives for End of Sale and End of Life (EOL) products.', es: 'Alternativas para productos End of Sale y EOL (fin de vida).' },
      { en: 'EAN and SKU control.', es: 'Control de EAN y SKU.' },
      { en: 'Contact and communication with the warehouse; control of lead times and supply.', es: 'Contacto y comunicación con el almacén; control de plazos y aprovisionamiento.' },
      { en: 'Price and cost control, including the Spanish “canon” levies on technology products.', es: 'Control de precios y costes, contando con los impuestos de canon en tecnología.' },
    ]),
  ],
};

export const promotions = {
  slug: 'promotions',
  kind: 'expand',
  areas: ['ecommerce'],
  org: '123tinta.es',
  title: { en: 'Promotions management', es: 'Gestión de promociones' },
  summary: {
    en: 'Planning promotions in key categories ahead of time, selecting the products for the newsletters, and packs and discounts to clear overstock.',
    es: 'Preparación de promociones en categorías clave con tiempo, selección de los productos para las newsletters y packs y descuentos para liquidar sobrestock.',
  },
  details: [
    list([
      { en: 'Preparing promotions in key categories in advance: choosing products and categories, applying the discount and analysing the results.', es: 'Preparación de promociones en categorías clave con tiempo: selección de productos y categorías, aplicación del descuento y análisis de resultados.' },
      { en: 'Newsletter promotions: I select the products that go into each newsletter.', es: 'Promociones por newsletter: selecciono los productos que entran en cada newsletter.' },
      { en: 'Newsletter promotions combined with pack or discount strategies to clear overstock, also choosing the products for them.', es: 'Promociones por newsletter y estrategias de packs o descuentos para liquidar sobrestock, seleccionando también sus productos.' },
    ]),
  ],
};

export const fans = {
  slug: 'fans-shredders',
  kind: 'expand',
  areas: ['category'],
  org: '123tinta.es',
  title: { en: 'Improving the fans and paper shredders categories', es: 'Mejora de las categorías de ventiladores y destructoras' },
  summary: {
    en: 'Improving, expanding and reorganising two categories, with stock supply and sales follow-up. Fans had very positive results in summer.',
    es: 'Mejora, ampliación y organización de dos categorías, con aprovisionamiento de stock y seguimiento de ventas. Los ventiladores tuvieron resultados muy positivos en verano.',
  },
  details: [
    { type: 'links', items: [
      { href: 'https://www.123tinta.es/Material-de-oficina/Ventiladores-p372610.html', label: { en: 'Fans category', es: 'Categoría de ventiladores' } },
      { href: 'https://www.123tinta.es/Material-de-oficina/Destructoras-de-papel-p60994.html', label: { en: 'Paper shredders category', es: 'Categoría de destructoras' } },
    ] },
    p(
      'Improvement, expansion and organisation of both categories, stock supply and sales follow-up. The fans category had very positive results in summer.',
      'Mejora, ampliación y organización de las categorías, aprovisionamiento de stock y seguimiento de ventas. La de ventiladores ha tenido resultados muy positivos en verano.'
    ),
  ],
};

export const opportunities = {
  slug: 'business-opportunities',
  kind: 'expand',
  areas: ['category'],
  org: '123tinta.es',
  title: { en: 'Finding business opportunities', es: 'Encontrar oportunidades de negocio' },
  summary: {
    en: 'Competitor, reference and supplier analysis that turned cash register rolls into a top-10 category.',
    es: 'Análisis de competencia, referencias y proveedores que convirtió los rollos de caja registradora en una categoría top 10.',
  },
  details: [
    p(
      'Analysing competitors, our own references at 123tinta.es and suppliers, I found the opportunity to expand the cash register rolls category. I widened its range of references and it sold so well that it is now a top 10 category.',
      'Analizando la competencia, las referencias de 123tinta.es y los proveedores, encontré la oportunidad de ampliar la categoría de rollos de caja registradora. Amplié sus referencias y se vende tanto que ya es una categoría top 10.'
    ),
  ],
};

export const kpis = {
  slug: 'kpi-management',
  kind: 'expand',
  areas: ['category'],
  org: '123tinta.es',
  title: { en: 'KPI management', es: 'Gestión de KPIs' },
  summary: {
    en: 'General and post-promotion KPI analysis: turnover of the main categories is up 11% since 2025.',
    es: 'Análisis de KPIs generales y tras promociones: el turnover de las categorías principales ha subido un 11% desde 2025.',
  },
  details: [
    p(
      'Analysis of general KPIs and of KPIs after promotions: turnover of the main categories is 11% higher since 2025. I work with Excel, advanced formulas and pivot tables to analyse the data and answer specific business questions.',
      'Análisis de KPIs generales y tras promociones: el turnover de las categorías principales es un 11% mayor desde 2025. Uso Excel, fórmulas avanzadas y tablas dinámicas para analizar datos y dar respuesta a preguntas concretas.'
    ),
  ],
};

export const seoConsulting = {
  slug: 'seo-consulting',
  kind: 'expand',
  areas: ['seo'],
  org: '2022',
  title: { en: 'SEO consulting for an editorial website', es: 'Asesoría SEO para una web editorial' },
  summary: {
    en: 'An SEO audit with Screaming Frog and Lighthouse, delivered as an Excel file of proposed improvements.',
    es: 'Una auditoría SEO con Screaming Frog y Lighthouse, entregada en un Excel con mejoras propuestas.',
  },
  details: [
    p(
      'SEO consulting for an editorial website: I audited its SEO with Screaming Frog and Lighthouse and presented an Excel file with proposed improvements and elements to review. I learnt to do these audits in the advanced digital marketing course at IEB.',
      'Asesoría a una web editorial sobre su SEO con Screaming Frog y Lighthouse, presentando un Excel con mejoras propuestas y elementos a revisar. Aprendí a realizarlas en el curso de marketing digital del IEB.'
    ),
    link('/timeline#ieb', 'See the IEB course in my timeline', 'Ver el curso del IEB en mi trayectoria'),
  ],
};

export const wordpress = {
  slug: 'wordpress-replica',
  kind: 'expand',
  areas: ['web'],
  org: { en: 'Learning project', es: 'Proyecto de aprendizaje' },
  title: { en: 'From a WordPress design to hand-written code', es: 'De un diseño de WordPress a código escrito a mano' },
  summary: {
    en: 'A furniture website recreated entirely by hand in HTML and CSS: proof that I can take a design and turn it into code.',
    es: 'Una web de muebles recreada completamente a mano en HTML y CSS: la prueba de que puedo coger un diseño y convertirlo en código.',
  },
  details: [
    link('https://myfurnitureprojectv3.netlify.app/#start', 'See the live page', 'Ver la página en vivo'),
    p(
      'A design created completely by hand during my learning process: everything is HTML and CSS except the mobile drop-down menu. It is a copy of a WordPress design, a way to show that I can take a Figma design and build it with code. No assistance at all, every line written by hand. (This portfolio uses its colour palette.)',
      'Diseño creado completamente a mano en mi proceso de aprendizaje: todo HTML y CSS excepto el menú desplegable en móvil. Es una copia de un diseño de WordPress, una forma de mostrar que puedo coger un diseño de Figma y crearlo con código. Ninguna asistencia, escrito todo completamente a mano. (Este portfolio usa su paleta de colores.)'
    ),
    img('furniture-project', { en: 'Furniture website with kitchen, living room and bedroom cards', es: 'Web de muebles con tarjetas de cocina, salón y dormitorio' }),
  ],
};
