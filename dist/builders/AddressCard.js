"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressCard = void 0;
class AddressCard {
    constructor(data) {
        this.data = data;
        this.name = this.data.name;
    }
    getFullAddress() {
        const parts = [
            this.data.house_number,
            this.data.floor_number,
            this.data.tower_number,
            this.data.building_name,
            this.data.address,
            this.data.landmark_area,
            this.data.city,
            this.data.state,
            this.data.in_pin_code || this.data.sg_post_code,
        ];
        return parts.filter(part => part).join(", ");
    }
    validatePhoneNumber() {
        return this.data.phone_number !== undefined && /^\d{10}$/.test(this.data.phone_number.toString());
    }
    setName(name) {
        this.data.name = name;
    }
}
exports.AddressCard = AddressCard;
