import { LightningElement } from 'lwc';
import { getContactsService } from "lightning/mobileCapabilities";

export default class MobileContactsFetch extends LightningElement {


    contactsResults = "No contacts selected.";
  contacts = [];

  handleImportContacts() {
    const myContactsService = getContactsService();

    // Make sure ContactsService is available before trying to access contacts
    if (myContactsService.isAvailable()) {
      // Configuration for ContactsService
      let options = {
        permissionRationaleText: "Allow access to your contacts to enable contacts processing.",
      };

      // Select on-device contacts, and then process them
      myContactsService
        .getContacts(options)
        .then((results) => {
          this.contacts = results;
          this.contactsResults = "Number of contacts selected: " + this.contacts.length;
        })
        .catch((error) => {
          // Handle cancellation, or selection errors here
          this.contacts = [];
          this.contactsResults =
            JSON.stringify(error) +
            "\n\nError code: " +
            error.code +
            "\n\nError message: " +
            error.message;
          console.error(this.contactsResults);
        });
    } else {
      // ContactsService isn't available
      // Are you running in a supported mobile app?
      this.contactsResults = "ContactsService API isn't available.";
    }
  }
}