import { faker } from '@faker-js/faker';
import fs from 'fs';

function createWarehouses(count) {
  return Array.from({ length: count }, (_, i) => ({
    warehouse_id: i + 1,
    city: faker.location.city(),
    capacity: faker.number.int({ min: 200, max: 1000 })
  }));
}

function createRetailPartners(count) {
  return Array.from({ length: count }, (_, i) => ({
    partner_id: i + 1,
    location: faker.location.city(),
    capacity: faker.number.int({ min: 50, max: 500 })
  }));
}

function createVehicles(count, warehousesCount) {
  const statuses = ['available', 'on_route', 'maintenance'];
  return Array.from({ length: count }, (_, i) => ({
    vehicle_id: i + 1,
    status: faker.helpers.arrayElement(statuses),
    current_route_id: null,
    capacity: faker.number.int({ min: 3, max: 10 }),
    location: faker.location.city(),
    warehouse_id: faker.number.int({ min: 1, max: warehousesCount })
  }));
}

function createInventories(count, warehousesCount) {
  return Array.from({ length: count }, (_, i) => ({
    item_id: i + 1,
    warehouse_id: faker.number.int({ min: 1, max: warehousesCount }),
    quantity: faker.number.int({ min: 0, max: 200 }),
    threshold: faker.number.int({ min: 20, max: 100 })
  }));
}

function createRoutes(count, warehousesCount, partnersCount) {
  const statuses = ['active', 'blocked'];
  return Array.from({ length: count }, (_, i) => {
    const originIsWarehouse = faker.datatype.boolean();
    const destinationIsWarehouse = !originIsWarehouse;

    return {
      route_id: i + 1,
      origin_type: originIsWarehouse ? 'warehouse' : 'retail_partner',
      origin_id: faker.number.int({ min: 1, max: originIsWarehouse ? warehousesCount : partnersCount }),
      destination_type: destinationIsWarehouse ? 'warehouse' : 'retail_partner',
      destination_id: faker.number.int({ min: 1, max: destinationIsWarehouse ? warehousesCount : partnersCount }),
      status: faker.helpers.arrayElement(statuses)
    };
  });
}

function createPackages(count, warehousesCount, partnersCount) {
  return Array.from({ length: count }, (_, i) => ({
    package_id: i + 1,
    origin_type: 'warehouse',
    origin_id: faker.number.int({ min: 1, max: warehousesCount }),
    vehicle_id: null,
    destination_type: 'retail_partner',
    destination_id: faker.number.int({ min: 1, max: partnersCount }),
    status: 'pending'
  }));
}

function generateMockData({
  warehousesCount = 20,
  vehiclesCount = 50,
  partnersCount = 30,
  packagesCount = 500,
  routesCount = 200,
  inventoryLines = 1000
} = {}) {
  const warehouses = createWarehouses(warehousesCount);
  const retailPartners = createRetailPartners(partnersCount);
  const vehicles = createVehicles(vehiclesCount, warehousesCount);
  const inventories = createInventories(inventoryLines, warehousesCount);
  const routes = createRoutes(routesCount, warehousesCount, partnersCount);
  const packages = createPackages(packagesCount, warehousesCount, partnersCount);

  const data = {
    warehouses,
    vehicles,
    retailPartners,
    inventories,
    routes,
    packages
  };

  fs.writeFileSync('./data/sampleData.generated.json', JSON.stringify(data, null, 2));
  console.log('✅ Datos generados correctamente en /data/sampleData.generated.json');
}


generateMockData();
