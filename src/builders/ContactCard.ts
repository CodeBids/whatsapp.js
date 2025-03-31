import { Adress, Country, Company, Email, Job, Phone, ContactCardData as ContactInterface, WebSite } from "../types";

export class ContactCard implements ContactInterface {
  addresses?: Adress[];
  birthday?: Date;
  country?: Country;
  company?: Company;
  emails?: Email[];
  firstName!: string;
  middleName?: string;
  lastName?: string;
  formattedName?: string;
  job?: Job;
  phones!: Phone[];
  namePrefix?: string;
  userId?: string;
  urls?: WebSite[];

  constructor(data: ContactInterface) {
    Object.assign(this, data);
  }

  /**
   * Sets the addresses for the contact.
   * @param addresses Array of addresses to be set.
   */
  public setAddress(addresses: Adress[]): void {
    this.addresses = addresses;
  }

  /**
   * Sets the birthday for the contact.
   * @param birthday Date object representing the contact's birthday.
   */
  public setBirthday(birthday: Date): void {
    this.birthday = birthday;
  }

  /**
   * Sets the country information for the contact.
   * @param country Country object representing the contact's country.
   */
  public setCountry(country: Country): void {
    this.country = country;
  }

  /**
   * Sets the company information for the contact.
   * @param company Company object containing the company details.
   */
  public setCompany(company: Company): void {
    this.company = company;
  }

  /**
   * Sets the email addresses for the contact.
   * @param emails Array of email objects to be set.
   */
  public setEmail(emails: Email[]): void {
    this.emails = emails;
  }

  /**
   * Sets the job information for the contact.
   * @param job Job object containing the job title and department.
   */
  public setJob(job: Job): void {
    this.job = job;
  }

  /**
   * Sets the phone numbers for the contact.
   * @param phones Array of phone objects to be set.
   */
  public setPhone(phones: Phone[]): void {
    this.phones = phones;
  }

  /**
   * Sets the name prefix for the contact.
   * @param prefix String representing the name prefix.
   */
  public setNamePrefix(prefix: string): void {
    this.namePrefix = prefix;
  }

  /**
   * Sets the user ID for the contact.
   * @param userId String representing the user ID.
   */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * Sets the URLs associated with the contact.
   * @param urls Array of website objects to be set.
   */
  public setUrl(urls: WebSite[]): void {
    this.urls = urls;
  }
}
