# 🚛 Logistics Simulation System

A command-line logistics management simulation system built in JavaScript.  
It models a multi-city delivery network with warehouses, vehicles, partners, routes, packages, and inventory, handling real-world logistics scenarios like stock shortages and route disruptions.

---

## 📦 Features

✅ Inventory monitoring with threshold alerts  
✅ Route optimization based on availability and vehicle capacity  
✅ Real-time disruption handling (blocked routes, vehicle breakdowns)  
✅ Scalable architecture with mock data generator  
✅ Fully interactive CLI to simulate logistics decisions  

---

## 🧠 Technologies

- Node.js (ESModules)
- JavaScript (modular architecture)
- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) for mock data generation

---

## 🗂 Project Structure

```
├── data/
│ 
│      └── sampleData.js # Default sample data
│ 
│      └── sampleData.generated.json # Generated mock data
│ 
├── models/ # Entity definitions (Warehouse, Vehicle, etc.)
│ 
├── services/ # Core logic (inventory, optimization, disruptions)
│ 
├── scripts/ 
│ 
│       └── generateMockData.js # Mock data generator
│ 
├── index.js # Entry point (optional full simulation)
│ 
└── README.md
```
---

## 🛠️ Setup
```bash
1. Clone the project
✅ git clone https://github.com/JuanCalderon05/logistics-multicity-delivery-system.git
  cd logistics-system
 ``` 
```bash
2. Install dependencies
✅ npm install
 ```
 ```bash
3. Generate mock data
✅ node scripts/generateMockData.js
```
```bash
4. Run the simulation
✅ npm run simulation
```
