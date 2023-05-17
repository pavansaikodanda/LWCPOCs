import { LightningElement } from 'lwc';

export default class DirectOTPLWCIntegration extends LightningElement {

    otpNumber = Math.floor(1000 + Math.random() * 9000);
    YourAPIKEY = "cQms3M6V5Z4Ze6vcjYXuF3uerKycqDzfKacLi8MjVLGGTByZE1Ypw0ECVeJJ";

    sendOtp (){ fetch('https://www.fast2sms.com/dev/bulkV2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": this.YourAPIKEY,
        },
        data: {
            "variables_values": this.otpNumber,
            "route": "otp",
            "numbers": "8790596822",
          }
      })
      .then(response => response.json())
      .then(data => {
        // Manipulate the data as needed
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    handleClick(){
      this.sendOtp();
    }
}