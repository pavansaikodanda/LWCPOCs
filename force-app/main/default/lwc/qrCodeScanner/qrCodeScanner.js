import { LightningElement } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QrCodeScanner extends LightningElement {

    scannedBarcode = ''; 
    scannedRecord;
    AId;

    /**
     * When component is initialized, detect whether to enable Scan button
     */
    connectedCallback() {
        this.myScanner = getBarcodeScanner(); 
    }
    urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;

    isURL(text) {
        return this.urlPattern.test(text);
    }

    handleBarcodeClick(event){ 
        if(this.myScanner.isAvailable()) {
            
            const scanningOptions = {
                barcodeTypes: [this.myScanner.barcodeTypes.QR, 
                                this.myScanner.barcodeTypes.UPC_E,
                                this.myScanner.barcodeTypes.EAN_13,
                                this.myScanner.barcodeTypes.CODE_39 ],
                instructionText: 'Scan a QR , UPC , EAN 13, Code 39',
                successText: 'Scanning complete.'
            }; 
            this.myScanner.beginCapture(scanningOptions)
            .then((result) => { 
                this.scannedBarcode = result.value; 
                this.scannedBarcode = this.scannedBarcode.replace('\\', '');
                this.scannedBarcode = JSON.stringify(this.scannedBarcode);
                this.scannedRecord = JSON.parse(this.scannedBarcode);
                this.AId = this.scannedBarcode.Id;
               


                // if (this.isURL(inputText)) {
                //   window.location.href = this.scannedBarcode;
                // } else {
                //     console.log('Not a valid URL');
                // }
            })
            .catch((error) => { 
                this.showError('error',error.message);
                this.showError('result',result);
            })
            .finally(() => {
                this.myScanner.endCapture();
            }); 
        }
        else {
            this.showError('Error','Scanner not supported on this device');
        }
    }

    showError(title,msg) {
        const event = new ShowToastEvent({
            title: title,
            message: msg,
            error : 'error'
        });
        this.dispatchEvent(event);
    }
}
