import { Address as AddressInterface } from "../types";

export class AddressCard implements AddressInterface {
  name!: string;
  phone_number?: number;
  in_pin_code?: string;
  sg_post_code?: number;
  house_number?: string;
  floor_number?: string;
  tower_number?: string;
  building_name?: string;
  address?: string;
  landmark_area?: string;
  unit_number?: string;
  city?: string;
  state?: string;

  constructor(data: AddressInterface) {
    Object.assign(this, data); // Asigna las propiedades directamente
  }

  public getFullAddress(): string {
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

  public validatePhoneNumber(): boolean {
    return this.phone_number !== undefined && /^\d{10}$/.test(this.phone_number.toString());
  }

  public setName(name: string) {
    this.name = name;
  }
}
