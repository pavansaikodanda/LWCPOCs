import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {

  num1;
  num2;
  result;

  handleNumber1Change(){
    this.num1 = event.target.value;
  }
  handleNumber2Change(){
    this.num2 = event.target.value;
  }
handleAddition(){
  
  this.result = Number(this.num1)+Number(this.num2);
}
handleSubtraction(){
  this.result = Number(this.num1)-Number(this.num2);
}
handleMutiplication(){
  this.result = Number(this.num1)*Number(this.num2);
}
handleDivision(){
  this.result = Number(this.num1)/Number(this.num2);
}
}