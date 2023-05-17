public with sharing class AccountController {

    @AuraEnabled
    public static Id saveAccountImage(String parentId, String base64Data, String contentType, String fileName) {

        ContentVersion cv = new ContentVersion(VersionData = EncodingUtil.base64Decode(base64Data),
                                                Title = fileName,
                                                PathOnClient = '/'+fileName,
                                                FirstPublishLocationId = parentId);
        
        insert cv;
        return cv.Id;

    }
}