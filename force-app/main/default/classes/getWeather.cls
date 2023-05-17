public with sharing class getWeather {

    public static void getCurrentLocationWeather(Decimal Latitude, Decimal Longitude) {
        Http http = new Http ();
        HttpRequest httpRequest = new HttpRequest ();
        HttpResponse httpResponse = new HttpResponse();
        String Endpoint = 'https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=';
                Endpoint = Endpoint+String.valueOf(Longitude)+'&lat='+String.valueOf(Latitude);
        httpRequest.setEndpoint(endpoint);
        httpRequest.setHeader('X-RapidAPI-Key', 'd347dd26a1msh945dd164582ff13p1326b3jsnfe6ec04fa54b');
        httpRequest.setHeader('X-RapidAPI-Host', 'weatherbit-v1-mashape.p.rapidapi.com');
        httpRequest.setMethod('GET');
        httpResponse = http.send(httpRequest);
        system.debug('httpResponse'+httpResponse);
        system.debug('httpResponseBody'+httpResponse.getBody());
    }
}