"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationBuilder = void 0;
class LocationBuilder {
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
    setAddress(address) {
        this.address = address;
    }
    setLatitude(latitude) {
        this.latitude = latitude;
    }
    setLongitude(longitude) {
        this.latitude = longitude;
    }
    setPhoneNumber(number) {
        this.phone_number = number;
    }
}
exports.LocationBuilder = LocationBuilder;
