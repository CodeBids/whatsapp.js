import { Address as AddressInterface } from "../types";
export declare class AddressCard implements AddressInterface {
    data: AddressInterface;
    constructor(data: AddressInterface);
    name: string;
    getFullAddress(): string;
    validatePhoneNumber(): boolean;
    setName(name: string): void;
}
