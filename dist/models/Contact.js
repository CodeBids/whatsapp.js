"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactBuilder = void 0;
class ContactBuilder {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * Sets the addresses for the contact.
     * @param addresses Array of addresses to be set.
     */
    setAddress(addresses) {
        this.addresses = addresses;
    }
    /**
     * Sets the birthday for the contact.
     * @param birthday Date object representing the contact's birthday.
     */
    setBirthday(birthday) {
        this.birthday = birthday;
    }
    /**
     * Sets the country information for the contact.
     * @param country Country object representing the contact's country.
     */
    setCountry(country) {
        this.country = country;
    }
    /**
     * Sets the company information for the contact.
     * @param company Company object containing the company details.
     */
    setCompany(company) {
        this.company = company;
    }
    /**
     * Sets the email addresses for the contact.
     * @param emails Array of email objects to be set.
     */
    setEmail(emails) {
        this.emails = emails;
    }
    /**
     * Sets the job information for the contact.
     * @param job Job object containing the job title and department.
     */
    setJob(job) {
        this.job = job;
    }
    /**
     * Sets the phone numbers for the contact.
     * @param phones Array of phone objects to be set.
     */
    setPhone(phones) {
        this.phones = phones;
    }
    /**
     * Sets the name prefix for the contact.
     * @param prefix String representing the name prefix.
     */
    setNamePrefix(prefix) {
        this.namePrefix = prefix;
    }
    /**
     * Sets the user ID for the contact.
     * @param userId String representing the user ID.
     */
    setUserId(userId) {
        this.userId = userId;
    }
    /**
     * Sets the URLs associated with the contact.
     * @param urls Array of website objects to be set.
     */
    setUrl(urls) {
        this.urls = urls;
    }
}
exports.ContactBuilder = ContactBuilder;
