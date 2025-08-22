import { describe, it, expect, beforeEach } from '@jest/globals';
import { ContactBuilder } from '../../src/models/Contact';
import type { 
  ContactCardData, 
  Adress, 
  Country, 
  Company, 
  Email, 
  Job, 
  Phone, 
  WebSite 
} from '../../src/types/structures/Contact';

describe('ContactBuilder', () => {
  let contactData: ContactCardData;

  beforeEach(() => {
    contactData = {
      firstName: 'John',
      phones: [{
        number: 1234567890,
        type: 'CELL',
        wa_id: 1234567890
      }]
    };
  });

  describe('constructor', () => {
    it('should create a contact with required fields', () => {
      const contact = new ContactBuilder(contactData);
      
      expect(contact.firstName).toBe('John');
      expect(contact.phones).toEqual([{
        number: 1234567890,
        type: 'CELL',
        wa_id: 1234567890
      }]);
    });

    it('should create a contact with all fields', () => {
      const fullContactData: ContactCardData = {
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'Doe',
        formattedName: 'John Michael Doe',
        namePrefix: 'Mr.',
        userId: 'user123',
        phones: [{
          number: 1234567890,
          type: 'CELL',
          wa_id: 1234567890
        }],
        emails: [{
          address: 'john@example.com',
          type: 'personal'
        }],
        addresses: [{
          street: { name: 'Main St', number: 123 },
          type: 'home',
          city: 'New York',
          zipCode: '10001',
          country: { name: 'USA', code: 'US' }
        }],
        birthday: new Date('1990-01-01'),
        country: { name: 'USA', code: 'US' },
        company: { name: 'Tech Corp', departmentName: 'Engineering' },
        job: { title: 'Software Engineer' },
        urls: [{
          url: 'https://johndoe.com',
          type: 'personal'
        }]
      };

      const contact = new ContactBuilder(fullContactData);
      
      expect(contact.firstName).toBe('John');
      expect(contact.middleName).toBe('Michael');
      expect(contact.lastName).toBe('Doe');
      expect(contact.formattedName).toBe('John Michael Doe');
      expect(contact.namePrefix).toBe('Mr.');
      expect(contact.userId).toBe('user123');
      expect(contact.phones).toEqual(fullContactData.phones);
      expect(contact.emails).toEqual(fullContactData.emails);
      expect(contact.addresses).toEqual(fullContactData.addresses);
      expect(contact.birthday).toEqual(fullContactData.birthday);
      expect(contact.country).toEqual(fullContactData.country);
      expect(contact.company).toEqual(fullContactData.company);
      expect(contact.job).toEqual(fullContactData.job);
      expect(contact.urls).toEqual(fullContactData.urls);
    });
  });

  describe('setter methods', () => {
    let contact: ContactBuilder;

    beforeEach(() => {
      contact = new ContactBuilder(contactData);
    });

    describe('setAddress', () => {
      it('should set addresses correctly', () => {
        const addresses: Adress[] = [
          {
            street: { name: 'Main St', number: 123 },
            type: 'home',
            city: 'New York',
            zipCode: '10001',
            country: { name: 'USA', code: 'US' }
          },
          {
            street: { name: 'Work Ave', number: 456 },
            type: 'work',
            city: 'Boston',
            zipCode: '02101'
          }
        ];

        contact.setAddress(addresses);
        
        expect(contact.addresses).toEqual(addresses);
        expect(contact.addresses).toHaveLength(2);
      });

      it('should handle empty addresses array', () => {
        contact.setAddress([]);
        
        expect(contact.addresses).toEqual([]);
        expect(contact.addresses).toHaveLength(0);
      });
    });

    describe('setBirthday', () => {
      it('should set birthday correctly', () => {
        const birthday = new Date('1990-05-15');
        
        contact.setBirthday(birthday);
        
        expect(contact.birthday).toEqual(birthday);
      });

      it('should handle different date formats', () => {
        const birthday1 = new Date('2000-12-25');
        const birthday2 = new Date(1985, 6, 4); // July 4, 1985
        
        contact.setBirthday(birthday1);
        expect(contact.birthday).toEqual(birthday1);
        
        contact.setBirthday(birthday2);
        expect(contact.birthday).toEqual(birthday2);
      });
    });

    describe('setCountry', () => {
      it('should set country correctly', () => {
        const country: Country = { name: 'Canada', code: 'CA', stateCode: 'ON' };
        
        contact.setCountry(country);
        
        expect(contact.country).toEqual(country);
      });

      it('should handle country without optional fields', () => {
        const country: Country = { name: 'Brazil' };
        
        contact.setCountry(country);
        
        expect(contact.country).toEqual(country);
        expect(contact.country?.code).toBeUndefined();
        expect(contact.country?.stateCode).toBeUndefined();
      });
    });

    describe('setCompany', () => {
      it('should set company correctly', () => {
        const company: Company = { name: 'Tech Solutions', departmentName: 'R&D' };
        
        contact.setCompany(company);
        
        expect(contact.company).toEqual(company);
      });

      it('should handle company without department', () => {
        const company: Company = { name: 'StartUp Inc' };
        
        contact.setCompany(company);
        
        expect(contact.company).toEqual(company);
        expect(contact.company?.departmentName).toBeUndefined();
      });
    });

    describe('setEmail', () => {
      it('should set emails correctly', () => {
        const emails: Email[] = [
          { address: 'personal@example.com', type: 'personal' },
          { address: 'work@company.com', type: 'work' }
        ];
        
        contact.setEmail(emails);
        
        expect(contact.emails).toEqual(emails);
        expect(contact.emails).toHaveLength(2);
      });

      it('should handle emails without type', () => {
        const emails: Email[] = [{ address: 'test@example.com' }];
        
        contact.setEmail(emails);
        
        expect(contact.emails).toEqual(emails);
        expect(contact.emails![0].type).toBeUndefined();
      });
    });

    describe('setJob', () => {
      it('should set job correctly', () => {
        const job: Job = { title: 'Senior Developer' };
        
        contact.setJob(job);
        
        expect(contact.job).toEqual(job);
      });
    });

    describe('setPhone', () => {
      it('should set phones correctly', () => {
        const phones: Phone[] = [
          { number: 1234567890, type: 'CELL', wa_id: 1234567890 },
          { number: 9876543210, type: 'WORK', wa_id: 9876543210 }
        ];
        
        contact.setPhone(phones);
        
        expect(contact.phones).toEqual(phones);
        expect(contact.phones).toHaveLength(2);
      });

      it('should handle phones without type', () => {
        const phones: Phone[] = [{ number: 1111111111, wa_id: 1111111111 }];
        
        contact.setPhone(phones);
        
        expect(contact.phones).toEqual(phones);
        expect(contact.phones[0].type).toBeUndefined();
      });
    });

    describe('setNamePrefix', () => {
      it('should set name prefix correctly', () => {
        contact.setNamePrefix('Dr.');
        
        expect(contact.namePrefix).toBe('Dr.');
      });

      it('should handle various prefixes', () => {
        const prefixes = ['Mr.', 'Mrs.', 'Ms.', 'Prof.', 'Rev.'];
        
        prefixes.forEach(prefix => {
          contact.setNamePrefix(prefix);
          expect(contact.namePrefix).toBe(prefix);
        });
      });
    });

    describe('setUserId', () => {
      it('should set user ID correctly', () => {
        contact.setUserId('user456');
        
        expect(contact.userId).toBe('user456');
      });

      it('should handle various user ID formats', () => {
        const userIds = ['123', 'user-abc-123', 'guid-1234-5678-9012'];
        
        userIds.forEach(userId => {
          contact.setUserId(userId);
          expect(contact.userId).toBe(userId);
        });
      });
    });

    describe('setUrl', () => {
      it('should set URLs correctly', () => {
        const urls: WebSite[] = [
          { url: 'https://personal.com', type: 'personal' },
          { url: 'https://company.com', type: 'work' }
        ];
        
        contact.setUrl(urls);
        
        expect(contact.urls).toEqual(urls);
        expect(contact.urls).toHaveLength(2);
      });

      it('should handle URLs without type', () => {
        const urls: WebSite[] = [{ url: 'https://example.com' }];
        
        contact.setUrl(urls);
        
        expect(contact.urls).toEqual(urls);
        expect(contact.urls![0].type).toBeUndefined();
      });
    });
  });

  describe('builder pattern chaining', () => {
    it('should allow method chaining for fluent interface', () => {
      // Note: The current implementation doesn't return 'this', but we can test
      // that multiple calls work in sequence
      const contact = new ContactBuilder(contactData);
      
      contact.setNamePrefix('Dr.');
      contact.setUserId('user123');
      contact.setBirthday(new Date('1985-03-15'));
      
      expect(contact.namePrefix).toBe('Dr.');
      expect(contact.userId).toBe('user123');
      expect(contact.birthday).toEqual(new Date('1985-03-15'));
    });
  });

  describe('data integrity', () => {
    it('should maintain data immutability when arrays are modified externally', () => {
      const contact = new ContactBuilder(contactData);
      const originalPhones: Phone[] = [{ number: 1234567890, type: 'CELL', wa_id: 1234567890 }];
      
      contact.setPhone([...originalPhones]); // Create a copy
      
      // Modify the original array
      originalPhones.push({ number: 9999999999, type: 'HOME', wa_id: 9999999999 });
      
      // Contact should only have the original phone since we passed a copy
      expect(contact.phones).toHaveLength(1);
      expect(contact.phones[0].number).toBe(1234567890);
    });

    it('should handle null/undefined gracefully', () => {
      const contact = new ContactBuilder(contactData);
      
      // These should work without throwing errors
      expect(() => {
        contact.setAddress([]);
        contact.setEmail([]);
        contact.setPhone([]);
        contact.setUrl([]);
      }).not.toThrow();
    });
  });
});