import readline from 'readline';
import {consumeStock,showSystemStatus} from './services/inventoryService.js';
import { handleDisruptions } from './services/disruptionService.js';
import { optimizeRoutes } from './services/optimizationService.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.clear();
  console.log('🚛 SISTEMA LOGÍSTICO MULTICIUDAD - MODO SIMULACIÓN');
  console.log('--------------------------------------------------');
  console.log('[1] Verificando disrupciones');
  console.log('[2] Optimizar rutas y despachar paquetes');
  console.log('[3] Ejecutar ciclo completo de operación');
  console.log('[0] Salir');
  console.log('--------------------------------------------------');
}

function promptUser() {
  showMenu();
  rl.question('\nSeleccione una opción: ', (input) => {
    switch (input.trim()) {

      case '1':
        console.clear();
        console.log('🚨 Procesando disrupciones...');
        handleDisruptions();
        returnToMenu();
        break;

      case '2':
        console.clear();
        console.log('📍 Optimizando rutas y despachando paquetes...');
        optimizeRoutes();
        consumeStock();
        returnToMenu();
        break;

      case '3':
        console.clear();
        console.log('📊 Estado actual del sistema:');
        showSystemStatus();
        returnToMenu();
        break;

      case '0':
        console.log('\n✅ Simulación finalizada. ¡Gracias por usar el sistema!');
        rl.close();
        break;

      default:
        console.log('❌ Opción inválida. Intente nuevamente.');
        returnToMenu();
        break;
    }
  });
}

function returnToMenu() {
  rl.question('\nPresione Enter para volver al menú...', () => {
    console.clear();
    promptUser();
  });
}

promptUser();
