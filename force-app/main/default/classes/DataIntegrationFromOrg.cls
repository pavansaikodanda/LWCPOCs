@RestResource(urlMapping='/Account/*')
global class DataIntegrationFromOrg {


    @HttpPost
    global static String DataIntegrationFromOrg() {

        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        List<Account> Acc = [Select Id, Name, ShippingAddress, Phone from Account];
        String returnResponse = JSON.serialize(Acc);
        system.debug(returnResponse);
        return returnResponse;
    }
}