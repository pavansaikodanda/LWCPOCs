import { LightningElement, api, track, wire } from 'lwc';
import getMapboxResponse from '@salesforce/apex/getMapCoordinates.getMapboxResponse';
export default class MapSearch extends LightningElement {

    @track mapMarkers = [];
    coordinates;
    showMap=false
    @track mapOptions = {};
    locationValue = '';
    error;

    handleLocationText(event) {
        this.locationValue = event.target.value;
    }

    handleClick() {

        getMapboxResponse({ Searchtext: this.locationValue })
            .then((result) => {
                this.coordinates = result;
                const long = String(this.coordinates[0]);
                const lat = String(this.coordinates[1]);
                console.log('lat', lat);
                this.showMap=true;
                this.mapMarkers = [
                    {
                        location: {
                            Latitude: lat,
                            Longitude: long,
                        },
                    },
                ];
                this.mapOptions = {
                    draggable: false,
                    disableDefaultUI: true,
                };
                this.error = undefined;
            })
            
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
            });


    }


}