import { p, list, link, plus } from './helpers.js';

export default {
  slug: '3d-printers',
  kind: 'page',
  areas: ['ecommerce', 'category'],
  org: '123tinta',
  title: { en: 'Launching the 3D printer category', es: 'Lanzamiento de la categoría de impresoras 3D' },
  summary: {
    en: 'From choosing suppliers to analysing results: how I built a new category that sold 50+ printers in its first month and pulled filament sales up by 11%.',
    es: 'Desde elegir proveedores hasta analizar resultados: cómo construí una categoría nueva que vendió más de 50 impresoras en su primer mes e impulsó las ventas de filamento un 11%.',
  },
  tags: ['Category management', 'Sourcing', 'Pricing', 'Product content'],
  metric: { value: '+50', label: { en: 'printers sold in month one', es: 'impresoras vendidas el primer mes' } },
  body: [
    p(
      '123tinta already sold 3D printing filament, but not the printers that use it. I was in charge of opening the 3D printer category end to end: finding the right suppliers, choosing which printers to list, creating every product page and measuring the result.',
      '123tinta ya vendía filamento para impresión 3D, pero no las impresoras que lo utilizan. Me encargué de abrir la categoría de impresoras 3D de principio a fin: encontrar los proveedores adecuados, elegir qué impresoras listar, crear cada ficha de producto y medir el resultado.'
    ),
    {
      type: 'kpis',
      items: [
        { value: '+50', label: { en: 'printers sold in the first month', es: 'impresoras vendidas el primer mes' } },
        { value: '+11%', label: { en: 'growth of the filament category in that same month', es: 'crecimiento de la categoría de filamentos ese mismo mes' } },
        { value: '4', label: { en: 'phases, owned end to end', es: 'fases, gestionadas de principio a fin' } },
      ],
    },
    {
      type: 'steps',
      items: [
        {
          title: { en: 'Supplier phase', es: 'Fase de proveedores' },
          summary: {
            en: 'Selecting suppliers based on availability, price and assortment.',
            es: 'Selección de proveedores en base a disponibilidad, precio y surtido.',
          },
          blocks: [
            p(
              'A new category only works if it can be kept in stock at a competitive price. I compared potential suppliers on three criteria:',
              'Una categoría nueva solo funciona si se puede mantener en stock a un precio competitivo. Comparé los posibles proveedores con tres criterios:'
            ),
            list([
              { en: '**Availability**: real stock and delivery times, so the category would not open with products we could not ship.', es: '**Disponibilidad**: stock real y plazos de entrega, para no abrir la categoría con productos que no pudiéramos enviar.' },
              { en: '**Price**: purchase cost and the margin it leaves against the market price.', es: '**Precio**: coste de compra y margen resultante frente al precio de mercado.' },
              { en: '**Assortment**: how many relevant models and brands each supplier could cover.', es: '**Surtido**: cuántos modelos y marcas relevantes podía cubrir cada proveedor.' },
            ]),
          ],
        },
        {
          title: { en: 'Product selection', es: 'Selección de productos' },
          summary: {
            en: 'Choosing which printers to list based on price, range and demand.',
            es: 'Elección de las impresoras a listar en base a precio, gama y demanda.',
          },
          blocks: [
            p(
              'Instead of listing everything the suppliers offered, I built a focused range: printers covering different price points and ranges (entry, mid and high), prioritising the models with real demand behind them.',
              'En lugar de listar todo lo que ofrecían los proveedores, construí una gama enfocada: impresoras de distintos precios y gamas (de entrada, media y alta), priorizando los modelos con demanda real detrás.'
            ),
          ],
        },
        {
          title: { en: 'Product creation', es: 'Creación de producto' },
          summary: {
            en: 'Descriptions, photos, videos, specifications, recommendations and price.',
            es: 'Descripciones, fotografías, vídeos, especificaciones, recomendaciones y precio.',
          },
          blocks: [
            p(
              'Each printer got a complete product page, built to answer the questions a buyer has before spending a few hundred euros:',
              'Cada impresora tuvo una ficha completa, pensada para responder a las dudas que tiene un comprador antes de gastarse unos cientos de euros:'
            ),
            list([
              { en: 'Descriptions written for the customer and for SEO.', es: 'Descripciones escritas para el cliente y para SEO.' },
              { en: 'Photos and videos of the product.', es: 'Fotografías y vídeos del producto.' },
              { en: 'Structured technical specifications.', es: 'Especificaciones técnicas estructuradas.' },
              { en: 'Recommendations: compatible filaments and accessories, to encourage cross-selling.', es: 'Recomendaciones: filamentos y accesorios compatibles, para impulsar la venta cruzada.' },
              { en: 'Competitive pricing.', es: 'Precio competitivo.' },
            ]),
          ],
        },
        {
          title: { en: 'Results analysis', es: 'Análisis de resultados' },
          summary: {
            en: 'A successful category: 50+ printers in the first month and +11% in filaments.',
            es: 'Una categoría exitosa: más de 50 impresoras el primer mes y +11% en filamentos.',
          },
          blocks: [
            p(
              'The category was a success, accumulating **more than 50 printers sold in its first month**. It also boosted the category we already had: **filament sales grew 11%** in that same first month, because every new printer owner needs material to print with.',
              'La categoría resultó un éxito, acumulando **más de 50 impresoras vendidas en el primer mes**. Además potenció la categoría que ya teníamos: **las ventas de filamento crecieron un 11%** ese mismo primer mes, porque cada nuevo dueño de una impresora necesita material para imprimir.'
            ),
          ],
        },
      ],
    },
    plus(
      'This project also appears under Category Manager: it combines sourcing, assortment, content and pricing decisions in one launch.',
      'Este proyecto también aparece en Category Manager: combina decisiones de aprovisionamiento, surtido, contenido y precio en un mismo lanzamiento.'
    ),
    link('https://www.123tinta.es/Filamento-3D/Impresoras-3D-p4037008.html', 'See the live category', 'Ver la categoría en vivo'),
  ],
};
