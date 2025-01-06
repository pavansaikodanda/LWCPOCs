import { LightningElement } from 'lwc';

export default class ComponentA extends LightningElement {
    weather = {
        temperature: 72,
        condition: 'Sunny',
        location: 'San Francisco'
    };

    get weatherIcon() {
        return this.weather.condition === 'Sunny' ? '☀️' : '☁️';
    }
}