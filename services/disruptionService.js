import { routes, vehicles, packages } from '../data/sampleData.js';

export function handleDisruptions() {
  const disruptedRoutes = routes.filter(route => route.status === 'blocked');

  if (disruptedRoutes.length === 0) {
    console.log('✅ No hay rutas interrumpidas actualmente.');
    return;
  }

  for (const route of disruptedRoutes) {
    console.log(`⚠️ Ruta ${route.route_id} bloqueada entre ${route.origin_type} ${route.origin_id} y ${route.destination_type} ${route.destination_id}`);

    const affectedVehicles = vehicles.filter(vehicle => vehicle.current_route_id === route.route_id);
    if (affectedVehicles.length === 0) {
      continue;
    }

    for (const vehicle of affectedVehicles) {
      console.log(`🚚 Vehículo ${vehicle.vehicle_id} está afectado por la interrupción.`);

      vehicle.status = 'waiting';
      vehicle.current_route_id = null;

      const affectedPackages = packages.filter(pkg => pkg.vehicle_id === vehicle.vehicle_id);

      affectedPackages.forEach(pkg => {
        pkg.status = 'pending';
        pkg.vehicle_id = null;
      });

      console.log(`📦 Paquetes del vehículo ${vehicle.vehicle_id} devueltos a estado 'pending'.`);
    }
  }
}
