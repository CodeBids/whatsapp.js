import { Adress, Country, Company, Email, Job, Phone, ContactCardData as ContactInterface } from "../types";
export declare class ContactCard implements ContactInterface {
    addressData?: Adress;
    birthday?: Date;
    country?: Country;
    company?: Company;
    email?: Email;
    firstName: string;
    middleName?: string;
    lastName?: string;
    formattedName?: string;
    job?: Job;
    phone: Phone;
    namePrefix?: string;
    userId?: string;
    constructor(data: ContactInterface);
}
