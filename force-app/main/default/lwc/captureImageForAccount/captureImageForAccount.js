import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveAccountImage from '@salesforce/apex/AccountController.saveAccountImage';

export default class CaptureImageForAccount extends LightningElement {
    @api recordId;
    isModalOpen = false;
    isImageCaptured = false;
    showRetakeButton = false;
    videoElement;
    okButtonInvisible = false;
    showCaptureButton = false;
    canvasElement;
    capturedImage;

    renderedCallback() {
        this.videoElement = this.template.querySelector('.videoElement');
        this.canvasElement = this.template.querySelector('.canvas');
    }

    async initCamera() {
        this.isModalOpen = true;
        this.isImageCaptured = false;
        this.showRetakeButton = false;
        this.okButtonInvisible = false;
        this.showCaptureButton = false;
        await new Promise(resolve => setTimeout(resolve, 0));
        this.videoElement = this.template.querySelector('.videoElement');
    
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                console.log('navigator',navigator.mediaDevices);
                this.videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 400 }, audio: false });
                
            } catch (error) {
                console.error('Error accessing the camera: ', JSON.stringify(error));
            }
        } else {
            console.error('getUserMedia is not supported in this browser');
        }
    }
    
    async captureImage() {
        if (this.videoElement && this.videoElement.srcObject !== null) {
            this.canvasElement.height = this.videoElement.videoHeight;
            this.canvasElement.width = this.videoElement.videoWidth;
            const context = this.canvasElement.getContext('2d');
            context.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
            this.capturedImage = this.canvasElement.toDataURL('image/png');
            this.isImageCaptured = true;
            this.stopCamera();
            this.showRetakeButton = true;
            this.okButtonInvisible = true;
            this.showCaptureButton = true;
        }
    }

    async stopCamera() {
        if(this.videoElement && this.videoElement.srcObject) {
            this.videoElement.srcObject.getTracks().forEach((track) => track.stop());
            this.videoElement.srcObject = null;
        }
    }

    async saveImage() {
        this.captureImage();
        let base64Data = this.capturedImage.replace(/^data:image\/(png|jpg);base64,/, "");
        saveAccountImage({ parentId: this.recordId, base64Data: base64Data, contentType: 'image/png', fileName: 'test.png' })
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Image captured and saved successfully',
                    variant: 'success',
                }),
            );
           // window.location.reload();
        })
        
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
        this.isModalOpen = false;
        
       
    }

    retakeImage() {
        this.showRetakeButton = false;
        this.okButtonInvisible = false;
        this.showCaptureButton = false;
        this.stopCamera();
        this.isModalOpen = false;
        this.initCamera();
    }
}