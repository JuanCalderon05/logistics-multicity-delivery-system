import { inventories, warehouses } from '../data/sampleData.js';

export function checkInventoryLevels() {
  const alerts = [];

  for (const item of inventories) {
    if (item.quantity < item.threshold) {
      const warehouse = warehouses.find(w => w.warehouse_id === item.warehouse_id);
      const message = `🚨 Alerta: el ítem ${item.item_id} en la bodega de ${warehouse.city} tiene bajo stock (${item.quantity} < ${item.threshold})`;
      alerts.push(message);
    }
  }

  if (alerts.length === 0) {
    console.log("✅ Todos los niveles de inventario están dentro de los umbrales.");
  } else {
    alerts.forEach(alert => console.log(alert));
  }
}
