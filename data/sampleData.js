import fs from 'fs/promises';

const rawData = await fs.readFile('./data/sampleData.generated.json', 'utf-8');
const data = JSON.parse(rawData);

export const warehouses = data.warehouses;
export const vehicles = data.vehicles;
export const retailPartners = data.retailPartners;
export const routes = data.routes;
export const packages = data.packages;
export const inventories = data.inventories;
