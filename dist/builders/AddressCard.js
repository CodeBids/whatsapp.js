"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressCard = void 0;
class AddressCard {
    constructor(data) {
        Object.assign(this, data); // Asigna las propiedades directamente
    }
    getFullAddress() {
        const parts = [
            this.house_number,
            this.floor_number,
            this.tower_number,
            this.building_name,
            this.address,
            this.landmark_area,
            this.city,
            this.state,
            this.in_pin_code || this.sg_post_code,
        ];
        return parts.filter(part => part).join(", ");
    }
    validatePhoneNumber() {
        return this.phone_number !== undefined && /^\d{10}$/.test(this.phone_number.toString());
    }
    setName(name) {
        this.name = name;
    }
}
exports.AddressCard = AddressCard;
