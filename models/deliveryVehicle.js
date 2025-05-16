export class DeliveryVehicle {
    constructor(vehicle_id, status, current_route_id, capacity, location, warehouse_id){
        this.vehicle_id=vehicle_id
        this.status=status
        this.current_route_id=current_route_id
        this.capacity=capacity
        this.location=location
        this.warehouse_id=warehouse_id
    }

}