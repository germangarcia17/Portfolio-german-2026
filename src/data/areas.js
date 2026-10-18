// The five answers to "Which part of my experience would you like to know more about?"
export const areas = [
  {
    id: 'ecommerce',
    featured: true,
    label: { en: 'Ecommerce', es: 'Ecommerce' },
    teaser: {
      en: 'Almost 3 years at 123tinta.es: categories, pricing, SEO, data and web.',
      es: 'Casi 3 años en 123tinta.es: categorías, precios, SEO, datos y web.',
    },
    intro: [
      {
        type: 'p',
        text: {
          en: 'Since January 2024 I have been working at 123tinta.es, the Spanish store of 123inkt.nl, an international ecommerce company selling ink, toner, printers and office supplies, with more than 20,000 SKUs. My role touches almost every part of the business: categories, suppliers, pricing, promotions, SEO, data and even the code of the product pages.',
          es: 'Desde enero de 2024 trabajo en 123tinta.es, la tienda española de 123inkt.nl, un ecommerce internacional de tinta, tóner, impresoras y material de oficina con más de 20.000 referencias. Mi puesto toca casi todas las partes del negocio: categorías, proveedores, precios, promociones, SEO, datos e incluso el código de las fichas de producto.',
        },
      },
    ],
    projects: ['3d-printers', 'ecommerce-sales-analysis', 'ecommerce-seo', 'supplyforge', 'printer-page-design', 'catalogue-crm', 'buyer-experience', 'promotions'],
  },
  {
    id: 'category',
    label: { en: 'Category Manager', es: 'Category Manager' },
    teaser: {
      en: 'New categories, assortment, suppliers and KPIs that move turnover.',
      es: 'Categorías nuevas, surtido, proveedores y KPIs que mueven el turnover.',
    },
    intro: [
      {
        type: 'p',
        text: {
          en: 'Opening, improving and growing categories: from choosing suppliers and products to following stock, sales and KPIs. Results include a new category with 50+ printers sold in its first month, a category that reached the top 10 and +11% turnover in the main categories since 2025.',
          es: 'Abrir, mejorar y hacer crecer categorías: desde elegir proveedores y productos hasta seguir el stock, las ventas y los KPIs. Entre los resultados, una categoría nueva con más de 50 impresoras vendidas el primer mes, una categoría que llegó al top 10 y un +11% de turnover en las categorías principales desde 2025.',
        },
      },
    ],
    projects: ['3d-printers', 'fans-shredders', 'business-opportunities', 'kpi-management', 'buyer-experience'],
  },
  {
    id: 'seo',
    label: { en: 'SEO Specialist', es: 'SEO Specialist' },
    teaser: {
      en: 'About 2 years of SEO between my own projects and 123tinta.es.',
      es: 'Unos 2 años de SEO entre proyectos propios y 123tinta.es.',
    },
    intro: [
      {
        type: 'p',
        text: {
          en: 'About two years of SEO experience, between my own projects and my work at 123tinta.es. Experience with SEO goals and keyword strategies, writing SEO-optimised content, and the logic behind search intent and keyword groups.',
          es: 'Unos dos años de experiencia en SEO, entre proyectos propios y mi trabajo en 123tinta.es. Experiencia en metas y estrategias de keywords, en escribir contenido optimizado para SEO y en la lógica detrás de las intenciones de búsqueda y los grupos de keywords.',
        },
      },
    ],
    projects: ['tuhogartech', 'ecommerce-seo', 'seo-consulting'],
  },
  {
    id: 'data',
    label: { en: 'Data Analytics', es: 'Data Analytics' },
    teaser: {
      en: 'Advanced Excel, Power Query, pivot tables and dashboards, plus basic SQL.',
      es: 'Excel avanzado, Power Query, tablas dinámicas y dashboards, y SQL básico.',
    },
    intro: [
      {
        type: 'p',
        text: {
          en: 'Advanced Excel (XLOOKUP, pivot tables, Power Query, pivot charts and dashboards) and basic SQL. I care about the full chain: getting the data, cleaning it, automating the boring part and turning the numbers into a decision.',
          es: 'Excel avanzado (BUSCARX, tablas dinámicas, Power Query, gráficos dinámicos y dashboards) y SQL básico. Me importa toda la cadena: obtener los datos, limpiarlos, automatizar la parte repetitiva y convertir los números en una decisión.',
        },
      },
    ],
    projects: ['supplyforge', 'ecommerce-sales-analysis'],
  },
  {
    id: 'web',
    label: { en: 'Web Development', es: 'Web Development' },
    teaser: {
      en: 'HTML, CSS, JavaScript and React as an extra for digital marketing.',
      es: 'HTML, CSS, JavaScript y React como un extra para el marketing digital.',
    },
    intro: [
      {
        type: 'plus',
        text: {
          en: 'I am not a developer. But my knowledge of HTML and CSS is an extra that adds a lot in digital marketing: web edits, email templates or landing pages, applying styles with ease. It also shows my interest in technical fields. AI has assisted me with the more complex web features.',
          es: 'No soy desarrollador. Pero mi conocimiento de HTML y CSS es un extra que puede aportar mucho en marketing digital: edición web, plantillas de correos o landings, aplicar estilos con facilidad. Además es una muestra de mi interés por campos técnicos. La IA me ha asistido con las funciones web más complicadas.',
        },
      },
    ],
    outro: [
      {
        type: 'plus',
        text: {
          en: 'I have also built small projects with React, JavaScript, HTML and CSS in Scrimba’s Frontend Developer course. [See it in my timeline](/timeline#scrimba).',
          es: 'También he realizado pequeños proyectos con React, JavaScript, HTML y CSS en el curso Frontend Developer de Scrimba. [Verlo en mi trayectoria](/timeline#scrimba).',
        },
      },
    ],
    projects: ['watchout-tours', 'tuhogartech', 'printer-page-design', 'wordpress-replica'],
  },
];

areas.push({
  id: 'other-skills',
  label: { en: 'Other skills', es: 'Otras aptitudes' },
  teaser: {
    en: 'Email marketing, languages, international experience and Google Analytics.',
    es: 'Email marketing, idiomas, experiencia internacional y Google Analytics.',
  },
  projects: [],
});

export const otherSkills = [
  {
    icon: 'mail',
    title: { en: 'Email marketing', es: 'Email marketing' },
    text: {
      en: 'Support with email templates in HTML and CSS, and with organising segments and tags during my internship.',
      es: 'Asistencia en plantillas de mail marketing con HTML y CSS, y en la organización de segmentos y tags durante mis prácticas.',
    },
  },
  {
    icon: 'globe',
    title: { en: 'English C2', es: 'Inglés C2' },
    text: { en: 'Fluent, and used daily in international environments.', es: 'Nivel nativo, y usado a diario en ambientes internacionales.' },
  },
  {
    icon: 'speech',
    title: { en: 'Native Spanish', es: 'Español nativo' },
    text: { en: 'Native language.', es: 'Lengua materna.' },
  },
  {
    icon: 'people',
    title: { en: 'International environments', es: 'Ambientes internacionales' },
    text: { en: 'A semester in Finland and four months in New Zealand.', es: 'Un cuatrimestre en Finlandia y cuatro meses en Nueva Zelanda.' },
  },
  {
    icon: 'key',
    title: { en: 'Hostel reception', es: 'Recepción de hostal' },
    text: { en: 'Front-desk experience with positive guest reviews.', es: 'Experiencia en recepción de un hostal con reseñas positivas.' },
  },
  {
    icon: 'chart',
    title: { en: 'Google Analytics', es: 'Google Analytics' },
    text: { en: 'Setting up and managing events and reports.', es: 'Gestión de Google Analytics, de eventos e informes.' },
  },
];
