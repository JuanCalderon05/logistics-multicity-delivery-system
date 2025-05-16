export class Package{
    constructor(package_id, origin_type, origin_id, vehicle_id, destination_type, destination_id, status){
        this.package_id=package_id
        this.origin_id=origin_id
        this.origin_type=origin_type
        this.vehicle_id=vehicle_id
        this.destination_id=destination_id
        this.destination_type=destination_type
        this.status=status
    }
}