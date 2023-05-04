import { LightningElement } from 'lwc';

export default class CaptureImageLWCTest extends LightningElement {
    videoElement;
    canvasElement;
    capturedImage;
    capturedImageData;
    image1;
    uploadedImageData;
    Result='';




    renderedCallback() {
        this.videoElement = this.template.querySelector('.videoElement');
        this.canvasElement = this.template.querySelector('.canvas');

    }


    async initCamera() {
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



    loadImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.template.querySelector('.uploadedImage').src = reader.result;
                this.uploadedImageData = reader.result.split(',')[1];
                console.log('uploadedImage',this.uploadedImageData);
            };
            reader.readAsDataURL(file);
        }
    }

    async captureImage() {
        if (this.videoElement && this.videoElement.srcObject !== null) {
            this.canvasElement.height = this.videoElement.videoHeight;
            this.canvasElement.width = this.videoElement.videoWidth;
            const context = this.canvasElement.getContext('2d');
            context.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
            this.capturedImage = this.canvasElement.toDataURL('image/jpg');
            this.capturedImageData = this.capturedImage.replace('data:image/png;base64,','');
            console.log('typeOf',typeof(this.capturedImage));
            console.log('capturedImage',this.capturedImageData);
            const imageElement = this.template.querySelector('.imageElement');
            imageElement.setAttribute('src', this.capturedImage);
            imageElement.classList.add('slds-show');
            imageElement.classList.remove('slds-hide');
            const downloadImage = (dataURL, filename) => {
                const anchorElement = document.createElement('a');
                anchorElement.href = dataURL;
                anchorElement.download = filename;
                anchorElement.click();
            }
            downloadImage(this.capturedImage, 'captured-image.jpg');
        }
    }


    async stopCamera() {
        const video = this.template.querySelector(".videoElement");
        video.srcObject.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
        this.hideImageElement();
    }

    hideImageElement() {
        const imageElement = this.template.querySelector('.imageElement');
        imageElement.setAttribute('src', "");
        imageElement.classList.add('slds-hide');
        imageElement.classList.remove('slds-show');
    }

    compareImage(){
        if (this.capturedImageData == this.uploadedImageData){
            console.log('Matching');
            this.Result = 'true';
        }
        else{
            this.Result = 'false';
        }
    }

}
