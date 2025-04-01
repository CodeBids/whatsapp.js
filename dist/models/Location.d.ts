import { Location as LocationInterface } from "../types";
export declare class LocationBuilder implements LocationInterface {
    name: string;
    address?: string | undefined;
    latitude: number;
    longitude: number;
    phone_number: number;
    constructor(data: LocationInterface);
    getFullAddress(): string;
    setName(name: string): void;
    setAddress(address: string): void;
    setLatitude(latitude: number): void;
    setLongitude(longitude: number): void;
    setPhoneNumber(number: number): void;
}
