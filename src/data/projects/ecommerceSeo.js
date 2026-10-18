import { p, h, list } from './helpers.js';

export default {
  slug: 'ecommerce-seo',
  kind: 'page',
  areas: ['ecommerce', 'seo'],
  org: '123tinta.es',
  title: { en: 'SEO in ecommerce: the V16 beacon decision', es: 'SEO en ecommerce: la decisión de la baliza V16' },
  summary: {
    en: 'Product and group-level SEO for a 20k-SKU store, and the real case of a risky URL rename that ended in +113% sales month on month.',
    es: 'SEO a nivel de producto y grupo para una tienda de 20k SKUs, y el caso real de un cambio de URL arriesgado que terminó en +113% de ventas mes a mes.',
  },
  cover: { src: '/images/123tinta-cover.webp', width: 800, height: 500, contain: true },
  tools: { en: 'Google Search Console and Google Keyword Planner.', es: 'Google Search Console y Google Keyword Planner.' },
  body: [
    p(
      'At 123tinta.es I handle SEO at product and group level for the store’s pages, and I am the person other teams come to with SEO questions when web or product pages change.',
      'En 123tinta.es me encargo del SEO a nivel de producto y de grupo para las páginas de la tienda, y soy la persona a la que acuden otros equipos con dudas de SEO cuando se editan páginas de la web o de producto.'
    ),
    {
      type: 'columns',
      items: [
        {
          title: { en: 'Day-to-day SEO', es: 'SEO del día a día' },
          blocks: [
            list([
              { en: 'Meta titles and descriptions for product groups.', es: 'Metas (títulos y descripciones) de los grupos de producto.' },
              { en: 'Keyword research and mapping.', es: 'Investigación y asignación de keywords.' },
              { en: 'Landing pages.', es: 'Landings.' },
              { en: 'Support on blog content.', es: 'Asistencia en el contenido de blogs.' },
            ]),
          ],
        },
        {
          title: { en: 'SEO consulting inside the company', es: 'Consultoría SEO dentro de la empresa' },
          blocks: [
            list([
              { en: 'Advice on web and product edits.', es: 'Asesoramiento en ediciones web y de producto.' },
              { en: 'Google Search Console and Keyword Planner to choose names when groups and URLs change.', es: 'Google Search Console y Keyword Planner para elegir nombres cuando cambian grupos y URLs.' },
            ]),
          ],
        },
      ],
    },
    h('Real case: the V16 beacon', 'Caso real: la baliza V16'),
    list([
      { en: '+113% sales over the previous month.', es: '+113% de ventas sobre el mes anterior.' },
      { en: 'More than 300 extra units sold.', es: 'Más de 300 unidades más vendidas.' },
    ]),
    {
      type: 'steps',
      items: [
        {
          title: { en: 'The context', es: 'El contexto' },
          summary: {
            en: 'A product group with an established URL, and a law about to change demand.',
            es: 'Un grupo de producto con una URL ya posicionada y una ley a punto de cambiar la demanda.',
          },
          blocks: [
            p(
              'In September 2025 this product group had a different name. From January 2026 the V16 beacon became mandatory in cars in Spain, so we expected a big rise in sales in the following months.',
              'En septiembre de 2025 teníamos este grupo de producto con un nombre diferente. En enero de 2026 la baliza V16 pasaba a ser obligatoria en los coches en España, por lo que se preveía una gran subida de ventas en los meses siguientes.'
            ),
          ],
        },
        {
          title: { en: 'The research', es: 'La investigación' },
          summary: {
            en: '“Baliza V16” had far more volume and matched search intent much better.',
            es: '“Baliza V16” tenía mucho más volumen y cubría mucho mejor la intención de búsqueda.',
          },
          blocks: [
            p(
              'I was asked for an SEO opinion on renaming the group. According to Keyword Planner, the “baliza V16” option had a much higher search volume and covered the search intent far better than the current name.',
              'Me hicieron una consulta de SEO para cambiar el nombre del grupo. Según Keyword Planner, la opción “baliza V16” tenía un volumen muy superior y cubría mucho mejor la intención de búsqueda que el nombre actual.'
            ),
          ],
        },
        {
          title: { en: 'The dilemma', es: 'El dilema' },
          summary: {
            en: 'Keep a stable, ranked URL, or rename for more potential and risk losing the peak?',
            es: '¿Mantener una URL estable y posicionada, o cambiarla por más potencial y arriesgarse a perder el pico?',
          },
          blocks: [
            p('I had two options:', 'Tenía dos opciones:'),
            list([
              { en: '**Play it safe**: Search Console showed that the old URL already ranked in a stable position. Keep position and URL, no risk.', es: '**Ir a lo seguro**: Search Console mostraba que con la URL anterior ya estábamos posicionados de forma estable. Mantener posición y URL, sin riesgos.' },
              { en: '**Go for potential**: change the URL and group name to the option with more potential, knowing that if it did not rank in time, we would lose sales right at the demand peak.', es: '**Ir a por el potencial**: cambiar la URL y el nombre del grupo a la opción con más potencial, sabiendo que si no posicionábamos a tiempo perderíamos ventas justo en el pico de demanda.' },
            ]),
          ],
        },
        {
          title: { en: 'Decision and result', es: 'Decisión y resultado' },
          summary: {
            en: 'We switched to V16. A complete success: +113% sales month on month, 300+ more units.',
            es: 'Cambiamos a V16. Un éxito total: +113% de ventas mes a mes, más de 300 unidades más.',
          },
          blocks: [
            p(
              'In the end we switched to “V16” and it was a complete success: +113% sales over the previous month, more than 300 extra units.',
              'Al final cambiamos a “V16” y fue un completo éxito: +113% de ventas sobre el mes anterior, más de 300 unidades más.'
            ),
          ],
        },
      ],
    },
  ],
};
