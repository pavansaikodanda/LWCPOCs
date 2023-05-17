public with sharing class AccountController {

    @AuraEnabled
    public static Id saveAccountImage(String parentId, String base64Data, String contentType, String fileName) {

        // ContentVersion contentVersion =  [SELECT Id
        //                                                 FROM ContentVersion
        //                                                 WHERE FirstPublishLocationId = :parentId ];


        ContentVersion cv = new ContentVersion(VersionData = EncodingUtil.base64Decode(base64Data),
                                                Title = fileName,
                                                PathOnClient = '/'+fileName,
                                                FirstPublishLocationId = parentId);
        
        upsert cv;
        return cv.Id;

    }
}