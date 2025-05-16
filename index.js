import dotenv from 'dotenv';
dotenv.config();

import { checkInventoryLevels } from './services/inventoryService.js';
import { handleDisruptions } from './services/disruptionService.js';
import { optimizeRoutes } from './services/optimizationService.js';

import { vehicles, packages } from './data/sampleData.js';

console.log('🚀 Iniciando simulación logística...\n');

// 1. Verificar niveles de inventario
console.log('📦 Verificando inventario...');
checkInventoryLevels();

console.log('\n🚧 Comprobando disrupciones...');
handleDisruptions();

console.log('\n🗺️ Optimizando rutas de entrega...');
optimizeRoutes();

console.log('\n📊 Estado final del sistema:\n');

// Mostrar paquetes y vehículos
console.log('🚚 Vehículos:');
vehicles.forEach(v =>
  console.log(`ID: ${v.vehicle_id}, Estado: ${v.status}, Ruta: ${v.current_route_id || 'Ninguna'}`)
);

console.log('\n📦 Paquetes:');
packages.forEach(p =>
  console.log(`ID: ${p.package_id}, Estado: ${p.status}, Vehículo: ${p.vehicle_id || 'Ninguno'}`)
);

console.log('\n✅ Simulación finalizada.\n');
