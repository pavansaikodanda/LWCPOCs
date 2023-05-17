import { LightningElement } from 'lwc';

export default class LiveLocationLWC extends LightningElement {

    // renderedCallback(){
    //     this.handleGeoLocation();
    // }

    mapMarkers = [];
    showMap = false;
    handleGeoLocation() {
        if (navigator.geolocation) {
            this.showMap = true;
            navigator.geolocation.getCurrentPosition(position => {

                // Get the Latitude and Longitude from Geolocation API
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                this.mapMarkers = [
                    {
                        location: {
                            Latitude: latitude,
                            Longitude: longitude,
                        },
                    },
                    // {
                    //     location: {
                    //         City: 'Bangalore',
                    //         Country: 'INDIA',
                    //         PostalCode: '560063',
                    //         State: 'KARNATAKA',
                    //         Street: 'REVA UNIVERSITY',
                    //     },
                    //     value: 'location001',
                    //     title: 'The Landmark Building',
                    //     description:
                    //         'The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties', //escape the apostrophe in the string using &#39;
                    //     icon: 'standard:account',
                    // },
                ];
            })
        }
    }
}