import { Warehouse } from '../models/warehouse.js';
import { Inventory } from '../models/inventory.js';
import { DeliveryVehicle } from '../models/deliveryVehicle.js';
import { Package } from '../models/package.js';
import { RetailPartner } from '../models/retailPartner.js';
import { Route } from '../models/route.js';

// Warehouses
const warehouses = [
  new Warehouse(1, 'Bogotá', 500),
  new Warehouse(2, 'Medellín', 300),
];

// Inventory
const inventories = [
  new Inventory(101, 1, 50, 20),
  new Inventory(102, 1, 100, 40),
  new Inventory(103, 2, 80, 30),
];

// Delivery Vehicles
const vehicles = [
  new DeliveryVehicle(1, 'available', null, 5, 'Bogotá', 1),
  new DeliveryVehicle(2, 'available', null, 4, 'Medellín', 2),
  new DeliveryVehicle(3, 'maintenance', null, 6, 'Bogotá', 1),
];

// Retail Partners
const retailPartners = [
  new RetailPartner(1, 'Chía', 200),
  new RetailPartner(2, 'Envigado', 150),
];

// Routes
const routes = [
  new Route(1, 'warehouse', 1, 'retail_partner', 1, 'active'),
  new Route(2, 'warehouse', 2, 'retail_partner', 2, 'active'),
  new Route(3, 'retail_partner', 1, 'retail_partner', 2, 'blocked'), // interrupción
];

// Packages
const packages = [
  new Package(201, 'warehouse', 1, null, 'retail_partner', 1, 'pending'),
  new Package(202, 'warehouse', 2, null, 'retail_partner', 2, 'pending'),
  new Package(203, 'warehouse', 1, null, 'retail_partner', 2, 'pending'),
];

export {
  warehouses,
  inventories,
  vehicles,
  retailPartners,
  routes,
  packages,
};
