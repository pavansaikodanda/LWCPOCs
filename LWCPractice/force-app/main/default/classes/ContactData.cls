public with sharing class ContactData {
    @AuraEnabled(cacheable=true)
    public static List<contact> ContactData(String AccountId) {
        return [Select Id, Name from Contact Where AccountId = :AccountId];
    }
    @AuraEnabled(cacheable=true)
    public static Contact getAccountName(String contactId) {
      return [Select Id, Account.Name from contact where Id = :contactId];
    }
}