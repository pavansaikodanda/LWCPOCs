public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<contact> getContacts() {
        return [Select FirstName, LastName, Email 
                    from Contact];
    }
}