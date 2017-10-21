@isTest
private class FlightBookingTest {
    static testmethod void test_getAllFlights() {
        
        List<FlightDetail__c> flights=FlightBooking.getAllFlights();
        Integer totalFlight=[select count() from FlightDetail__C];
        System.assertEquals(totalFlight, flights.size());
        
    }
    static testmethod void test_getSearchFlights() {
        
        List<FlightDetail__c> flights=FlightBooking.getSearchFlights('Lucknow','Kanpur',system.today());
        Integer totalFlight=[select count() from FlightDetail__C where from__c='Lucknow' AND to__c='Kanpur'];
        System.assertEquals(totalFlight, flights.size());
        
    }
    
    static testmethod void test_getCustomerByEmail() {
         CustomerDetail__c customer=new CustomerDetail__c();
         customer.Name__c='PankajDwivedi';
         customer.Email__c='pankaj.dwivedi2@cognizant.com';
         insert customer;
        CustomerDetail__c cus=FlightBooking.getCustomerByEmail('pankaj.dwivedi2@cognizant.com');
             System.assertEquals(cus.id, customer.id);
      	   CustomerDetail__c cus1=FlightBooking.getCustomerByEmail('noemail@cognizant.com');
        if(cus1!=null){
             System.assertEquals(cus1.id, customer.id);
}
            
        
       
        
    }
   
     static testmethod void test_bookFlight() {
        FlightDetail__c flight=new FlightDetail__c();
         flight.Name='3505'; 
         flight.from__c='Lucknow';
         flight.to__c='Bangalore';
         flight.Journey_Date__c=system.today();
         flight.Departure__c='12:30';
         flight.Arrival__c='02:30';
         flight.Duration__c='02:00';
      	 insert flight;
         CustomerDetail__c customer=new CustomerDetail__c();
         customer.Name__c='PankajDwivedi';
         customer.Email__c='pankaj.dwivedi2@cognizant.com';
         insert customer;
         Booking_Record__C booking=FlightBooking.bookFlight(customer, system.today(), flight,'');

        
    }
    static testmethod void test_updateCustomer() {
         CustomerDetail__c customer=new CustomerDetail__c();
         customer.Name__c='PankajDwivedi';
         customer.Email__c='oldemail@cognizant.com';
         insert customer;
        customer.Email__c='newemail@gmail.com';
        CustomerDetail__c cus=FlightBooking.updateCustomer(customer);
             System.assertEquals(cus.id, customer.id);
        System.assertEquals(cus.email__c, customer.email__C);
      
    }
   static testmethod void test_sendMailMethod() {
        FlightBooking.sendMailMethod('pankaj.dwivedi2@cognizant.com', 'Test Class', 'This is test class method.You would not recieve any email');
                  
    }
    
   
    
}