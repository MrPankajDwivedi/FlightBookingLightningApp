@isTest
public class TestPolicySelectorClass {
    @isTest static void testPolicy(){
		IP_Customer__c cus=new IP_Customer__c();
        cus.Customer_Name__c='Rahul';
        cus.Email__c='lpu.pkd3@gmail.com';
        cus.No_of_Children__c='0';
        cus.DOB__c=date.ValueOf('1993-09-21');
        cus.Income__c=150000;
        cus.Marital_status__c='Single';
        cus.Terms_Agreements__c=True;
        insert cus;
       
    }
    
    
}