import { LightningElement,track } from 'lwc';

export default class HousePlanAutomation extends LightningElement {
    @track length = 0;
    @track breadth = 0;
    showPlan;

    get boxStyle() {
        return `width: ${this.length}px; height: ${this.breadth}px; border: 1px solid black;`;
    }

    handleLengthChange(event) {
        this.length = event.target.value;
    }

    handleBreadthChange(event) {
        this.breadth = event.target.value;
    }

    createShape() {
        this.showPlan = true;
    }
}