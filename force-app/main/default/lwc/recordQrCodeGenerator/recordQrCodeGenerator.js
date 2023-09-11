import { LightningElement, api } from 'lwc';
import QueryRecords from '@salesforce/apex/CreateRecordQRCode.QueryRecords';
import qrcode from './qrcode.js' ;


const QR_Code_Generator_URL = 'https://qr-code-generator20.p.rapidapi.com/generatebasicbase64?data=';

export default class RecordQrCodeGenerator extends LightningElement {
    @api recordId;
    @api objectApiName;
    recordData;
    jsonString = '';
    imageURL = '';

    handleCodeCreation() {
        console.log('recordId', this.recordId);
        QueryRecords({ recId: this.recordId })
            .then((result) => {
                this.recordData = result;
                this.recordData = this.recordData;
               // this.recordData.ObjectName=this.objectApiName;
                this.jsonString = JSON.stringify(this.recordData);
                console.log('jsonString',this.jsonString);
                this.jsonString = this.jsonString;
                const qrCodeGenerated = new qrcode(0,'H');
                qrCodeGenerated.addData(this.jsonString);
                qrCodeGenerated.make();
                let element = this.template.querySelector(".qrCode");
                element.innerHTML = qrCodeGenerated.createSvgTag({});
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
}
