({
    searchFlight : function(component, event, helper) {
        
        var flight=component.get("v.flight");
        
        //START Validation 
        var errors=  component.get("v.errors");
        errors=[];
        var from=component.find("fromCity").get("v.value");
        if(from==''){
            errors.push("Enter Source city");
        }
        var from=component.find("toCity").get("v.value");
        if(from==''){
            errors.push("Enter Destination city");
        }
        var from=component.find("journeyDate").get("v.value");
        if(from==''){
            errors.push("Enter Date of Travel");
            
        }
        component.set("v.errors",errors);
          //END Validation 
        
        if(flight.from__c!=''&&flight.to__c&&flight.Journey_Date__c){
            console.log(flight.from__c);
            var action = component.get("c.getSearchFlights");
            action.setParams({
                "from_c":flight.from__c,
                "to_c":flight.to__c,
                
            });
            action.setCallback(this, function(response){
                var name = response.getState();
                if (name === "SUCCESS") {
                    component.set("v.Flights",response.getReturnValue());
                    if(response.getReturnValue()==''){
                         errors.push("Opps..!!! No Direct Flight");
                          component.set("v.errors",errors);
                        
                    }
                    
                }else{
                    component.set("v.result", "No data");
                }
            });
            $A.enqueueAction(action);
        }else{
           //  alert("Please Enter correct infromation");
        }
       
    },
    gotoURL : function(component, event, helper) {
        //  var indexvar = event.getSource().get("v.label");
        //  
        var idx = event.getSource().get("v.value");
        var cmpEvent=component.getEvent("bubblingEvent");
        cmpEvent.setParams({"ComponentAction":"SearchFlight_next"});
        cmpEvent.fire();
        
        
         var flights=component.get("v.Flights");
         console.log("indexvar:::" +flights[idx].Name);
       
         var appEvent = $A.get("e.c:aeEvent");
        appEvent.setParams({
            "message" : "Flight data set",
                "flight":flights[idx]
            });
        appEvent.fire();
       
    }
    
})