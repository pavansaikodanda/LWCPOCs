import { LightningElement, wire} from 'lwc';
import getContacts from '@salesforce/apex/ListofContacts.getContacts';

export default class ContactsList extends LightningElement {
@wire(getContacts) contacts;  
}