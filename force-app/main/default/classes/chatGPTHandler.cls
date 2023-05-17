public class chatGPTHandler {
    
    public static HttpResponse getCompletions(string searchText){
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.openai.com/v1/completions');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        String Key = [SELECT Id, Key__c FROM ChatGPT__c].Key__c;
        request.setHeader('Authorization', 'Bearer '+String.escapeSingleQuotes('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').trim());
        String Body = '{"model": "text-davinci-003","prompt":"'
                +searchText+
                '","max_tokens": 4000,"temperature": 0,'
                +'"stream": false,"top_p": 1}';
        request.setBody( Body );
        request.setMethod('POST');
        HttpResponse response = new HttpResponse();
        response= http.send(request);
        system.debug(request);
        system.debug(response);
        return response;
        
    }
    
}