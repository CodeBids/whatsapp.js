import { Location as LocationInterface } from "../types";
export declare class LocationCard implements LocationInterface {
    name: string;
    address?: string | undefined;
    latitude: number;
    longitude: number;
    phone_number: string;
    constructor(data: LocationInterface);
    getFullAddress(): string;
    setName(name: string): void;
}
