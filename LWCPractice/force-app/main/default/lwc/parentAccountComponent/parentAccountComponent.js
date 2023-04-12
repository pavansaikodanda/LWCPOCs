import { LightningElement , api} from 'lwc';
export default class ParentAccountComponent extends LightningElement {
    @api recordId;
    showButton=true;

    showContactData = false;
    handleClick(){
        this.showContactData = true;
        this.showButton=false;
    }
}