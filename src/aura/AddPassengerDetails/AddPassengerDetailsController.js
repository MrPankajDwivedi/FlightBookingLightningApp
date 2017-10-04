({
     
    getCustomerDetails:function(component, event, helper) {
		var email=component.get("v.passenger.Email__c"); 
        console.log(email); //validation to email is pending
        
        
        var action = component.get("c.getCustomerByEmail");
        
        action.setParams({
            email:component.get("v.passenger.Email__c")
        });
        
        action.setCallback(this, function(response){
            var name = response.getState();
            if (name === "SUCCESS") {
                component.set("v.passenger",response.getReturnValue());
                
            }else if (response.getState() === "ERROR") {
                $A.log("Errors", response.getError());
            }
        });
    
     $A.enqueueAction(action);    
	},
	goToEdit : function(component, event, helper) {
	document.getElementById('Passenger1').scrollIntoView();
      var index=event.getSource().get("v.value");
        console.log("Value cliced:"+index);  
        if(index==0){
            document.getElementById('Passenger1').style.display = 'block'; 
            var passengers=component.get("v.passengers");   
            console.log(passengers[index].Name__c);
            component.set("v.passenger",passengers[index]);
        }else{
            document.getElementById('Co_Passenger').scrollIntoView();
            var passengers=component.get("v.passengers");   
            console.log(passengers[index].Name__c);
            component.set("v.co_passenger",passengers[index]);
            var a = component.get('c.update_Co_Passenger');
            $A.enqueueAction(a);
            
        }  
	},
    AddPassenger: function(component) {
        document.getElementById('PassengerDeatils').scrollIntoView();
        var num=component.get("v.number_of_passenger");
        var p=component.get("v.passenger");
        var customer={'sobjectType':'CustomerDetail__c',
                      'Name__c':p.Name__c,
                      'Email__c':p.Email__c,
                      'DOB__c':p.DOB__c,
                      'Age__c':p.Age__c,
                      'Mobile_No__c':p.Mobile_No__c,
                      'Gender__c':component.find("gender__ddl").get("v.value")
                     }
        console.log("Customer:"+customer.Name__c);
        
        
        // var passenger=component.get("v.passenger"); 
        var passengers=component.get("v.passengers"); 
        console.log(passengers);
        passengers[0]=p;
        console.log(passengers);         
        component.set("v.passengers",passengers);
        num=num+1;
        console.log("Number:"+num);
        component.set("v.number_of_passenger",num);
        document.getElementById('Passenger1').style.display = 'none';
    },
    Add_Co_Passenger:function(component) {
          document.getElementById('PassengerDeatils').scrollIntoView();
        var num=component.get("v.number_of_passenger");
        var p=component.get("v.co_passenger");
        var customer={'sobjectType':'CustomerDetail__c',
                      'Name__c':p.Name__c,
                      'Age__c':p.Age__c,
                      'Gender__c':component.find("gender__ddl").get("v.value")
                     }
        console.log("Customer:"+customer.Name__c);
        
        
        // var passenger=component.get("v.passenger"); 
        var passengers=component.get("v.passengers"); 
        console.log(passengers);
        passengers.push(customer);
        console.log(passengers);         
        component.set("v.passengers",passengers);
        num=num+1;
        console.log("Number:"+num);
        component.set("v.number_of_passenger",num);
        
        
        
    },
      update_Co_Passenger:function(component,index) {
          document.getElementById('PassengerDeatils').scrollIntoView();
        var num=component.get("v.number_of_passenger");
        var p=component.get("v.co_passenger");
        var customer={'sobjectType':'CustomerDetail__c',
                      'Name__c':p.Name__c,
                      'Age__c':p.Age__c,
                      'Gender__c':component.find("gender__ddl").get("v.value")
                     }
        console.log("Customer:"+customer.Name__c);
        
        
        // var passenger=component.get("v.passenger"); 
        var passengers=component.get("v.passengers"); 
        console.log(passengers);
        passengers[index]=customer;
        console.log(passengers);         
        component.set("v.passengers",passengers);
        num=num+1;
        console.log("Number:"+num);
        component.set("v.number_of_passenger",num);
        
        
        
    },
    handleAppData:function(component, event, helper){
        
        var message = event.getParam("message");
        
        // set the handler attributes based on event data
        console.log(message);
        // var params=event.getParam("flight");
        //  var flight=params.flight;
        //console.log(flight);
        //  component.set("v.flight",params);
        
    },
    handleApplicationEvent : function (component, event) {
        var message = event.getParam("message");
        var flight=event.getParam("flight");
        component.set("v.flight",flight);
        // set the handler attributes based on event data
        console.log(message+flight.Name);
    },
    goToPayment: function (component, event) {
          var cmpEvent=component.getEvent("bubblingEvent");
        cmpEvent.setParams({"ComponentAction":"AddPassengers_next"});
        cmpEvent.fire();
        var passengers=component.get("v.passengers");
        var appEvent = $A.get("e.c:aeEvent");
        appEvent.setParams({
            "message" : "Passenger Add",
                "passengers":passengers,
            "flight":component.get("v.flight")
            });
        appEvent.fire();
    },
    
    
})