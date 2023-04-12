import { LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FILED from '@salesforce/schema/Contact.Email';


export default class ContactCreator extends LightningElement {
    objectApiName = CONTACT_OBJECT;
    fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, EMAIL_FILED];

    handleSuccess(event){
        const toastEvent = new ShowToastEvent({
            title: 'Contact Created',
            message: 'Record Id'+event.detail.id,
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }
}