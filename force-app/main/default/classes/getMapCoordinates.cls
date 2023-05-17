public with sharing class getMapCoordinates {

    @AuraEnabled(cacheable=true)
    public static List<Decimal> getMapboxResponse(String Searchtext) {

        List<Decimal> coordinates = new List<Decimal>();
        system.debug('Searchtext'+Searchtext);
        Http http = new Http();
        HttpRequest httpRequest = new HttpRequest();
        HttpResponse httpResponse = new HttpResponse();
        httpRequest.setMethod('GET');
        String YOUR_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicGF2YW5zYWlrb2RhbmRhIiwiYSI6ImNsZm01b3JjbDA4bHQzdnIyNWVzMTVkYzcifQ.ALYoGJ7tCEPGYcjVAikYFA';
        String EndPoint= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+Searchtext+'.json?proximity=ip&access_token='+YOUR_MAPBOX_ACCESS_TOKEN;
        httpRequest.setEndpoint(EndPoint);
        httpResponse = http.send(httpRequest);
        system.debug('http Response'+ httpResponse);
        string jsonResponseString = httpResponse.getBody();
        jsonGetCoordinatesResponseWrapper jsonResponse =  (jsonGetCoordinatesResponseWrapper) System.JSON.deserialize(jsonResponseString, jsonGetCoordinatesResponseWrapper.class); 
        system.debug('http Response Body'+ httpResponse.getBody());
        system.debug('JSONWrapper'+jsonResponse);
        coordinates = jsonResponse.features[0].geometry.coordinates;
        system.debug('coordinates'+ coordinates);
        return coordinates;
    }


    public class jsonGetCoordinatesResponseWrapper{
         string type;
         list<String> query;
         list<feature> features;
        string attribution;

       
    }
    public class feature{
        public string id;
        public string type;
        public list<string> place_type;
        public Decimal relevance;
        public property properties;
        public string text;
        public string place_name;
        public string matching_text;
        public string matching_place_name;
        public list<Decimal> bbox;
        public list<Decimal> center;
        public geometry geometry;
        public list<context> context;
    }
    public class property{
        public string wikidata;
        public string mapbox_id;
    }
    public class geometry{
        public string type;
        public list<Decimal> coordinates;
    }
    public class context{
        public string id;
        public string wikidata;
        public string mapbox_id;
        public string text;
    }
    
}