import { LightningElement } from 'lwc';
import accountReturn from '@salesforce/apex/ApexAccountRetrieveLWC.accountReturn';
export default class NewAccountGraphQLvsApexTest extends LightningElement {

results
    connectedCallback() {
        accountReturn()
        .then(accounts =>{
            this.results = accounts
        })
        .catch(error =>{
            console.error('error',error.message);
        })
    }

}