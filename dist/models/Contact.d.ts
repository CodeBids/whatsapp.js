import { Adress, Country, Company, Email, Job, Phone, ContactCardData as ContactInterface, WebSite } from "../types";
export declare class ContactBuilder implements ContactInterface {
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
    /**
     * Sets the addresses for the contact.
     * @param addresses Array of addresses to be set.
     */
    setAddress(addresses: Adress[]): void;
    /**
     * Sets the birthday for the contact.
     * @param birthday Date object representing the contact's birthday.
     */
    setBirthday(birthday: Date): void;
    /**
     * Sets the country information for the contact.
     * @param country Country object representing the contact's country.
     */
    setCountry(country: Country): void;
    /**
     * Sets the company information for the contact.
     * @param company Company object containing the company details.
     */
    setCompany(company: Company): void;
    /**
     * Sets the email addresses for the contact.
     * @param emails Array of email objects to be set.
     */
    setEmail(emails: Email[]): void;
    /**
     * Sets the job information for the contact.
     * @param job Job object containing the job title and department.
     */
    setJob(job: Job): void;
    /**
     * Sets the phone numbers for the contact.
     * @param phones Array of phone objects to be set.
     */
    setPhone(phones: Phone[]): void;
    /**
     * Sets the name prefix for the contact.
     * @param prefix String representing the name prefix.
     */
    setNamePrefix(prefix: string): void;
    /**
     * Sets the user ID for the contact.
     * @param userId String representing the user ID.
     */
    setUserId(userId: string): void;
    /**
     * Sets the URLs associated with the contact.
     * @param urls Array of website objects to be set.
     */
    setUrl(urls: WebSite[]): void;
}
