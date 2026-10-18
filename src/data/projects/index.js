import printers3d from './printers3d.js';
import ecommerceData from './ecommerceData.js';
import ecommerceSeo from './ecommerceSeo.js';
import supplyforge from './supplyforge.js';
import { printerPage, tuhogartech, watchout } from './webProjects.js';
import { crm, buyer, promotions, fans, opportunities, kpis, seoConsulting, wordpress } from './smallProjects.js';

const all = [
  printers3d, ecommerceData, ecommerceSeo, supplyforge, printerPage, tuhogartech, watchout,
  crm, buyer, promotions, fans, opportunities, kpis, seoConsulting, wordpress,
];

export const projects = Object.fromEntries(all.map((proj) => [proj.slug, proj]));

// Case studies with their own page, in the order used for "next case study".
export const caseStudies = all.filter((proj) => proj.kind === 'page');

export const projectPath = (slug) => `/projects/${slug}`;
