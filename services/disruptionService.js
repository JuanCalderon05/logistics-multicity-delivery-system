import { routes, vehicles, packages } from '../data/sampleData.js';

export function handleDisruptions() {
  const disruptedRoutes = routes.filter(r => r.status === 'blocked');

  if (disruptedRoutes.length === 0) {
    console.log('✅ No hay rutas interrumpidas actualmente.');
    return;
  }

  for (const route of disruptedRoutes) {
    console.log(`⚠️ Ruta ${route.route_id} bloqueada entre ${route.origin_type} ${route.origin_id} y ${route.destination_type} ${route.destination_id}`);

    // Buscar vehículos que estén usando esta ruta
    const affectedVehicles = vehicles.filter(v => v.current_route_id === route.route_id);

    for (const vehicle of affectedVehicles) {
      console.log(`🚚 Vehículo ${vehicle.vehicle_id} está afectado por la interrupción.`);

      // Cambiar estado del vehículo
      vehicle.status = 'waiting';
      vehicle.current_route_id = null;

      // Reasignar paquetes si es posible
      const affectedPackages = packages.filter(p => p.vehicle_id === vehicle.vehicle_id);

      affectedPackages.forEach(pkg => {
        pkg.status = 'pending';        // volver a cola de espera
        pkg.vehicle_id = null;         // remover asignación
      });

      console.log(`📦 Paquetes del vehículo ${vehicle.vehicle_id} devueltos a estado 'pending'.`);
    }
  }
}