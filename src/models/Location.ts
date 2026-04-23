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
export class LocationBuilder implements LocationInterface {
  name!: string;
  address?: string | undefined;
  latitude!: number;
  longitude!: number;
  phone_number!: number;

  /**
   * Creates a new LocationBuilder instance.
   * @param data - The initial location data.
   */
  constructor(data: LocationInterface) {
    Object.assign(this, data);
  }

  /**
   * Returns a formatted string with all location parts joined by commas.
   * @returns The full address string.
   */
  public getFullAddress(): string {
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
  public setName(name: string) {
    this.name = name;
  }

  /**
   * Sets the street address.
   * @param address - The address string.
   */
  public setAddress(address: string) {
    this.address = address
  }

  /**
   * Sets the latitude coordinate.
   * @param latitude - The latitude value.
   */
  public setLatitude(latitude: number) {
    this.latitude = latitude
  }

  /**
   * Sets the longitude coordinate.
   * @param longitude - The longitude value.
   */
  public setLongitude(longitude: number) {
    this.longitude = longitude
  }

  /**
   * Sets the phone number associated with the location.
   * @param number - The phone number.
   */
  public setPhoneNumber(number: number) {
    this.phone_number = number
  }
}
