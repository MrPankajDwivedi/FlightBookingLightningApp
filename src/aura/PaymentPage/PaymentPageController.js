({
	 handleApplicationEvent : function (component, event) {
        var message = event.getParam("message");
		var passengers=event.getParam("passengers");
         var flight=event.getParam("flight");
         component.set("v.flight",flight);
         component.set("v.passengers",passengers);
        // set the handler attributes based on event data
       console.log("In payment page");
    },
    bookFlightClient:function(component, event, helper) {
          var p=component.get("v.passengers[0]");
        console.log(p.Id+":"+component.get("v.flight.Id"));
    
        var action = component.get("c.bookFlight");
        
       action.setParams({
            customer:p,
            flight:component.get("v.flight"),
            journeyDate:component.get("v.flight.Journey_Date__c"),
            co_passenger:'Rahul,46,Male;Suman,23,Female'
        });
       
        action.setCallback(this, function(response){
            var name = response.getState();
            if (name === "SUCCESS") {
                console.log("Succesfully booked Booking Id:"+response.getReturnValue().Id);
                window.print();
                
            }else if (response.getState() === "ERROR") {
                $A.log("Errors", response.getError());
            }
        });
    
     $A.enqueueAction(action);    
	}
})