public class CustomEmailFromCaseController {
    public String positions {get; set;}
    public ID caseID{get;set;}
    public string from_email {get; set;}
    public string to_email {get; set;}
    public string bcc_email {get; set;}
    public string subject {get; set;}
    public string body {get; set;}
    public Case case2 {get;set;}
     
    public List<SelectOption> filesCountList {get; set;}
     public String FileCount {get; set;}
     public List<Attachment> allFileList {get; set;}
    List<EmailTemplate> email_temps;
    
    public Attachment attachment {
        get {
            if (attachment == null)
                attachment = new Attachment();
            return attachment;
        }
        set;
    }
    
    
     public Case case1 {get;set;}

    public CustomEmailFromCaseController(){
        from_email=UserInfo.getUserEmail();
         case1 = new Case();
    
        bcc_email='';
       caseID= ApexPages.currentPage().getParameters().get('id');
        
       
        case2=[select caseNumber, subject, contactEmail from case where id=:caseID];
        subject=case2.Subject;
          filesCountList = new List<SelectOption>() ;
        FileCount = '' ;
        
        allFileList = new List<Attachment>() ;
        //Adding values count list - you can change this according to your need
        for(Integer i = 1 ; i < 11 ; i++)
            filesCountList.add(new SelectOption(''+i , ''+i)) ;
           
    }
    
    public  void setEmailBody(){
        
        EmailTemplate em=searchEmailTemplateById(positions);
        if(em!=null){
            body=em.body; 
            subject=em.subject;
        }else{
            body='';
            subject='';
        }
        
        
    }
    
    public  void sendEmail(){
    Messaging.SingleEmailMessage email=new  Messaging.SingleEmailMessage();
       List<Contact> contactList=new List<Contact>();
        String eids=case1.contactid;
       contactList=[select email from contact where id=:case1.contactid];
        String bcc_emails=bcc_email;
      //  body=eids+contactList[0].Email;
        
       List<String> emailList=new List<String>();
       
       
        List<String> bccemailList=new List<String>();
       
        if(contactList[0].Email!=''){
           emailList.add(contactList[0].Email);
        }
         if(bcc_emails!=''){
            bccemailList.add(bcc_emails);
        }
        
        email.setHTMLBody(body);
        email.setSubject(case2.Subject);
       
        if( bccemailList.size()>0){
            email.setBccAddresses( bccemailList);
        }
         if(emailList.size()>0){
           email.setToAddresses(emailList);
                 //------To upload multiple attach emails
        if(FileCount == null || FileCount == '')
            ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.ERROR,'Please select how many files you want to upload.'));

        List<Attachment> listToInsert = new List<Attachment>() ;
        
        //Attachment a = new Attachment(parentId = accid, name=myfile.name, body = myfile.body);
        for(Attachment a: allFileList)
        {
            if(a.name != '' && a.name != '' && a.body != null)
                listToInsert.add(new Attachment(parentId = caseID, name = a.name, body = a.body)) ;
        }
        allFileList.clear();
        //Inserting attachments
        if(listToInsert.size() > 0)
        {
            insert listToInsert ;
            system.debug('---attached successfully--'+listToInsert);
             system.debug('---attachment size--'+listToInsert.size());
            ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.INFO, listToInsert.size() + ' file(s) are attached with email and sent successfully'));
            FileCount = '' ;
        }
        else{
            ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.ERROR,'Please select at-least one file'));
         }     
       
           
           // Integer numAtts=[SELECT count() FROM attachment WHERE parentid=: caseId];
        Integer numAtts=listToInsert.size();
        system.debug('Number of Attachments Atts = '+ numAtts);
        List<Messaging.Emailfileattachment> efaList = new List<Messaging.Emailfileattachment>();
            
                 if(numAtts > 0){
                for (Integer i = 0; i < numAtts; i++){
                    //system.debug(listToInsert[i].Name);
                    Messaging.Emailfileattachment efa = new Messaging.Emailfileattachment();
                            efa.setFileName(listToInsert[i].Name);
                    efa.setBody(listToInsert[i].Body);
                    efa.setContentType(listToInsert[i].ContentType);
                    efaList.add( efa );
                }
        }
                 if(numAtts > 0){
          email.setFileAttachments(efaList );
        }
                system.debug('====email==='+email);    
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});  
        system.debug('*****email==='+email);    
      
             
             
             
             
             
           /*  
              Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
        if (results[0].success) {
            System.debug('The email was sent successfully.');
            body='The email was sent successfully.'; 
            to_email='';
            subject='';
            bcc_email='';
        } else {
            System.debug('The email failed to send: '
                         + results[0].errors[0].message);
            body='The email failed to send.'; 
          
        }*/
        
             
         }else{
             DisplayError('Recipient email id can\'t be blank');
         }
       
    }
    public void sendTemplate(){
     
    }
    
     public void preview(){
     
    }
     public void cancel(){
     
    }
    
    public List<SelectOption> getEmailTemplatelist() {
        List<SelectOption> options = new List<SelectOption>();
        
        email_temps=[SELECT EmailTemplate.Name, EmailTemplate.Folder.Name, EmailTemplate.Subject,EmailTemplate.Body
                     from EmailTemplate 
                     where EmailTemplate.FolderId = '00D6F000001uSNX'];
        
        //Messaging.SingleEmailMessage e=Messaging.renderStoredEmailTemplate(emails[0].ID,'','');
        options.add(new SelectOption('','--Select Email template--'));
        for(EmailTemplate emailt:email_temps){
            options.add(new SelectOption(emailt.ID,emailt.Name));
        }
        
        return options;
    }
    
    private EmailTemplate searchEmailTemplateById(string id){
        EmailTemplate emailtemp=null;
        for( EmailTemplate emailt:email_temps){
            if(emailt.ID.equals(id)){
                emailtemp=emailt;
            }            
        }
        return emailtemp;
    }
    public void DisplayError(String error){
        Apexpages.addMessage( new ApexPages.Message (ApexPages.Severity.ERROR, error)); 
    }
    
  
    
     public PageReference ChangeCount()
    {
        allFileList.clear() ;
        //Adding multiple attachments instance
        for(Integer i = 1 ; i <= Integer.valueOf(FileCount) ; i++)
            allFileList.add(new Attachment()) ;
        return null ;
    }
    
    
     public PageReference attachFile(){
        
            
            /*
            //------To upload multiple attach emails
        if(FileCount == null || FileCount == '')
            ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.ERROR,'Please select how many files you want to upload.'));

        List<Attachment> listToInsert = new List<Attachment>() ;
        
        //Attachment a = new Attachment(parentId = accid, name=myfile.name, body = myfile.body);
        for(Attachment a: allFileList)
        {
            if(a.name != '' && a.name != '' && a.body != null)
                listToInsert.add(new Attachment(parentId = caseID, name = a.name, body = a.body)) ;
        }
        allFileList.clear();
        //Inserting attachments
        if(listToInsert.size() > 0)
        {
            insert listToInsert ;
            system.debug('---attached successfully--'+listToInsert);
             system.debug('---attachment size--'+listToInsert.size());
            ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.INFO, listToInsert.size() + ' file(s) are attached with email and sent successfully'));
            FileCount = '' ;
        }
        else{
            ApexPages.addmessage(new ApexPages.message(ApexPages.Severity.ERROR,'Please select at-least one file'));
         }     
       
           
           // Integer numAtts=[SELECT count() FROM attachment WHERE parentid=: caseId];
        Integer numAtts=listToInsert.size();
        system.debug('Number of Attachments Atts = '+ numAtts);
        List<Messaging.Emailfileattachment> efaList = new List<Messaging.Emailfileattachment>();
            
                 if(numAtts > 0){
                for (Integer i = 0; i < numAtts; i++){
                    //system.debug(listToInsert[i].Name);
                    Messaging.Emailfileattachment efa = new Messaging.Emailfileattachment();
                            efa.setFileName(listToInsert[i].Name);
                    efa.setBody(listToInsert[i].Body);
                    efa.setContentType(listToInsert[i].ContentType);
                    efaList.add( efa );
                }
        }
                 if(numAtts > 0){
          email.setFileAttachments(efaList );
        }
                system.debug('====email==='+email);    
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});  
        system.debug('*****email==='+email);    
        */
        return null;//attachPage = new PageReference('/'+recordId);
    }
    
}