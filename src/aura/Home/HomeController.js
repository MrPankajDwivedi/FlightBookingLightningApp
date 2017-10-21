({
    
  
    
    fromCityAutoSuggestion : function(component, event, helper) {
        var key=component.get('v.flight.from__c');
        var result=component.get('v.fromCities');
        result=[];	
        console.log(key);
     
        var people = ['Kanpur', 'Lucknow', 'Bangalore', 'Delhi','Bangalore2'];
        if(key!=null&&key.length>2){
             var reg = new RegExp(key.split('').join('\\w*').replace(/\W/, ""), 'i');
        people.filter(function(person) {
           if (person.match(reg)) {
               console.log("matched: "+person);
               result.push(person);
           }else{
             // console.log("Not matched: "+person); 
           }
       });
        
        component.set("v.fromCities",result);
        }else{
             component.set("v.fromCities",null);
        }
       
        if(result.length==1){
           console.log(result[0]);        
        }
    },
    from_clicked : function(component, event, helper) {
       var name=event.getSource().get("v.value");

       component.set("v.fromCities",null);
        console.log('clicked'+ name);
           component.set("v.flight.from__c",name);
    },
    
    toCityAutoSuggestion : function(component, event, helper) {
        var key=component.get('v.flight.to__c');
        var result=component.get('v.toCities');
        result=[];	
        console.log(key);
        if(key!=null&&key.length>2){
        var people = ['Kanpur', 'Lucknow', 'Bangalore', 'Delhi'];
        var reg = new RegExp(key.split('').join('\\w*').replace(/\W/, ""), 'i');
        people.filter(function(person) {
           if (person.match(reg)) {
               console.log("matched: "+person);
               result.push(person);
           }else{
             // console.log("Not matched: "+person); 
           }
       });
        
        component.set("v.toCities",result);
        }else{
             component.set("v.toCities",null);
        }
        if(result.length==1){
           console.log(result[0]);        
        }
    },
    to_clicked : function(component, event, helper) {
       var name=event.getSource().get("v.value");

       component.set("v.toCities",null);
        console.log('clicked'+ name);
           component.set("v.flight.to__c",name);
    },
    
    searchFlight : function(component, event, helper) {
        var error=false;
        var flight=component.get("v.flight");
         var spinner = component.find("search_flight_spinner");
      
    //   console.log(event.getParams().KeyCode+"");
        //START Validation 
        var errors=  component.get("v.errors");
        errors=[];
        var from=component.find("fromCity").get("v.value");
        if(from==''){
            console.log('From '+from);
            errors.push("Enter Source city");
            error=true;
        }
        var from=component.find("toCity").get("v.value");
        if(from==''){
            errors.push("Enter Destination city");
             error=true;
        }
        var from=component.find("journeyDate").get("v.value");
        if(from==''){
            errors.push("Enter Date of Travel");
             error=true;
        }
        if(!error){
              $A.util.toggleClass(spinner, "slds-hide");
        }
        component.set("v.errors",errors);
          //END Validation 
        
        if(flight.from__c!=''&&flight.to__c&&flight.Journey_Date__c){
          //  console.log(flight.from__c);
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
					  $A.util.toggleClass(spinner, "slds-hide");                    
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