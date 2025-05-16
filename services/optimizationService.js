import { vehicles, routes, packages } from '../data/sampleData.js';
import { getPackagesForLowInventory } from './inventoryService.js';

export function optimizeRoutes() {
  const availableVehicles = vehicles.filter(v => v.status === 'available');
  const urgentPackages = getPackagesForLowInventory();

  for (const vehicle of availableVehicles) {
    const assigned = [];

    const assignPackages = (pkgs) => {
      for (const pkg of pkgs) {
        if (assigned.length >= vehicle.capacity) break;

        const route = routes.find(r =>
          r.status === 'active' &&
          r.origin_type === pkg.origin_type &&
          r.origin_id === pkg.origin_id &&
          r.destination_type === pkg.destination_type &&
          r.destination_id === pkg.destination_id
        );

        if (route && (pkg.origin_type !== 'warehouse' || vehicle.warehouse_id === pkg.origin_id)) {
          pkg.vehicle_id = vehicle.vehicle_id;
          pkg.status = 'in_transit';
          vehicle.current_route_id = route.route_id;
          vehicle.status = 'on_route';
          assigned.push(pkg);
        }
      }
    };

    assignPackages(urgentPackages);

    if (assigned.length < vehicle.capacity) {
      const normalPackages = packages.filter(
        p => p.status === 'pending' && !p.vehicle_id && !urgentPackages.includes(p)
      );
      assignPackages(normalPackages);
    }

    console.log(
      assigned.length
        ? `Vehículo ${vehicle.vehicle_id} asignado con ${assigned.length} paquetes (prioridad incluida)`
        : `⚠️ No se asignaron paquetes al vehículo ${vehicle.vehicle_id}`
    );
  }
}
