trigger FlightTravelTime on FlightDetail__c (before insert,before update) {

    List<FlightDetail__c> flightList=null;
    for(FlightDetail__c newFlight : trigger.new) {
        
        String[] departure=newFlight.Departure__c.split(':');
        Integer departure_hour=Integer.valueOf(departure[0]);
        Integer  departure_min=Integer.valueOf(departure[1]);
        
        String[] t2=newFlight.Duration__c.split(':');
        Integer t2h=Integer.valueOf(t2[0]);
        Integer t2m=Integer.valueOf(t2[1]);
        
 
        newFlight.Arrival__c=math.mod((departure_hour+t2h+((departure_min+t2m)/60)),24)+':'+(math.mod((departure_min+t2m), 60));
      
       // flightList.add(newItem);
    }
    
    
}