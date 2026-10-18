import { p, list, img, plus, alert, link } from './helpers.js';

// Set this to the public URL of the SupplyForge demo shop to show a "visit" button.
export const SUPPLYFORGE_URL = 'https://supplyforge.netlify.app/';

const sql1 = `select w.code as almacen,
       count(*) as productos,
       sum(s.quantity) as unidades,
       round(sum(s.quantity * p.price_ex_vat), 2) as valor_stock_eur
from stock s
join warehouses w on w.id = s.warehouse_id
join products p on p.id = s.product_id
group by w.code
order by valor_stock_eur desc;`;

const sql2 = `select p.sku, p.name, p.category, w.code as almacen,
       s.quantity, s.reserved,
       s.quantity - s.reserved as disponible,
       s.reorder_point, s.restock_date, p.price_ex_vat
from stock s
join products p on p.id = s.product_id
join warehouses w on w.id = s.warehouse_id
where p.unavailable = false
  and p.category in ('fasteners', 'anchors')
order by p.sku, almacen;`;

const sql3 = `select p.sku,
       sum(sa.units_sold - sa.units_returned) as unidades_netas_90d,
       round(sum(sa.revenue_ex_vat - sa.refunds_ex_vat), 2) as ingresos_netos_90d
from sales sa
join products p on p.id = sa.product_id
where sa.sale_date between date '2026-07-13' and date '2026-10-10'
  and p.category in ('fasteners', 'anchors')
group by p.sku;`;

const sql4 = `select date_trunc('month', sa.sale_date)::date as mes,
       p.category,
       sa.channel,
       sum(sa.units_sold - sa.units_returned) as unidades,
       round(sum(sa.revenue_ex_vat - sa.refunds_ex_vat), 2) as ingresos_netos
from sales sa
join products p on p.id = sa.product_id
group by 1, 2, 3
order by 1, 2, 3;`;

const sql5 = `select date_trunc('month', created_at)::date as mes, mode,
       count(*) as pedidos,
       round(avg(total), 2) as ticket_medio,
       round(sum(total), 2) as facturacion
from orders
group by 1, 2
order by 1, 2;`;

const sql6 = `select p.category,
       sum(sa.units_sold) as unidades_vendidas,
       sum(sa.units_returned) as unidades_devueltas,
       round(100.0 * sum(sa.units_returned)
             / nullif(sum(sa.units_sold), 0), 2) as tasa_devolucion_pct
from sales sa
join products p on p.id = sa.product_id
group by p.category
order by tasa_devolucion_pct desc;`;

const mStock = `// stock_actual: one row per product, with sales, supplier and reorder logic
#"agrupar por sku, cat y name" = Table.Group(#"cambiar nombre columna sku2",
    {"Stock_por_SKU", "name", "category", "price_ex_vat"},
    {{"Disponible", each List.Sum([disponible]), type nullable number}}),

#"combinar con ventas 90dias" = Table.NestedJoin(#"agrupar por sku, cat y name",
    {"Stock_por_SKU"}, ventas_90d, {"sku"}, "ventas_90d", JoinKind.LeftOuter),

#"cominar con proveedores" = Table.NestedJoin(#"Se expandió ventas_90d",
    {"category"}, Proveedores, {"categoria"}, "Proveedores", JoinKind.LeftOuter),

#"crear columna ventas diarias" = Table.AddColumn(..., "ventas_diarias",
    each [unidades_netas_90d] / 90),
#"reemplazar null por 0 en ventas" = Table.ReplaceValue(..., null, 0,
    Replacer.ReplaceValue, {"unidades_netas_90d"}),
#"crear cplumna cobertura" = Table.AddColumn(..., "dias_cobertura",
    each [Disponible] / [ventas_diarias]),
#"crear columna stock" = Table.AddColumn(..., "stock_objetivo",
    each [ventas_diarias] * ([plazo_dias] + 30)),
#"crear columna uds a pedir" = Table.AddColumn(..., "unidades_a_pedir",
    each Number.RoundUp(List.Max({0, [stock_objetivo] - [Disponible]}))),
#"crear columna coste pedido" = Table.AddColumn(..., "coste_pedido",
    each [unidades_a_pedir] * [coste_pct] * [price_ex_vat]),

#"crear columna estado" = Table.AddColumn(..., "estado", each
    if [Disponible] = 0 then "ROTO"                                  // out of stock
    else if [unidades_netas_90d] = 0 then "STOCK MUERTO"             // dead stock
    else if [dias_cobertura] < ([plazo_dias] + 30) then "PEDIR YA"   // reorder now
    else if [dias_cobertura] > 180 then "SOBRESTOCK"                 // overstock
    else "OK"),

#"Personalizada agregada" = Table.AddColumn(..., "valor_stock",
    each [Disponible] * [price_ex_vat] * [coste_pct])                 // at purchase cost`;

const mRisk = `// riesgo_almacen: % of products below the reorder point, per warehouse
#"crear columna bajo minimo" = Table.AddColumn(#"Tipo cambiado", "bajo_minimo",
    each if [disponible] < [reorder_point] then 1 else 0),
#"Filas agrupadas" = Table.Group(#"crear columna bajo minimo", {"almacen"}, {
    {"productos", each Table.RowCount(Table.Distinct(_)), Int64.Type},
    {"bajo_minimo", each List.Sum([bajo_minimo]), type number}}),
#"Personalizada agregada" = Table.AddColumn(#"Filas agrupadas", "pct_bajo_minimo",
    each [bajo_minimo] / [productos])`;

const xlFormulas = `// Dead stock value and its share of total stock value ("2.stock muerto")
=SUMIFS(stock_actual!Q:Q, stock_actual!P:P, "STOCK MUERTO")
=SUM(stock_actual!Q:Q)
=A2/B2

// ABC classification ("4. crear abc"), rows sorted by 90-day revenue
E2: =SUM($D$2:D2)            // cumulative revenue
F2: =E2/$J$1                 // cumulative %, J1 = SUM(D:D)
G2: =IFS(F2<0.8, "Clase A", F2<0.95, "Clase B", F2>=0.95, "Clase C")

// SKU lookup on the dashboard (B18 = SKU typed by the user)
=XLOOKUP(B18, stock_actual!A:A, stock_actual!E:E, "Insertar SKU válido", 0)   // stock
=XLOOKUP(B18, stock_actual!A:A, stock_actual!L:L, "Ingresar SKU válido", 0)   // days of cover
=XLOOKUP(B18, stock_actual!A:A, stock_actual!P:P, "Ingresar SKU válido", 0)   // status`;

const pqSteps = [
  ['Origen', 'Source: reads stock_actual.csv (UTF-8 encoding).', 'Origen: lee stock_actual.csv (codificación UTF-8).'],
  ['Encabezados promovidos', 'Promote the first row to column headers.', 'Convierte la primera fila en encabezados.'],
  ['Tipo cambiado', 'Explicit types: text, whole number, currency and date.', 'Tipos explícitos: texto, número entero, moneda y fecha.'],
  ['duplicar columna sku / cambiar nombre', 'Duplicate the SKU column and rename it Stock_por_SKU.', 'Duplica la columna SKU y la renombra a Stock_por_SKU.'],
  ['agrupar por sku, cat y name', 'Group by SKU, name, category and price, summing available units across the 5 warehouses: one row per product.', 'Agrupa por SKU, nombre, categoría y precio sumando las unidades disponibles de los 5 almacenes: una fila por producto.'],
  ['combinar con ventas 90dias', 'Left outer join with ventas_90d on SKU, keeping products with no sales.', 'Combinación externa izquierda con ventas_90d por SKU, conservando los productos sin ventas.'],
  ['combinar con proveedores', 'Left outer join with the Purchasing file on category: supplier, lead time and cost %.', 'Combinación externa izquierda con el archivo de Compras por categoría: proveedor, plazo y % de coste.'],
  ['ventas diarias', 'Daily sales = net units in 90 days / 90.', 'Ventas diarias = unidades netas en 90 días / 90.'],
  ['reemplazar null por 0', 'A product with no sales counts as 0.', 'Un producto sin ventas cuenta como 0.'],
  ['cobertura', 'Days of cover = available units / daily sales.', 'Días de cobertura = unidades disponibles / ventas diarias.'],
  ['stock objetivo', 'Target stock = daily sales × (supplier lead time + 30 campaign days).', 'Stock objetivo = ventas diarias × (plazo del proveedor + 30 días de campaña).'],
  ['uds a pedir', 'Units to order = round up (max(0, target − available)).', 'Unidades a pedir = redondeo al alza (máx(0, objetivo − disponible)).'],
  ['coste pedido', 'Order cost = units to order × cost % × price.', 'Coste del pedido = unidades a pedir × % de coste × precio.'],
  ['estado', 'Status, checked in order: Out of stock → Dead stock → Reorder now → Overstock (>180 days) → OK.', 'Estado, evaluado en orden: Roto → Stock muerto → Pedir ya → Sobrestock (>180 días) → OK.'],
  ['valor_stock', 'Stock value = available × price × cost %, always at purchase cost.', 'Valor de stock = disponible × precio × % de coste, siempre a coste de compra.'],
  ['ordenar / sustituir null', 'Sort by 90-day revenue (ready for ABC) and replace empty revenue with 0.', 'Ordena por ingresos de 90 días (listo para el ABC) y sustituye los ingresos vacíos por 0.'],
];

export default {
  slug: 'supplyforge',
  kind: 'page',
  areas: ['ecommerce', 'data'],
  org: { en: 'Personal project', es: 'Proyecto personal' },
  title: { en: 'SupplyForge: from database to stock dashboard', es: 'SupplyForge: de la base de datos al dashboard de stock' },
  summary: {
    en: 'An end-to-end analysis for a fasteners store with 5 warehouses: SQL extraction from Supabase, data preparation in Power Query and an Excel dashboard that answers what to reorder, what is not selling and which warehouse is at risk.',
    es: 'Un análisis de principio a fin para una tienda de tornillería con 5 almacenes: extracción SQL desde Supabase, preparación en Power Query y un dashboard en Excel que responde qué reponer, qué no se vende y qué almacén está en riesgo.',
  },
  tags: ['SQL', 'Supabase', 'Power Query', 'Excel dashboard'],
  cover: { src: '/images/sf-dashboard.webp', width: 1600, height: 406 },
  body: [
    p(
      '**SupplyForge** is a project I built to practise and to show a realistic analysis in my portfolio. It has two parts: an ecommerce website for fasteners and tools (the website itself is not the important part) and a database full of fake but realistic data, which is what the exercise below is built on.',
      '**SupplyForge** es un proyecto que construí para practicar y mostrar un análisis realista en el portfolio. Tiene dos partes: una web de ecommerce de tornillería y herramientas (la web en sí no es lo importante) y una base de datos con datos falsos pero realistas, sobre la que se construye el ejercicio de abajo.'
    ),
    plus(
      'All the data and the website are fake. The site was created to give credibility to the portfolio project and to show the important elements of an ecommerce website: product recommendations, asking for an account after the cart so the customer does not abandon, product families on the product page to jump quickly to other sizes and colours, categorisation, offers and discounts, search and filters, the brand’s strengths highlighted, and a retailer/B2B option with a tool to add a list of products from Excel or quickly by hand.',
      'Todos los datos y la web son falsos. La web se creó para dar credibilidad al proyecto del portfolio y mostrar los elementos importantes al crear un ecommerce: recomendaciones, pedir la cuenta después del carrito para que el cliente no abandone, familias de producto en la ficha para moverse rápido a otros tamaños y colores, categorización, ofertas y descuentos, buscador y filtros, ventajas y puntos fuertes de la marca resaltados y opción para retailers o B2B con herramienta para añadir un listado desde Excel o de forma rápida.',
      { en: 'Ecommerce strategy behind the site', es: 'Estrategia de ecommerce detrás de la web' }
    ),
    link(SUPPLYFORGE_URL, 'Visit the SupplyForge website', 'Visitar la web de SupplyForge'),
    { type: 'h', text: { en: 'The brief', es: 'El encargo' } },
    p(
      'SupplyForge sells fasteners and tools online from **5 warehouses in Spain** (Madrid, Barcelona, Valencia, Seville and Bilbao). Before the November B2B campaign, the Head of Operations needs an Excel workbook for Monday’s meeting that answers three questions:',
      'SupplyForge vende tornillería y herramientas online desde **5 almacenes en España** (Madrid, Barcelona, Valencia, Sevilla y Bilbao). Antes de la campaña B2B de noviembre, el Head of Operations necesita un Excel para la reunión del lunes que responda a tres preguntas:'
    ),
    {
      type: 'questions',
      items: [
        { en: 'Which products must be reordered now, how many units, and what will the order cost?', es: '¿Qué productos hay que reponer ya, cuántas unidades y cuánto costará el pedido?' },
        { en: 'How much money is tied up in stock that is not selling?', es: '¿Cuánto dinero hay inmovilizado en stock que no se vende?' },
        { en: 'Which warehouse is in the worst stock position?', es: '¿Qué almacén está en peor situación de stock?' },
      ],
    },
    p(
      '**Scope**: categories fasteners and anchors, excluding products flagged as unavailable. **Sources**: the Supabase database behind the website (tables products, warehouses, stock, sales and orders, with sales from 11 Oct 2025 to 10 Oct 2026) and a supplier file from Purchasing with lead time and purchase cost per category.',
      '**Alcance**: categorías fasteners y anchors, excluyendo los productos marcados como no disponibles. **Fuentes**: la base de datos Supabase de la web (tablas products, warehouses, stock, sales y orders, con ventas del 11 oct 2025 al 10 oct 2026) y un archivo de Compras con el plazo y el coste de compra por categoría.'
    ),
    {
      type: 'table',
      caption: { en: 'Definitions to follow', es: 'Definiciones a seguir' },
      head: [{ en: 'Term', es: 'Término' }, { en: 'Definition', es: 'Definición' }],
      rows: [
        [{ en: 'Available', es: 'Disponible' }, { en: 'Units in stock minus reserved units', es: 'Unidades en stock menos unidades reservadas' }],
        [{ en: 'Recent sales', es: 'Ventas recientes' }, { en: 'Units sold minus units returned in the last 90 days', es: 'Unidades vendidas menos devueltas en los últimos 90 días' }],
        [{ en: 'Target stock', es: 'Stock objetivo' }, { en: 'What sells during the supplier lead time plus 30 days of campaign', es: 'Lo que se vende durante el plazo del proveedor más 30 días de campaña' }],
        [{ en: 'Below minimum', es: 'Bajo mínimo' }, { en: 'Available below the warehouse reorder point', es: 'Disponible por debajo del punto de pedido del almacén' }],
        [{ en: 'Stock value', es: 'Valor de stock' }, { en: 'Always at purchase cost, not at selling price', es: 'Siempre a coste de compra, no a precio de venta' }],
      ],
    },
    alert(
      'Most of the working files (SQL aliases, Power Query steps, sheet names) are in Spanish, while the final dashboard and the instructions are in English. Everything is explained in English on this page. Also, to be transparent: my SQL level is basic, so for the code I looked up some keywords on Google.',
      'La mayoría de archivos de trabajo (alias SQL, pasos de Power Query, nombres de hojas) están en español, mientras que el dashboard final y las instrucciones están en inglés. Todo está explicado en esta página. Además, para ser transparente: mi nivel de SQL es básico, así que para el código busqué ayuda en Google con algunas keywords.'
    ),
    {
      type: 'steps',
      items: [
        {
          title: { en: 'SQL: extraction from Supabase', es: 'SQL: extracción desde Supabase' },
          summary: {
            en: 'Six PostgreSQL queries; four exported to CSV, two used as checks.',
            es: 'Seis consultas PostgreSQL; cuatro exportadas a CSV y dos usadas como comprobación.',
          },
          blocks: [
            p(
              'The data lives in a PostgreSQL database on Supabase with five tables: `products`, `warehouses`, `stock` (one row per product and warehouse), `sales` (daily sales and returns) and `orders`. I wrote six queries in the Supabase SQL editor and exported the ones the analysis needs to CSV.',
              'Los datos están en una base de datos PostgreSQL en Supabase con cinco tablas: `products`, `warehouses`, `stock` (una fila por producto y almacén), `sales` (ventas y devoluciones diarias) y `orders`. Escribí seis consultas en el editor SQL de Supabase y exporté a CSV las que necesita el análisis.'
            ),
            {
              type: 'code', lang: 'sql',
              title: { en: '1 · Stock value by warehouse (query only)', es: '1 · Valor de stock por almacén (solo consulta)' },
              code: sql1,
              note: {
                en: 'Joins stock with warehouses and products and aggregates per warehouse. A quick first look at the size of each warehouse: Madrid holds the most value. This sense check uses selling price; the final stock value in Power Query is calculated at purchase cost, as the brief requires.',
                es: 'Une stock con almacenes y productos y agrega por almacén. Un primer vistazo al tamaño de cada almacén: Madrid concentra más valor. Esta comprobación usa precio de venta; el valor de stock final en Power Query se calcula a coste de compra, como pide el encargo.',
              },
            },
            img('sf-sql-1', { en: 'Query 1 result: five warehouses with products, units and stock value', es: 'Resultado de la consulta 1: cinco almacenes con productos, unidades y valor' }, { en: 'Result in Supabase: MAD, SVQ, VLC, BCN and BIO.', es: 'Resultado en Supabase: MAD, SVQ, VLC, BCN y BIO.' }, { narrow: true }),
            {
              type: 'code', lang: 'sql',
              title: { en: '2 · Current stock by product and warehouse → stock_actual.csv', es: '2 · Stock actual por producto y almacén → stock_actual.csv' },
              code: sql2,
              note: {
                en: 'Applies the scope (fasteners and anchors, excluding unavailable products) and calculates available units as quantity − reserved. Keeps one row per product and warehouse with its reorder point: 12,425 rows.',
                es: 'Aplica el alcance (fasteners y anchors, excluyendo no disponibles) y calcula el disponible como cantidad − reservado. Mantiene una fila por producto y almacén con su punto de pedido: 12.425 filas.',
              },
            },
            img('sf-sql-2', { en: 'Query 2 result: stock rows per product and warehouse', es: 'Resultado de la consulta 2: filas de stock por producto y almacén' }, { en: 'Result: 12,425 rows, one per product and warehouse.', es: 'Resultado: 12.425 filas, una por producto y almacén.' }),
            {
              type: 'code', lang: 'sql',
              title: { en: '3 · Net sales, last 90 days → ventas_90d.csv', es: '3 · Ventas netas de los últimos 90 días → ventas_90d.csv' },
              code: sql3,
              note: {
                en: 'Net units (sold − returned) and net revenue (revenue − refunds, ex VAT) per SKU, for the 90 days up to the last sales date (13 Jul – 10 Oct 2026): 5,081 SKUs with sales.',
                es: 'Unidades netas (vendidas − devueltas) e ingresos netos (ingresos − reembolsos, sin IVA) por SKU en los 90 días hasta la última fecha de ventas (13 jul – 10 oct 2026): 5.081 SKUs con ventas.',
              },
            },
            img('sf-sql-3', { en: 'Query 3 result: net units and revenue per SKU in 90 days', es: 'Resultado de la consulta 3: unidades e ingresos netos por SKU en 90 días' }, { en: 'Result: 5,081 SKUs with sales in the period.', es: 'Resultado: 5.081 SKUs con ventas en el periodo.' }, { narrow: true }),
            {
              type: 'code', lang: 'sql',
              title: { en: '4 · Net revenue by month and category → ventas_mensuales.csv', es: '4 · Ingresos netos por mes y categoría → ventas_mensuales.csv' },
              code: sql4,
              note: {
                en: 'Truncates each sale to its month and groups by month, category and sales channel (B2B, web, marketplace). This feeds the trend chart.',
                es: 'Trunca cada venta a su mes y agrupa por mes, categoría y canal (B2B, web, marketplace). Alimenta el gráfico de tendencia.',
              },
            },
            {
              type: 'code', lang: 'sql',
              title: { en: '5 · Orders by month and customer type → pedidos_mensuales.csv', es: '5 · Pedidos por mes y tipo de cliente → pedidos_mensuales.csv' },
              code: sql5,
              note: {
                en: 'Order count, average order value and turnover per month for business (biz) and DIY customers. B2B orders are about 9× bigger on average.',
                es: 'Número de pedidos, ticket medio y facturación por mes para clientes profesionales (biz) y particulares (diy). El ticket medio B2B es unas 9 veces mayor.',
              },
            },
            img('sf-sql-5', { en: 'Query 5 result: orders, average ticket and turnover by month and mode', es: 'Resultado de la consulta 5: pedidos, ticket medio y facturación por mes y tipo' }, { en: 'Result: 26 rows (13 months × 2 customer types).', es: 'Resultado: 26 filas (13 meses × 2 tipos de cliente).' }, { narrow: true }),
            {
              type: 'code', lang: 'sql',
              title: { en: '6 · Return rate by category (query only)', es: '6 · Tasa de devolución por categoría (solo consulta)' },
              code: sql6,
              note: {
                en: '`nullif` avoids a division by zero if a category had no sales.',
                es: '`nullif` evita una división por cero si una categoría no tuviera ventas.',
              },
            },
          ],
        },
        {
          title: { en: 'Power Query: preparing the data', es: 'Power Query: preparación de los datos' },
          summary: {
            en: 'Import with the right types, one row per product, add sales and suppliers, calculate reorder logic and status.',
            es: 'Importar con los tipos correctos, una fila por producto, añadir ventas y proveedores, calcular la lógica de reposición y el estado.',
          },
          blocks: [
            p(
              'The four CSV files plus the supplier workbook are imported into Power Query. Every column gets an explicit data type, paying attention to the decimal separator: the CSVs use a dot, while a Spanish Excel expects a comma, so prices could easily be misread.',
              'Los cuatro CSV y el Excel de proveedores se importan en Power Query. Cada columna recibe un tipo de datos explícito, prestando atención al separador decimal: los CSV usan punto y un Excel en español espera coma, así que los precios se podían leer mal fácilmente.'
            ),
            img('sf-csv-files', { en: 'The four exported CSV files', es: 'Los cuatro CSV exportados' }, { en: 'The four exports from Supabase.', es: 'Los cuatro exports de Supabase.' }),
            img('sf-pq-suppliers', { en: 'Supplier table in Power Query with lead times and cost percentages', es: 'Tabla de proveedores en Power Query con plazos y porcentajes de coste' }, { en: 'Purchasing file: supplier, lead time (days) and purchase cost as % of the selling price, per category.', es: 'Archivo de Compras: proveedor, plazo (días) y coste de compra como % del precio de venta, por categoría.' }),
            p(
              'The main query, `stock_actual`, turns 12,425 product–warehouse rows into **one row per product (4,962)** and adds every calculation the brief asks for. These are its applied steps, translated:',
              'La consulta principal, `stock_actual`, convierte las 12.425 filas producto–almacén en **una fila por producto (4.962)** y añade todos los cálculos que pide el encargo. Estos son sus pasos aplicados, traducidos:'
            ),
            {
              type: 'table',
              caption: { en: 'Applied steps in stock_actual', es: 'Pasos aplicados en stock_actual' },
              head: [{ en: 'Step (original name)', es: 'Paso (nombre original)' }, { en: 'What it does', es: 'Qué hace' }],
              rows: pqSteps.map(([step, en, es]) => [step, { en, es }]),
            },
            {
              type: 'gallery',
              items: [
                img('sf-pq-group', { en: 'Group By dialog: sum of available units per SKU', es: 'Diálogo Agrupar por: suma de disponible por SKU' }, { en: 'Group By: one row per SKU.', es: 'Agrupar por: una fila por SKU.' }),
                img('sf-pq-merge', { en: 'Merge dialog: stock with 90-day sales, left outer join', es: 'Diálogo Combinar: stock con ventas 90 días, externa izquierda' }, { en: 'Merge: left outer join with 90-day sales.', es: 'Combinar: externa izquierda con ventas de 90 días.' }),
                img('sf-pq-steps', { en: 'List of applied steps in the stock_actual query', es: 'Lista de pasos aplicados de la consulta stock_actual' }, { en: 'The full list of applied steps.', es: 'La lista completa de pasos aplicados.' }),
              ],
            },
            { type: 'code', lang: 'm', title: { en: 'Key M code from stock_actual', es: 'Código M clave de stock_actual' }, code: mStock },
            p(
              'A second query, `riesgo_almacen`, keeps the product–warehouse level to measure risk per warehouse: it flags every row where available is below the reorder point, groups by warehouse and calculates the % of products below minimum.',
              'Una segunda consulta, `riesgo_almacen`, mantiene el nivel producto–almacén para medir el riesgo por almacén: marca cada fila cuyo disponible está por debajo del punto de pedido, agrupa por almacén y calcula el % de productos bajo mínimo.'
            ),
            { type: 'code', lang: 'm', title: { en: 'riesgo_almacen (warehouse risk)', es: 'riesgo_almacen (riesgo por almacén)' }, code: mRisk },
            plus(
              'Everything refreshes with a single click: when new CSV files replace the old ones, Data → Refresh All runs every query, pivot table and chart again.',
              'Todo se actualiza con un solo clic: cuando los CSV nuevos sustituyen a los antiguos, Datos → Actualizar todo vuelve a ejecutar cada consulta, tabla dinámica y gráfico.'
            ),
          ],
        },
        {
          title: { en: 'Excel: analysis and dashboard', es: 'Excel: análisis y dashboard' },
          summary: {
            en: 'Order list, dead stock, warehouse ranking, ABC, SKU lookup, trend chart and a one-page dashboard.',
            es: 'Lista de compra, stock muerto, ranking de almacenes, ABC, buscador de SKU, gráfico de tendencia y un dashboard de una página.',
          },
          blocks: [
            list([
              { en: '**Order list**: a pivot table filtered to Out of stock and Reorder now, with name, units and cost, sorted by cost, with the grand total.', es: '**Lista de la compra**: tabla dinámica filtrada por Roto y Pedir ya, con nombre, unidades y coste, ordenada por coste y con el total.' },
              { en: '**Dead stock**: its value with SUMIFS and its % of total stock value.', es: '**Stock muerto**: su valor con SUMAR.SI.CONJUNTO y su % sobre el valor total de stock.' },
              { en: '**Warehouse ranking** by % below minimum, with a traffic-light colour scale.', es: '**Ranking de almacenes** por % bajo mínimo, con escala de colores tipo semáforo.' },
              { en: '**ABC classification** by revenue: A up to 80% cumulative, B up to 95%, C the rest.', es: '**Clasificación ABC** por ingresos: A hasta el 80% acumulado, B hasta el 95%, C el resto.' },
              { en: '**SKU lookup**: typing a SKU shows its stock, days of cover and status (XLOOKUP).', es: '**Buscador de SKU**: al escribir un SKU muestra su stock, días de cobertura y estado (BUSCARX).' },
              { en: '**Trend chart** of monthly revenue by category, with category and month slicers.', es: '**Gráfico de tendencia** de ingresos mensuales por categoría, con segmentadores de categoría y mes.' },
            ]),
            { type: 'code', lang: 'excel', title: { en: 'Key formulas', es: 'Fórmulas clave' }, code: xlFormulas },
            img('sf-dashboard', { en: 'The final Excel dashboard', es: 'El dashboard final en Excel' }, { en: 'The dashboard sheet: KPIs, warehouse ranking, ABC, SKU search and the sales trend with slicers.', es: 'La hoja de dashboard: KPIs, ranking de almacenes, ABC, buscador de SKU y la tendencia de ventas con segmentadores.' }),
          ],
        },
        {
          title: { en: 'Results: answering the three questions', es: 'Resultados: respuesta a las tres preguntas' },
          summary: {
            en: '€164k to reorder, €1.02M in dead stock, Barcelona in the worst position.',
            es: '164 k€ a reponer, 1,02 M€ en stock muerto y Barcelona en la peor situación.',
          },
          blocks: [{ type: 'component', name: 'SupplyForgeResults' }],
        },
      ],
    },
    {
      type: 'download',
      href: '/files/supplyforge-analysis.xlsx',
      label: { en: 'Download the Excel workbook', es: 'Descargar el Excel' },
      note: {
        en: 'The full workbook with the dashboard, pivot tables and Power Query queries (1.7 MB). The queries point to local CSV paths, so they won’t refresh on your computer, but every table and result is there.',
        es: 'El libro completo con el dashboard, las tablas dinámicas y las consultas de Power Query (1,7 MB). Las consultas apuntan a rutas locales de CSV, así que no se actualizarán en tu ordenador, pero todas las tablas y resultados están ahí.',
      },
    },
  ],
};
