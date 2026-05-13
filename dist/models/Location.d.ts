import { Location as LocationInterface } from "../types";
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
export declare class LocationBuilder implements LocationInterface {
    name: string;
    address?: string | undefined;
    latitude: number;
    longitude: number;
    phone_number: number;
    /**
     * Creates a new LocationBuilder instance.
     * @param data - The initial location data.
     */
    constructor(data: LocationInterface);
    /**
     * Returns a formatted string with all location parts joined by commas.
     * @returns The full address string.
     */
    getFullAddress(): string;
    /**
     * Sets the location name.
     * @param name - The name of the location.
     */
    setName(name: string): void;
    /**
     * Sets the street address.
     * @param address - The address string.
     */
    setAddress(address: string): void;
    /**
     * Sets the latitude coordinate.
     * @param latitude - The latitude value.
     */
    setLatitude(latitude: number): void;
    /**
     * Sets the longitude coordinate.
     * @param longitude - The longitude value.
     */
    setLongitude(longitude: number): void;
    /**
     * Sets the phone number associated with the location.
     * @param number - The phone number.
     */
    setPhoneNumber(number: number): void;
}
