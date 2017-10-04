global with sharing  class FlightBooking {
@auraEnabled
    public static List<FlightDetail__c> getAllFlights()
    {
      List<FlightDetail__c> reg=new LIST<FlightDetail__c>();  
        reg=[select id,name,from__c,to__c,Journey_Date__c,departure__c,duration__c,arrival__c,fare__c,seats__c from FlightDetail__c ];
        return reg;
    } 
    
    @auraEnabled
    public static List<FlightDetail__c> getSearchFlights(String from_c,String to_c,Date jdate)
    {
      List<FlightDetail__c> reg=new LIST<FlightDetail__c>();  
        reg=[select id,name,from__c,to__c,Journey_Date__c,departure__c,duration__c,arrival__c,fare__c,seats__c from FlightDetail__c where from__c=:from_c And to__c=:to_c ];
        return reg;
    } 
    
     @auraEnabled
    public static CustomerDetail__c getCustomerByEmail(String email)
    {
       
        CustomerDetail__c reg=[select Name__c, DOB__c, Age__c, Email__c, Mobile_No__c,Government_ID__c, Address__c from CustomerDetail__c where Email__c=:email ];
        return reg;
    } 
}