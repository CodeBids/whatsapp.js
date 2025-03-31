export interface ContactCardData {
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
}
export interface Adress {
    street: Street;
    type?: "home" | "work";
    city?: string;
    country?: Country;
    zipCode?: string;
}
export interface Country {
    name: string;
    code?: string;
    stateCode?: string;
}
export interface Street {
    name: string;
    number?: number;
}
export interface Company {
    name: string;
    departmentName?: string;
}
export interface Job {
    title: string;
}
export interface Email {
    address: string;
    type?: "work" | "personal";
}
export interface Phone {
    number: number;
    type?: "work" | "personal";
}
export interface WebSite {
    url: string;
    type?: "work" | "personal";
}
export interface ContactPayloadData {
    name: {
        formatted_name: string;
        first_name?: string;
        last_name?: string;
        middle_name?: string;
        suffix?: string;
        prefix?: string;
    };
    phones?: Array<{
        phone: string;
        type?: "CELL" | "MAIN" | "IPHONE" | "HOME" | "WORK";
        wa_id?: string;
    }>;
    emails?: Array<{
        email: string;
        type: "HOME" | "WORK";
    }>;
    addresses?: Array<{
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
        country_code?: string;
        type: "HOME" | "WORK";
    }>;
    urls?: Array<{
        url: string;
        type: "HOME" | "WORK";
    }>;
    birthday?: string;
    org?: {
        company?: string;
        department?: string;
        title?: string;
    };
}
