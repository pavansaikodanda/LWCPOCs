import { LightningElement, api, wire} from 'lwc';
import ContactData from '@salesforce/apex/ContactData.ContactData';
export default class ChildContactComponent extends LightningElement {
    @api accountRecordId;
    @wire(ContactData, {AccountId: '$accountRecordId'}) wiredContacts;
}