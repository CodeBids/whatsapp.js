import { Location as LocationInterface } from "../types";

export class LocationBuilder implements LocationInterface {
  name!: string;
  address?: string | undefined;
  latitude!: number;
  longitude!: number;
  phone_number!: number;

  constructor(data: LocationInterface) {
    Object.assign(this, data); // Asigna las propiedades directamente
  }

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

  public setName(name: string) {
    this.name = name;
  }

  public setAddress(address: string) {
    this.address = address
  }

  public setLatitude(latitude: number) {
    this.latitude = latitude
  }

  public setLongitude(longitude: number) {
    this.latitude = longitude
  }

  public setPhoneNumber(number: number) {
    this.phone_number = number
  }
}
