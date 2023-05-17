public with sharing class newsAPI {
    @AuraEnabled
    public static Map<String,Object> fetchNews(){
        
        Http http = new Http();
        HttpRequest httprequest = new HttpRequest();
        httprequest.setEndPoint('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=1d136e777b184e94b87005544489bea8');
        httprequest.setMethod('GET');
        
        Map<String, Object> newsJsonData = new Map<String, Object>();
        String newsResponse = null;
        try{
            HttpResponse httpResponse = http.send(httprequest);
            if(httpResponse.getStatusCode() == 200) {
                newsResponse = httpResponse.getBody();
            }else{
                throw new callOutException(httpResponse.getBody());
            }
        }
        catch(Exception ex){
            throw ex;
        }
        if(!String.isBlank(newsResponse)){
            newsJsonData = (Map<String,Object>)JSON.deserializeUntyped(newsResponse);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        }else {
            return null;
        }
        
    }
    
}