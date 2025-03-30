import { Address as AddressInterface } from "../types";
export declare class AddressCard implements AddressInterface {
    name: string;
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
    constructor(data: AddressInterface);
    getFullAddress(): string;
    validatePhoneNumber(): boolean;
    setName(name: string): void;
}
