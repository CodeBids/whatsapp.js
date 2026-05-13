"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationBuilder = void 0;
/**
 * Builder class for creating location messages.
 *
 * @example
 * ```ts
 * const location = new LocationBuilder({
 *   name: 'Office',
 *   latitude: -34.6037,
 *   longitude: -58.3816,
 *   phone_number: 5491112345678
 * });
 * ```
 */
class LocationBuilder {
    /**
     * Creates a new LocationBuilder instance.
     * @param data - The initial location data.
     */
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * Returns a formatted string with all location parts joined by commas.
     * @returns The full address string.
     */
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
    /**
     * Sets the location name.
     * @param name - The name of the location.
     */
    setName(name) {
        this.name = name;
    }
    /**
     * Sets the street address.
     * @param address - The address string.
     */
    setAddress(address) {
        this.address = address;
    }
    /**
     * Sets the latitude coordinate.
     * @param latitude - The latitude value.
     */
    setLatitude(latitude) {
        this.latitude = latitude;
    }
    /**
     * Sets the longitude coordinate.
     * @param longitude - The longitude value.
     */
    setLongitude(longitude) {
        this.longitude = longitude;
    }
    /**
     * Sets the phone number associated with the location.
     * @param number - The phone number.
     */
    setPhoneNumber(number) {
        this.phone_number = number;
    }
}
exports.LocationBuilder = LocationBuilder;
