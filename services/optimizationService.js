import { vehicles, routes, packages } from '../data/sampleData.js';

export function optimizeRoutes() {
  const availableVehicles = vehicles.filter(v => v.status === 'available');

  for (const vehicle of availableVehicles) {
    const maxCapacity = vehicle.capacity;

    // Buscar paquetes pendientes no asignados
    const pendingPackages = packages.filter(
      pkg => pkg.status === 'pending' && pkg.vehicle_id === null
    );

    const assigned = [];

    for (const pkg of pendingPackages) {
      // Buscar ruta válida hacia ese destino
      const route = routes.find(r =>
        r.origin_type === 'warehouse' &&
        r.origin_id === vehicle.warehouse_id &&
        r.destination_type === pkg.destination_type &&
        r.destination_id === pkg.destination_id &&
        r.status === 'active'
      );

      if (route && assigned.length < maxCapacity) {
        // Asignar ruta y vehículo al paquete
        pkg.vehicle_id = vehicle.vehicle_id;
        pkg.status = 'in_transit';
        vehicle.current_route_id = route.route_id;
        vehicle.status = 'on_route';
        assigned.push(pkg);
      }
    }

    if (assigned.length > 0) {
      console.log(`Vehículo ${vehicle.vehicle_id} asignado con ${assigned.length} paquetes`);
    } else {
      console.log(`⚠️ No se asignaron paquetes al vehículo ${vehicle.vehicle_id}`);
    }
  }
}
