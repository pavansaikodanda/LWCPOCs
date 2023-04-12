import { LightningElement , wire, track} from 'lwc';
import getAccountName from '@salesforce/apex/ContactData.getAccountName';

export default class AccountParentComponent extends LightningElement {

    contactRecordId;
    @track accountdata;
    error;
    handleId(event){
        this.contactRecordId = event.detail;
        console.log('contactRecord',this.contactRecordId);
    }
  

    @wire(getAccountName, {contactId:'$contactRecordId'})
     wiredAccountname({error,data}){
        if(data){
            this.accountdata = data;
            this.error =undefined;
            console.log('data',this.accountdata);
            console.log('error',error);
        }
        else if(error){
            this.accountdata = undefined;
            this.error = error;
        }
     }

}
