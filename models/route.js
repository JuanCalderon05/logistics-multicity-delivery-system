export class Route {
  constructor(route_id, origin_type, origin_id, destination_type, destination_id, status) {
    this.route_id = route_id;
    this.origin_type = origin_type;
    this.origin_id = origin_id;
    this.destination_type = destination_type;
    this.destination_id = destination_id;
    this.status = status;
  }
}