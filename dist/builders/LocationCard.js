"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationCard = void 0;
class LocationCard {
    constructor(data) {
        Object.assign(this, data); // Asigna las propiedades directamente
    }
    getFullAddress() {
        const parts = [
            this.name,
            this.address,
            this.latitude,
            this.longitude,
            this.phone_number,
        ];
        return parts.filter(part => part).join(", ");
    }
    setName(name) {
        this.name = name;
    }
}
exports.LocationCard = LocationCard;
