public with sharing class DynamicComponentController {
    @AuraEnabled(cacheable=true)
    public static List<DynamicComponentConfig__mdt> getDynamicComponents() {
        return [
            SELECT Component_Name__c, Display_Order__c, Is_Active__c
            FROM DynamicComponentConfig__mdt
            WHERE Is_Active__c = true
            ORDER BY Display_Order__c
        ];
    }
}
