import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveAccountImage from '@salesforce/apex/AccountController.saveAccountImage';

export default class GenericCamera extends LightningElement {
    // contactIcon = THEME_OVERRIDES + "/assets/images/icn_people_profile.png";
    // penIcon = THEME_OVERRIDES + "/assets/images/icn_pen.png";
    // cloudupload = THEME_OVERRIDES + "/assets/images/cloudupload.png";
    // frameIcon = THEME_OVERRIDES + "/assets/images/icn_camera_frame.png";
     recordId='0012w00001abUhqAAE';
    isModalOpen = false;
    isImageCaptured = false;
    videoElement;
    canvasElement;
    capturedImage;
    saveimage = false;

    renderedCallback() {
        this.videoElement = this.template.querySelector('.videoElement');
        this.canvasElement = this.template.querySelector('.canvas');
    }

    async initCamera() {
        this.isModalOpen = true;
        this.isImageCaptured = false;
        await new Promise(resolve => setTimeout(resolve, 0));
        this.videoElement = this.template.querySelector('.videoElement');
    
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                this.videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 400 }, audio: false });
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
            this.saveimage = true;
            debugger;
            const imageElement = this.template.querySelector('.imageicon');
            console.log('imageElement',imageElement);
            imageElement.setAttribute('src', this.capturedImage);
            imageElement.classList.add('slds-show');
            imageElement.classList.remove('slds-hide');
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
        saveAccountImage({ parentId: this.recordId, base64Data: base64Data, contentType: 'image/png', fileName: 'captured-image.png' })
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Image captured and saved successfully',
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        })
        .finally(() => {
            this.isModalOpen = false;
        });
    }

    retakeImage() {
        this.stopCamera();
        this.isModalOpen = false;
        this.initCamera();
    }
}