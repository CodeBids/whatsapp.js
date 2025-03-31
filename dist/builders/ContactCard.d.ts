import { Adress, Country, Company, Email, Job, Phone, ContactCardData as ContactInterface, WebSite } from "../types";
export declare class ContactCard implements ContactInterface {
    addresses?: Adress[];
    birthday?: Date;
    country?: Country;
    company?: Company;
    emails?: Email[];
    firstName: string;
    middleName?: string;
    lastName?: string;
    formattedName?: string;
    job?: Job;
    phones: Phone[];
    namePrefix?: string;
    userId?: string;
    urls?: WebSite[];
    constructor(data: ContactInterface);
}
