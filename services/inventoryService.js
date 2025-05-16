import { inventories, packages, routes, vehicles, warehouses } from '../data/sampleData.js';

export function getPackagesForLowInventory() {
  const lowInventoryItemIds = inventories
    .filter(item => item.quantity < item.threshold)
    .map(item => item.item_id);

  return packages.filter(pkg => 
    lowInventoryItemIds.includes(pkg.package_id) && pkg.status === 'pending'
  );
}

export function showSystemStatus() {
  console.log('\n🚚 Vehículos disponibles o en ruta:');
  vehicles
    .filter(v => ['available', 'on_route'].includes(v.status))
    .forEach(v =>
      console.log(` - Vehículo ${v.vehicle_id} | Estado: ${v.status} | Ruta asignada: ${v.current_route_id ?? 'Ninguna'}`)
    );

  console.log('\n📦 Paquetes relevantes (pendientes o en tránsito):');
  packages
    .filter(p => ['pending', 'in_transit'].includes(p.status))
    .forEach(p =>
      console.log(` - Paquete ${p.package_id} | Estado: ${p.status} | Vehículo asignado: ${p.vehicle_id ?? 'Sin asignar'}`)
    );

  console.log('\n🛣️ Rutas bloqueadas:');
  const blockedRoutes = routes.filter(r => r.status === 'blocked');
  if (blockedRoutes.length === 0) {
    console.log(' - No hay rutas bloqueadas.');
  } else {
    blockedRoutes.forEach(r =>
      console.log(` - Ruta ${r.route_id} | De ${r.origin_type} ${r.origin_id} → ${r.destination_type} ${r.destination_id}`)
    );
  }
}

export function reorderStock() {
  const orders = inventories
    .filter(item => item.quantity < item.threshold)
    .map(item => ({
      item_id: item.item_id,
      warehouse_id: item.warehouse_id,
      reorder_quantity: item.threshold * 2 - item.quantity,
    }));

  if (orders.length === 0) {
    console.log("✅ No se requieren reposiciones en este momento.");
  } else {
    console.log("🛒 Órdenes de reposición generadas:");
    orders.forEach(order =>
      console.log(` - Ítem ${order.item_id} | Bodega #${order.warehouse_id} | Cantidad a reordenar: ${order.reorder_quantity}`)
    );
  }
}

export function fulfillPackageDemand() {
  const insufficient = packages.filter(pkg => {
    const item = inventories.find(inv =>
      inv.item_id === pkg.package_id && inv.warehouse_id === pkg.origin_id
    );
    return !item || item.quantity <= 0;
  });

  if (insufficient.length === 0) {
    console.log("✅ Todos los paquetes pueden ser cumplidos con el inventario actual.");
  } else {
    console.log("🚫 Paquetes que no se pueden cumplir por falta de inventario:");
    insufficient.forEach(p =>
      console.log(` - Paquete #${p.package_id} | Bodega: ${p.origin_id}`)
    );
  }
}

export function consumeStock() {
  packages.forEach(pkg => {
    if (pkg.status === 'in_transit') {
      const item = inventories.find(inv =>
        inv.item_id === pkg.package_id && inv.warehouse_id === pkg.origin_id
      );
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    }
  });

  console.log("📦 Inventario actualizado tras despacho de paquetes.");
}

export function generateInventoryReport() {
  console.log('\n📋 Reporte de Inventario por Bodega:');

  warehouses.forEach(w => {
    console.log(`\n🏢 ${w.city} (Bodega #${w.warehouse_id}):`);

    const items = inventories.filter(i => i.warehouse_id === w.warehouse_id);

    if (items.length === 0) {
      console.log('   - Sin ítems registrados.');
    } else {
      items.forEach(item => {
        const status = item.quantity < item.threshold ? '⚠️ Bajo stock' : '✔️ Suficiente';
        console.log(`   - Ítem ${item.item_id}: ${item.quantity} unidades (Umbral: ${item.threshold}) ${status}`);
      });
    }
  });
}

