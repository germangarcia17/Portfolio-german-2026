import { p, list, img, plus, link } from './helpers.js';

export const printerPage = {
  slug: 'printer-page-design',
  kind: 'page',
  areas: ['ecommerce', 'web'],
  org: '123tinta',
  title: { en: 'Redesigning the printer product page', es: 'Rediseño de la ficha de impresoras' },
  summary: {
    en: 'A new specifications layout for printers, coded by hand in HTML, CSS and JavaScript, and rolled out to 500+ products with an Excel template that generates the code in bulk.',
    es: 'Un nuevo diseño de especificaciones para impresoras, programado a mano en HTML, CSS y JavaScript, y aplicado a más de 500 productos con una plantilla de Excel que genera el código en masa.',
  },
  tags: ['HTML', 'CSS', 'JavaScript', 'UX'],
  cover: { src: '/images/printer-after.webp', width: 508, height: 510 },
  body: [
    p(
      'I implemented a new specifications section for the printer pages. The goal was to **keep the retro style of the website** while adding more information, better organised, with cross-sell links to cables and a popup with extra specifications.',
      'Implementé una nueva sección de especificaciones para las fichas de impresoras. El objetivo era **mantener el estilo retro de la web** añadiendo más información, mejor organizada, con enlaces de venta cruzada a cables y un popup con especificaciones extra.'
    ),
    plus(
      'This was my first contact with code, before AI tools: everything was learnt the old way, searching, reading and testing.',
      'Fue mi primer contacto con el código, antes de la IA: todo fue búsqueda y aprendizaje a la antigua, buscando, leyendo y probando.'
    ),
    {
      type: 'kpis',
      items: [
        { value: '500+', label: { en: 'printer pages updated', es: 'fichas de impresoras actualizadas' } },
        { value: '1', label: { en: 'Excel template to generate the code in bulk', es: 'plantilla de Excel para generar el código en masa' } },
      ],
    },
    {
      type: 'steps',
      items: [
        {
          title: { en: 'The previous design', es: 'El diseño anterior' },
          summary: { en: 'A dense block of text with a plain list of features.', es: 'Un bloque de texto denso con una lista simple de características.' },
          blocks: [img('printer-before', { en: 'Previous printer page design with dense text', es: 'Diseño anterior de la ficha con texto denso' }, { en: 'Before: everything in one long block.', es: 'Antes: todo en un bloque largo.' }, { narrow: true })],
        },
        {
          title: { en: 'The new design', es: 'El nuevo diseño' },
          summary: { en: 'Usage badges, a short summary, key specs with icons and a cable cross-sell.', es: 'Etiquetas de uso, un resumen corto, especificaciones clave con iconos y venta cruzada de cables.' },
          blocks: [
            p(
              'The new layout puts the essentials first: who the printer is for (home, small office…), a two-line summary, the key specs with icons and a “Buy cable” button, because the USB cable is not included.',
              'El nuevo diseño pone primero lo esencial: para quién es la impresora (hogar, oficina pequeña…), un resumen de dos líneas, las especificaciones clave con iconos y un botón de “Comprar cable”, porque el cable USB no viene incluido.'
            ),
            img('printer-after', { en: 'New printer page design for the Canon Pixma TS705a', es: 'Nuevo diseño de ficha para la Canon Pixma TS705a' }, { en: 'After: scannable, with cross-sell built in.', es: 'Después: fácil de escanear y con venta cruzada integrada.' }, { narrow: true }),
          ],
        },
        {
          title: { en: 'The specifications popup', es: 'El popup de especificaciones' },
          summary: { en: '“Other specifications” opens a popup, so the page stays short.', es: '“Otras especificaciones” abre un popup, para que la ficha siga siendo corta.' },
          blocks: [img('printer-popup', { en: 'Popup with other specifications: paper tray, formats, compatibility and dimensions', es: 'Popup con otras especificaciones: bandeja, formatos, compatibilidad y dimensiones' }, { en: 'Secondary specs, one click away.', es: 'Especificaciones secundarias, a un clic.' })],
        },
        {
          title: { en: 'Rolling it out to 500+ printers', es: 'Aplicarlo a más de 500 impresoras' },
          summary: { en: 'An Excel template that generates each product’s code from its data.', es: 'Una plantilla de Excel que genera el código de cada producto a partir de sus datos.' },
          blocks: [
            p(
              'Later, the design was added to all printers (more than 500 references). To make that possible, I created an Excel template that builds the HTML code of each page in bulk from the product data, which made the job much faster.',
              'Posteriormente se incluyó en todas las impresoras (más de 500 referencias). Para hacerlo posible, creé una plantilla en Excel que construye en masa el código HTML de cada ficha a partir de los datos del producto, facilitando mucho el trabajo.'
            ),
          ],
        },
      ],
    },
    link('https://www.cartucho.es/articulos-de-oficina/impresora/impresora-tinta-a4-wifi/canon-pixma-ts705a-impresora-de-tinta.htm', 'See it live', 'Verlo en vivo'),
  ],
};

export const tuhogartech = {
  slug: 'tuhogartech',
  kind: 'page',
  areas: ['seo', 'web'],
  org: { en: 'Personal project', es: 'Proyecto personal' },
  title: { en: 'Tu Hogar Tech: an affiliate site built for SEO', es: 'Tu Hogar Tech: una web de afiliados construida para SEO' },
  summary: {
    en: 'My own Amazon affiliate project: a Next.js website with a Supabase database, 400+ SEO-optimised pages, a private admin area and a keyword strategy built on search intent.',
    es: 'Mi propio proyecto de afiliados de Amazon: una web en Next.js con base de datos Supabase, más de 400 páginas optimizadas para SEO, un área de administración privada y una estrategia de keywords basada en intención de búsqueda.',
  },
  tags: ['SEO & GEO', 'Next.js', 'Supabase', 'Affiliate marketing'],
  cover: { src: '/images/tuhogartech-og.webp', width: 1200, height: 630 },
  body: [
    p(
      'Tu Hogar Tech (“technology for the home, without inflated numbers”) is my own Amazon affiliate marketing project. I created the website, uploaded it and got it into search engines, created the content, did the SEO of more than 400 pages and blog posts, set up a Supabase database with storage, added Google Analytics and keep improving it to attract conversions.',
      'Tu Hogar Tech (“tecnología para casa, sin cifras infladas”) es mi propio proyecto de marketing de afiliados de Amazon. Creé la web, la subí y la di de alta en buscadores, creé el contenido, hice el SEO de más de 400 páginas y blogs, monté una base de datos en Supabase con storage, añadí Google Analytics y la sigo mejorando para atraer conversiones.'
    ),
    img('tuhogartech-og', { en: 'Tu Hogar Tech share image: Technology for the home, without inflated numbers', es: 'Imagen para compartir de Tu Hogar Tech: Tecnología para casa, sin cifras infladas' }, { en: 'The site’s OG image.', es: 'La imagen OG de la web.' }),
    plus(
      'For Next.js and security, to fill the knowledge gaps and move the project forward faster, I used Claude for assistance and for fixing complex bugs. The rest is mine. The content is mostly written by Claude, and I review and edit it over time. For legal reasons, the images are for now custom SVGs per category, also created with AI.',
      'Para la gestión de Next.js y la seguridad, para completar el conocimiento que me falta y avanzar el proyecto más ágilmente, usé Claude como asistencia y para corregir bugs complejos. El resto es mío. El contenido está escrito en su mayoría por Claude, y yo lo reviso y edito con el tiempo. Las imágenes, por motivos legales, son por ahora SVGs personalizados por categoría, también creados con IA.',
      { en: 'How AI was used', es: 'Cómo se ha usado la IA' }
    ),
    {
      type: 'kpis',
      items: [
        { value: '400+', label: { en: 'SEO-optimised pages', es: 'páginas optimizadas para SEO' } },
        { value: '2,000', label: { en: 'monthly impressions', es: 'impresiones mensuales' } },
        { value: '100+', label: { en: 'clicks in the last month', es: 'clics en el último mes' } },
        { value: '2', label: { en: 'blog posts per week', es: 'blogs a la semana' } },
      ],
    },
    {
      type: 'steps',
      items: [
        {
          title: { en: 'Building the website', es: 'Creación de la web' },
          summary: { en: 'Next.js, React, Supabase, an admin area and dynamic category and product pages.', es: 'Next.js, React, Supabase, un área de administración y páginas dinámicas de categoría y producto.' },
          blocks: [
            list([
              { en: 'Web architecture with Next.js, React, JavaScript, CSS and HTML, edited in VS Code. My own design.', es: 'Arquitectura web con Next.js, React, JavaScript, CSS y HTML, editada en VS Code. Diseño propio.' },
              { en: 'Error handling.', es: 'Gestión de errores.' },
              { en: 'Supabase as the SQL database, with optimised endpoints.', es: 'Supabase como base de datos SQL, con endpoints optimizados.' },
              { en: 'A private admin page to edit and add content and see basic statistics.', es: 'Una página de administración privada para editar y añadir contenidos y ver estadísticas básicas.' },
              { en: 'Google Analytics tracking across the whole site.', es: 'Lectores de Google Analytics en toda la web.' },
              { en: 'Pagination, and dynamic product and category pages.', es: 'Paginación y páginas de producto y categoría dinámicas.' },
              { en: 'An HTML editor to write the blog posts.', es: 'Un editor de HTML para escribir los blogs.' },
              { en: 'Search against the database.', es: 'Opción de buscar en la base de datos.' },
            ]),
          ],
        },
        {
          title: { en: 'SEO and GEO', es: 'SEO y GEO' },
          summary: { en: 'Keyword strategy by intent, metadata everywhere, and visibility in search engines and AI.', es: 'Estrategia de keywords por intención, metadata en toda la web y visibilidad en buscadores e IA.' },
          blocks: [
            list([
              { en: 'Content optimised for search engines, metadata across the whole site and indexing of the pages that matter.', es: 'Contenido optimizado para buscadores, metadata en toda la web e indexación de las páginas deseadas.' },
              { en: 'Keyword strategy split by intent: informational, transactional or commercial.', es: 'Estrategia de keywords separadas por intención: informativa, transaccional o comercial.' },
              { en: 'Keyword Planner and Semrush to plan keywords.', es: 'Keyword Planner y Semrush para planificar las palabras clave.' },
              { en: 'Google extensions for SEO optimisation; Screaming Frog and Google Search Console to find errors.', es: 'Extensiones de Google para optimizar el SEO; Screaming Frog y Google Search Console para encontrar errores.' },
              { en: 'Search Console to track traffic, rankings (in search engines and AI) and search opportunities, and to appear in AI answers.', es: 'Search Console para averiguar tráfico, posicionamiento (en buscadores e IA) y oportunidades de búsqueda, y para aparecer en la IA.' },
            ]),
          ],
        },
        {
          title: { en: 'Results and next steps', es: 'Resultados y próximos pasos' },
          summary: { en: '2,000 monthly impressions and 100+ clicks, with a plan to keep growing authority.', es: '2.000 impresiones mensuales y más de 100 clics, con un plan para seguir ganando autoridad.' },
          blocks: [
            p(
              'The site reaches **2,000 impressions per month and more than 100 clicks in the last month**. I also analyse results and searches, write two blog posts a week and I am optimising the site for AI search.',
              'La web alcanza **2.000 impresiones mensuales y más de 100 clics en el último mes**. Además analizo resultados y búsquedas, escribo dos blogs a la semana y estoy optimizando la web para las búsquedas en IA.'
            ),
            plus('The website is only three months old.', 'La web tiene solo 3 meses.'),
            p(
              'The plan for the future: keep optimising keywords, focus on what Google is showing us to rank, slowly gain authority and keep adding products to the catalogue.',
              'La idea a futuro: seguir optimizando keywords, centrarse en lo que Google nos muestra para posicionarnos, ir ganando autoridad poco a poco y seguir añadiendo productos al catálogo.'
            ),
          ],
        },
      ],
    },
    link('https://tuhogartech.com/', 'Visit tuhogartech.com', 'Visitar tuhogartech.com'),
  ],
};

export const watchout = {
  slug: 'watchout-tours',
  kind: 'page',
  areas: ['web'],
  org: { en: 'Freelance', es: 'Freelance' },
  title: { en: 'Watchout Tours: an accessible, bilingual website', es: 'Watchout Tours: una web accesible y bilingüe' },
  summary: {
    en: 'A freelance website for a start-up tour company in New Zealand, for the Spanish and New Zealand markets: bilingual, fast, indexed and fully accessible to blind and low-vision users.',
    es: 'Una web freelance para la startup de un cliente de tours en Nueva Zelanda, para el mercado español y neozelandés: bilingüe, rápida, indexada y totalmente accesible para personas ciegas y con baja visión.',
  },
  tags: ['Web development', 'Accessibility', 'Multilingual SEO'],
  cover: { src: '/images/watchout-tours.webp', width: 1600, height: 712 },
  body: [
    p(
      'A website for a client’s start-up project, done as a freelancer, aimed at both the **Spanish and the New Zealand market**.',
      'Una web para el proyecto startup de un cliente, como freelance, dirigida al **mercado español y al neozelandés**.'
    ),
    img('watchout-tours', { en: 'Watchout Tours homepage with a geothermal landscape', es: 'Portada de Watchout Tours con un paisaje geotérmico' }),
    {
      type: 'steps',
      items: [
        {
          title: { en: 'Two markets, two languages', es: 'Dos mercados, dos idiomas' },
          summary: { en: 'Language switch and SEO for Spanish and English.', es: 'Cambio de idioma y SEO en español e inglés.' },
          blocks: [
            p(
              'The site has a language switch and SEO for both markets, with fast pages that are indexed in search engines.',
              'La web tiene cambio de idioma y SEO para los dos mercados, con páginas rápidas e indexadas en buscadores.'
            ),
          ],
        },
        {
          title: { en: 'Launch and infrastructure', es: 'Lanzamiento e infraestructura' },
          summary: { en: 'Cloud hosting, custom domains, Search Console and contact forms.', es: 'Hosting en la nube, dominios propios, Search Console y formularios de contacto.' },
          blocks: [
            list([
              { en: 'Experience deploying pages to the cloud and connecting their domains.', es: 'Experiencia subiendo páginas a la nube y conectando sus dominios.' },
              { en: 'Monitoring with Google Search Console.', es: 'Control con Google Search Console.' },
              { en: 'Contact forms, plus a modern design with accessible contact options.', es: 'Formularios de envío, además de un diseño moderno y un contacto accesible.' },
            ]),
          ],
        },
        {
          title: { en: 'Accessibility first', es: 'Accesibilidad primero' },
          summary: { en: 'Fully accessible, optimised for screen readers and tested with real users.', es: 'Totalmente accesible, optimizada para lector de pantalla y probada con usuarios reales.' },
          blocks: [
            p(
              'The website is fully accessible for blind users, optimised for screen readers and **tested with people with low vision and blindness**.',
              'La web es completamente accesible para personas ciegas, optimizada para lector de pantalla y **testeada con personas con baja visión y ceguera**.'
            ),
          ],
        },
      ],
    },
    link('https://www.watchouttours.nz/', 'Visit watchouttours.nz', 'Visitar watchouttours.nz'),
  ],
};
