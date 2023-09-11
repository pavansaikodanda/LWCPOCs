public with sharing class CreateRecordQRCode {
    @AuraEnabled(cacheable=true)
    public static sobject QueryRecords(String recId) {
        Id recordId = recId;
        String sobjectName =  recordId.getSObjectType().getDescribe().getName();
        String QueryString = 'Select Id,Name from '+string.valueOf(sobjectName)+' WHERE id =:recId';
        sObject s = Database.query(QueryString);
        return s;
    }
}