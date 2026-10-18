import { p, list, img, plus, alert } from './helpers.js';

export default {
  slug: 'ecommerce-sales-analysis',
  kind: 'page',
  areas: ['ecommerce', 'data'],
  org: '123tinta.es',
  title: { en: 'Real ecommerce data case: a self-updating sales analysis', es: 'Caso real de datos de ecommerce: un análisis de ventas que se actualiza solo' },
  summary: {
    en: 'I automated the monthly and weekly sales and turnover comparisons I used to build by hand, with a folder, Power Query, Power Pivot and Excel. Drop the data in, refresh, filter.',
    es: 'Automaticé las comparativas mensuales y semanales de ventas y turnover que antes hacía a mano, con una carpeta, Power Query, Power Pivot y Excel. Meter los datos, actualizar y filtrar.',
  },
  cover: { src: '/images/data-6-pies.webp', width: 1368, height: 628 },
  tools: { en: 'Excel, Power Query, Power Pivot, pivot tables, pivot charts, slicers and a small macro.', es: 'Excel, Power Query, Power Pivot, tablas dinámicas, gráficos dinámicos, segmentadores y una pequeña macro.' },
  body: [
    p(
      '**Why this project exists.** It is based on a real application in my job. We compare sales and turnover month by month, sometimes even week by week. Doing the same analysis over and over meant rebuilding the biggest table by hand and reformatting the data every time. So I built a system where I only have to drop the new files into a folder, click refresh and filter whatever I want.',
      '**Por qué existe este proyecto.** Está basado en una aplicación real en mi trabajo. Comparamos ventas y turnover de forma mensual, o incluso semanal. Repetir el mismo análisis una y otra vez suponía rehacer a mano la tabla más grande y dar formato a los datos cada vez. Así que construí un sistema en el que solo tengo que meter los archivos nuevos en una carpeta, actualizar y filtrar lo que quiera.'
    ),
    alert(
      'The dataset shown here simulates the work I do at my company, so no confidential figures are disclosed. The process and the tools are exactly the ones I use.',
      'Los datos que se muestran simulan el trabajo que hago en mi empresa, para no mostrar cifras confidenciales. El proceso y las herramientas son exactamente los que utilizo.'
    ),
    list([
      { en: '17,156 units analysed, from 2024 to September 2026.', es: '17.156 unidades analizadas, de 2024 a septiembre de 2026.' },
      { en: 'One click refreshes every table and chart.', es: 'Un solo clic actualiza todas las tablas y gráficos.' },
      { en: 'No manual reformatting when new data arrives.', es: 'Ningún reformateo manual cuando llegan datos nuevos.' },
    ]),
    {
      type: 'steps',
      items: [
        {
          title: { en: 'A folder as the single data source', es: 'Una carpeta como única fuente de datos' },
          summary: {
            en: 'Power Query reads every file in a folder, so new exports are just dropped in.',
            es: 'Power Query lee todos los archivos de una carpeta, así que los nuevos exports solo se sueltan dentro.',
          },
          blocks: [
            p(
              'The data is transformed in Power Query using Get Data → From Folder. These are the files in the folder: the historical file plus monthly or weekly exports, and more can be added at any time. The query is filtered by extension so that `.txt` and `.md` files (notes, readmes) never enter the model.',
              'Los datos se transforman en Power Query con Obtener datos → Desde carpeta. Estos son los archivos de la carpeta: el histórico más los exports mensuales o semanales, y se pueden añadir más en cualquier momento. La consulta se filtra por extensión para que los `.txt` y `.md` (notas, readmes) nunca entren en el modelo.'
            ),
            img('data-1-folder', { en: 'Power Query folder source listing four Excel sales files', es: 'Origen de carpeta en Power Query con cuatro archivos de ventas' }, { en: 'Folder source: every Excel file in the folder is combined automatically.', es: 'Origen de carpeta: todos los Excel de la carpeta se combinan automáticamente.' }),
          ],
        },
        {
          title: { en: 'Spotting problems in the raw data', es: 'Detectar los problemas de los datos en bruto' },
          summary: {
            en: 'Generic headers, dates as serial numbers and inconsistent categories and SKUs.',
            es: 'Encabezados genéricos, fechas como números de serie y categorías y SKUs inconsistentes.',
          },
          blocks: [
            p(
              'When the tables are opened, the data has problems, errors and type changes to fix before it can be analysed:',
              'Al abrir las tablas, los datos tienen problemas, errores y cambios de tipo necesarios antes de poder analizarlos:'
            ),
            list([
              { en: 'Headers sitting in the first row, with generic column names (Column1, Column2…).', es: 'Encabezados en la primera fila, con nombres de columna genéricos (Column1, Column2…).' },
              { en: 'Dates stored as Excel serial numbers with decimals (e.g. 46306.99), instead of real dates.', es: 'Fechas guardadas como números de serie de Excel con decimales (p. ej. 46306,99), en lugar de fechas reales.' },
              { en: 'The same category written in different ways ("Tóner" / "Toner", "Filamento 3D" / "Filamento3D").', es: 'La misma categoría escrita de formas distintas ("Tóner" / "Toner", "Filamento 3D" / "Filamento3D").' },
              { en: 'SKUs with inconsistent casing (e.g. "pa-10365").', es: 'SKUs con mayúsculas y minúsculas inconsistentes (p. ej. "pa-10365").' },
            ]),
            img('data-2-raw', { en: 'Raw sales table with numeric dates and generic headers', es: 'Tabla de ventas en bruto con fechas numéricas y encabezados genéricos' }, { en: 'Before: the raw table as it arrives.', es: 'Antes: la tabla en bruto tal y como llega.' }),
          ],
        },
        {
          title: { en: 'Cleaning and typing the data', es: 'Limpieza y tipado de los datos' },
          summary: {
            en: 'Promoted headers, real dates, unified categories and the correct type for every column.',
            es: 'Encabezados promovidos, fechas reales, categorías unificadas y el tipo correcto en cada columna.',
          },
          blocks: [
            p(
              'Every fix is recorded as a Power Query step, so it is applied again automatically to each new file: headers promoted, dates converted, categories and SKUs normalised, and data types set (date, text, whole number, currency). This is the result:',
              'Cada corrección queda registrada como un paso de Power Query, así que se vuelve a aplicar automáticamente a cada archivo nuevo: encabezados promovidos, fechas convertidas, categorías y SKUs normalizados y tipos de datos definidos (fecha, texto, número entero, moneda). Este es el resultado:'
            ),
            img('data-3-clean', { en: 'Clean sales table with proper dates and unified categories', es: 'Tabla de ventas limpia con fechas correctas y categorías unificadas' }, { en: 'After: clean, typed and ready for the data model.', es: 'Después: limpia, tipada y lista para el modelo de datos.' }),
          ],
        },
        {
          title: { en: 'Sales by year, expandable to months', es: 'Ventas por año, desplegables por meses' },
          summary: {
            en: 'A pivot table that compares years and drills down into months, respecting seasonality.',
            es: 'Una tabla dinámica que compara años y se despliega por meses, respetando la estacionalidad.',
          },
          blocks: [
            p(
              'With the data loaded into the model, the required tasks are done in Excel. First, a sales table by year that expands into months and can be filtered by any years or months.',
              'Con los datos cargados en el modelo, las tareas se realizan en Excel. Primero, una tabla de ventas por año que se despliega por meses y se puede filtrar por los años o meses que se quiera.'
            ),
            alert(
              'Seasonality matters. This analysis was done in October 2026, so 2026 only has data up to September. To make the comparison valid, other years are compared over the same period, not as full years.',
              'La estacionalidad importa. Este análisis se hizo en octubre de 2026, así que 2026 solo tiene datos hasta septiembre. Para que la comparación sea válida, los demás años se comparan en el mismo periodo y no como años completos.'
            ),
            img('data-4-pivot', { en: 'Pivot table of units by brand, by year and month', es: 'Tabla dinámica de unidades por marca, año y mes' }, { en: 'Units by brand: 2024, 2025 expanded by month, and 2026.', es: 'Unidades por marca: 2024, 2025 desplegado por meses y 2026.' }),
          ],
        },
        {
          title: { en: 'The main analysis table', es: 'La tabla de análisis principal' },
          summary: {
            en: 'Category variation between two periods, with colour coding and instant filters.',
            es: 'Variación por categoría entre dos periodos, con código de colores y filtros inmediatos.',
          },
          blocks: [
            p(
              'The main table shows the difference by category from one period to another. In this example, September 2025 against September 2026: the total drops 13.16%, but 3D filament (+80%), thermal rolls (+79%) and labels (+43%) grow strongly, while toner (-48%) and paper (-26%) fall.',
              'La tabla principal muestra la diferencia por categoría de un periodo a otro. En este ejemplo, septiembre de 2025 frente a septiembre de 2026: el total baja un 13,16%, pero el filamento 3D (+80%), los rollos térmicos (+79%) y las etiquetas (+43%) crecen con fuerza, mientras que el tóner (-48%) y el papel (-26%) caen.'
            ),
            img('data-5-variation', { en: 'Variation table: September 2025 vs September 2026 by category', es: 'Tabla de variación: septiembre 2025 vs septiembre 2026 por categoría' }, { en: 'Period-over-period variation with conditional formatting.', es: 'Variación entre periodos con formato condicional.' }),
            p(
              'It is also easy to filter to get exactly the data and period needed, straight from the pivot field list:',
              'Además se puede filtrar fácilmente para obtener los datos y el periodo deseados, directamente desde la lista de campos de la tabla dinámica:'
            ),
            img('data-5-filters', { en: 'Pivot table field list and month filters', es: 'Lista de campos de la tabla dinámica y filtros de mes' }, { en: 'Changing the period takes two clicks.', es: 'Cambiar el periodo lleva dos clics.' }),
          ],
        },
        {
          title: { en: 'Dynamic charts and a “Refresh all” button', es: 'Gráficos dinámicos y un botón de “Actualizar todo”' },
          summary: {
            en: 'Pivot charts to spot trends visually, with slicers and a macro that refreshes everything at once.',
            es: 'Gráficos dinámicos para ver tendencias de forma visual, con segmentadores y una macro que lo actualiza todo a la vez.',
          },
          blocks: [
            p(
              'Pivot charts are built on top of the source pivot tables to compare the data visually and see trends: category and brand share per year, and a year-on-year comparison driven by a category slicer.',
              'Sobre las tablas dinámicas de origen se crean gráficos dinámicos para comparar los datos de forma visual y ver tendencias: el peso de cada categoría y marca por año, y una comparación interanual controlada por un segmentador de categorías.'
            ),
            img('data-6-pies', { en: 'Pie charts of units by category and by brand for 2024, 2025 and 2026', es: 'Gráficos circulares de unidades por categoría y por marca en 2024, 2025 y 2026' }, { en: 'Category (top) and brand (bottom) share per year.', es: 'Peso por categoría (arriba) y por marca (abajo) cada año.' }),
            p(
              'A button linked to a small macro runs Refresh All, so new data flows through Power Query, the model, the pivot tables and the charts instantly.',
              'Un botón vinculado a una pequeña macro ejecuta Actualizar todo, de modo que los datos nuevos pasan por Power Query, el modelo, las tablas dinámicas y los gráficos al instante.'
            ),
            img('data-6-bars', { en: 'Bar chart comparing 2025 and 2026 sales for selected categories, with slicer and refresh button', es: 'Gráfico de barras comparando ventas 2025 y 2026 de las categorías seleccionadas, con segmentador y botón de actualizar' }, { en: 'Slicer + “Refresh all” macro button.', es: 'Segmentador + botón con macro “Actualizar todo”.' }),
          ],
        },
        {
          title: { en: 'Results: what the data says', es: 'Resultados: qué dicen los datos' },
          summary: {
            en: 'Own brand growth, categories to watch, top brands, price trend and a stock-out lesson.',
            es: 'Crecimiento de la marca propia, categorías a vigilar, marcas top, tendencia de precio y una lección sobre roturas de stock.',
          },
          blocks: [
            p(
              'Finally, the results. This is the kind of information I read from a case like this one (simulating the work I do at my company):',
              'Por último, los resultados. Este es el tipo de información que se puede leer de un caso así (simulando el trabajo que hago en mi empresa):'
            ),
            list([
              { en: '**Own brand on the rise**: it has grown considerably in recent months, cannibalising HP, the top brand.', es: '**La marca propia sube**: ha crecido considerablemente en los últimos meses, canibalizando a HP, la marca top.' },
              { en: '**Categories to watch**: 3D filament is the fastest-growing category, while paper and ink cartridges are falling and need to be investigated and reviewed.', es: '**Categorías a vigilar**: los filamentos son la categoría que más crece, mientras que el papel y los cartuchos de tinta bajan y hay que investigarlos y revisarlos.' },
              { en: '**Top brands**: Brother, HP and Kyocera.', es: '**Marcas top**: Brother, HP y Kyocera.' },
              { en: '**Average selling price**: down €4 in three years.', es: '**Precio medio de venta**: ha bajado 4 € en tres años.' },
              { en: '**A stock-out, made visible**: a top reference suddenly dropped to zero sales in one month. It was not demand: it was out of stock (not available = nothing sold). In that same month its XL alternative sold far more than usual. The value of always having an alternative.', es: '**Una rotura de stock, a la vista**: una referencia top cayó de golpe a cero ventas un mes. No era la demanda: estaba sin stock (no disponible = no se vende nada). Ese mismo mes, su alternativa XL vendió mucho más de lo habitual. Lo bueno de tener una alternativa.' },
            ]),
            img('data-7-hp-stockout', { en: 'HP black toner at zero sales in July while the high-capacity version peaks', es: 'Tóner negro HP con cero ventas en julio mientras la versión de alta capacidad alcanza su pico' }, { en: 'July: standard HP black toner = 0 units (stock-out); high-capacity version = 36, its best month.', es: 'Julio: tóner negro HP estándar = 0 unidades (rotura); versión de alta capacidad = 36, su mejor mes.' }),
          ],
        },
      ],
    },
    plus(
      'This is a good example of how I work: when a task repeats, I look for a way to automate it so the time goes into the analysis, not into preparing the data.',
      'Es un buen ejemplo de cómo trabajo: cuando una tarea se repite, busco la forma de automatizarla para que el tiempo se dedique al análisis y no a preparar los datos.'
    ),
  ],
};
