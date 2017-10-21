({
	 handleApplicationEvent : function (component, event) {
        var message = event.getParam("message");
		var passengers=event.getParam("passengers");
         var flight=event.getParam("flight");
         component.set("v.flight",flight);
         component.set("v.passengers",passengers);
        // set the handler attributes based on event data
       console.log("In payment page");
           document.getElementById("successfulBookingDiv").style.display="none";
           document.getElementById("order_status").style.color="Red";
    },
    bookFlightClient:function(component, event, helper) {
          var p=component.get("v.passengers[0]");
        var f=component.get("v.flight");
        console.log(p.Id+":"+component.get("v.flight.Id"));
       
      document.getElementById("confirmBtnDiv").style.display="none";
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
                component.set("v.orderStatus","Successfully booked(#"+response.getReturnValue().Id+")");
				 document.getElementById("order_status").style.color="Green";            
                //   window.print();
                helper.sendHelper(component,p.Email__c, 
                                  'Booking Confirmation Flight :'+f.Name+' Order ID:'+response.getReturnValue().Id, 
                                  'Greeting '+p.Name__c+",\nYour Ticket successfully booked.\n Regards \nPankaj Dwivedi\nFlight.com");
              document.getElementById("successfulBookingDiv").style.display="block";
                
            }else if (response.getState() === "ERROR") {
                $A.log("Errors", response.getError());
            }
        });
    
     $A.enqueueAction(action);    
	},
    print:function(cmp){
    window.print();
   },
    newBooking:function(component, event, helper){
       var idx = event.getSource().get("v.value");
        var cmpEvent=component.getEvent("bubblingEvent");
        cmpEvent.setParams({"ComponentAction":"Booking_back"});
        cmpEvent.fire();
        location.reload();
	}
})