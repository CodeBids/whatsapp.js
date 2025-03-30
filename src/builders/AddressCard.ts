import { Address as AddressInterface } from "../types";

export class AddressCard implements AddressInterface {

  constructor(public data: AddressInterface) {}
  name: string = this.data.name;

  public getFullAddress(): string {
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

  public validatePhoneNumber(): boolean {
    return this.data.phone_number !== undefined && /^\d{10}$/.test(this.data.phone_number.toString());
  }

  public setName(name: string) {
    this.data.name = name;
  }
}