import { LightningElement, api } from 'lwc';

export default class ContactChildComponent extends LightningElement {
    @api recordId;

    handleClick(){
       
        const event = new CustomEvent('idfromchild',{
            detail:'0032w00000wXUIRAA4'
        });
        this.dispatchEvent(event);
        console.log('recordId',event.detail);
    }

}