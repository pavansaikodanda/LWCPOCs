public class catoonYourSelfAPI {
    
    
    public static GenerateHumanAnimeStyleResponse cartoonMyselfAPI(String imageData, String Type){
        
        
        HttpRequest hrequest = new HttpRequest();
        Http http = new Http();
		HttpResponse httpResponse = new HttpResponse();
        hrequest.setEndpoint('https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation');
        hrequest.setHeader('content-type', 'multipart/form-data; boundary='+imageData);
        hrequest.setHeader('X-RapidAPI-Key', '6c81fc4cedmsh4f239b5ee7c3167p1a8b87jsn52956bcba8e1');
        hrequest.setBody(imageData+'\rContent-Disposition: form-data; name=\"image\"\r\r\r'+imageData+'\rContent-Disposition: form-data; name=\"type\"\r\r3d_cartoon\r'+imageData+'\r\r');
        hrequest.setMethod('POST');
        httpresponse = http.send(hrequest);
        string responseBody = httpresponse.getBody();
        GenerateHumanAnimeStyleResponse cartoonAPI = (GenerateHumanAnimeStyleResponse) System.JSON.deserialize(responseBody, GenerateHumanAnimeStyleResponse.class); 
        system.debug(cartoonAPI);
        return cartoonAPI;
        
    }
    
    
    public class GenerateHumanAnimeStyleResponse {
        public Data data;
        public Integer error_code;
        public String error_msg;
        public String request_id;
        
    }
    public class Data {
            public String image_url;
        }
    
}