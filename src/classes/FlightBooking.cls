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
        List<CustomerDetail__c> cust=new List<CustomerDetail__c>();
        cust=[select Name__c, DOB__c, Age__c, Email__c, Mobile_No__c,Government_ID__c, Address__c,Gender__c from CustomerDetail__c where Email__c=:email];
        if(cust.size()>0){
            return cust[0];
        }
        return null;
    } 
    
      @auraEnabled
    public static Booking_Record__c bookFlight(CustomerDetail__c customer,Date journeyDate,FlightDetail__c flight, String co_passenger )
    {
      Booking_Record__c booking=new Booking_Record__c();
       // CustomerDetail__c cust=[select Name__c, DOB__c, Age__c, Email__c, Mobile_No__c,Government_ID__c, Address__c,Gender__c from CustomerDetail__c where Email__c='lpu.pkd@gmail.com' ];
       //System.debug('Customer:'+cust);
       //FlightDetail__c f=[select id,name,from__c,to__c,Journey_Date__c,departure__c,duration__c,arrival__c,fare__c,seats__c from FlightDetail__c where Name='G5765'];
        //System.debug('Flight:'+f);
      //  
        booking.Customer__c=customer.Id;
        booking.Flight__c=flight.Id;
        booking.Journey_Date__c=journeyDate;
        booking.Co_Passenger__c=co_passenger;
        insert booking;
        return booking;
       
    } 
    
     @auraEnabled
    public static CustomerDetail__c updateCustomer(CustomerDetail__c customer)
    {
      CustomerDetail__c cus=customer;
	
        upsert cus;
      //  system.debug('Age:'+cus.Age__c);
        //CustomerDetail__c cus1=[select Name__c, DOB__c, Age__c, Email__c, Mobile_No__c,Government_ID__c, Address__c,Gender__c from CustomerDetail__c where Id=:cus.d];
  		
      return FlightBooking.getCustomerByEmail(cus.Email__c);
       
    } 
    
    @AuraEnabled 
    public static void sendMailMethod(String mMail ,String mSubject ,String mbody){
    
     List<Messaging.SingleEmailMessage> mails =  new List<Messaging.SingleEmailMessage>();     
  
     // Step 1: Create a new Email
       Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    
    // Step 2: Set list of people who should get the email
       List<String> sendTo = new List<String>();
       sendTo.add(mMail);
       mail.setToAddresses(sendTo);
    
    // Step 3: Set who the email is sent from
       mail.setReplyTo('noreply@flight.com'); // change it with your mail address.
       mail.setSenderDisplayName('salesforce User'); 
    
    // Step 4. Set email contents - you can use variables!
      mail.setSubject(mSubject);
      mail.setHtmlBody(mbody);
    
    // Step 5. Add your email to the master list
      mails.add(mail);
    
  // Step 6: Send all emails in the master list
     Messaging.sendEmail(mails);
}
    
    public static List<String> getCityList(){
        
       List<FlightDetail__c> flights= [Select  from__C,to__C from FlightDetail__c];
        List<String> Cities=new List<String>();
        for(FlightDetail__c f:flights){
            Cities.add(''+f.from__c);
              Cities.add(''+f.to__c);
		}
         Set<String> cityset = new Set<String>(Cities);
        Cities.clear();
        Cities=new List<String>(citySet);
        return  Cities;
        }
}