({
     
    getCustomerDetails:function(component, event, helper) {
    
  /*  var isValidEMail=true;
    var emailField=component.find("customerEmail");
    var emailFieldValue=emailField.get("v.value");
    
    var regExpEmailFormat=/^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a–zA–Z\–0–9]+\.)+[a–zA–Z]{2,}))$/
    
    if(!$A.util.isEmpty(emailFieldValue)){
    if(emailFieldValue.match(regExpEmailFormat)){
    emailField.set("v.errors",[{message:null}]);
    $A.util.removeClass(emailField,"slds-has-error");
    isValidEMail=true;
    
    }else{
    
    $A.util.addClass("v.errors","slds-has-error");
    emailField.set("v.errors",[{message:"Please a valid Emial.."}]);
   isValidEMail=false;
    }
    }*/
    
    
    
     var isValidEMail=true;
    var emailField=component.find("customerEmail");
    var emailFieldValue=emailField.get("v.value");
    
    var regExpEmailFormat=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
   
    if(emailFieldValue.match(regExpEmailFormat)){
  
    isValidEMail=true;
    console.log("Is a email");
    
    }else{
    
    
   isValidEMail=false;
    console.log("NOT a email");
    }
    
    
   
    
	var email=component.get("v.passenger.Email__c"); 
  
     var status=component.get("v.customer_status");
    if(email!=''&&isValidEMail){
         var action = component.get("c.getCustomerByEmail");
      var spinner = component.find("search_customer_spinner");
    action.setParams({
        email:component.get("v.passenger.Email__c")
    });
    if(email!=''&&isValidEMail){
            $A.util.toggleClass(spinner, "slds-hide");
         action.setCallback(this, function(response){
        var name = response.getState();
        if (name === "SUCCESS") {
           
            if(response.getReturnValue()!=''){
                component.set("v.customer_status","Customer Details found Please Review them..!!!");
                document.getElementById("customer_status").style.color="Green";
                   component.set("v.passenger",response.getReturnValue());
                   var errors=[];
                   component.set("v.errors",errors);
            }
           
             $A.util.toggleClass(spinner, "slds-hide");      
        }else if (response.getState() === "ERROR") {
            $A.log("Errors", response.getError());
              component.set("v.customer_status","Customer Details Not found Please Add ..!!!");
                document.getElementById("customer_status").style.color="Red";
                 var errors=[];
                   component.set("v.errors",errors);
                 var cus={'sobjectType':'CustomerDetail__c',
                
                  'Email__c':email,
                  
                 }
                    component.set("v.passenger",cus);
             $A.util.toggleClass(spinner, "slds-hide");      
        }
    });

 $A.enqueueAction(action);   
    }else{
        
    }
    }else{
          var errors=  component.get("v.errors");
    errors=[];
  
        errors.push("Enter Valid Email");
        component.set("v.errors",errors);
   
    }
   
    
},

goToEdit : function(component, event, helper) {
  var index=event.getSource().get("v.value");
     document.getElementById('Co_Passenger').style.display = 'none'; 
      document.getElementById('Passenger1').style.display = 'none'; 
    console.log("Value cliced:"+index);  
    if(index==0){
        document.getElementById('Passenger1').style.display = 'block'; 
        document.getElementById('Passenger1').scrollIntoView();
        var passengers=component.get("v.passengers");   
        console.log(passengers[index].Name__c);
        component.set("v.passenger",passengers[index]);
    }else{
        document.getElementById('Co_Passenger').style.display = 'block'; 
        document.getElementById('Co_Passenger').scrollIntoView();
        var passengers=component.get("v.passengers");   
        console.log(passengers[index].Name__c);
        component.set("v.co_passenger",passengers[index]); 
        component.set("v.customerIndex",index);
    }  
},

AddPassenger: function(component, event, helper) {
   var error=false;
    //START Validation 
    var errors=  component.get("v.errors");
    errors=[];
    //console.log("error");
       var name=component.find("name").get("v.value");
     console.log(name);
    if(name==''){
        errors.push("Enter Customer Name");
         console.log("error name");
        error=true;
    }
    var dob=component.find("dob").get("v.value");
    if(dob==''){
        errors.push("Enter DOB");
         error=true;
    }
    var gender=component.find("gender__ddl").get("v.value");
    if(gender==''){
        errors.push("Enter Gender");
         error=true;
    }
       var mobile=component.find("mobile").get("v.value");
    if(mobile==''){
        errors.push("Enter Mobile No.");
         error=true;
    }
        var gov_id=component.find("government_id").get("v.value");
    if(gov_id==''){
        errors.push("Enter Government ID");
         error=true;
    }
        var address=component.find("address").get("v.value");
    if(address==''){
        errors.push("Enter address");
         error=true;
    }
    component.set("v.errors",errors);
    
  
    //END Validation 
    if(!error){
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
    document.getElementById('Co_Passenger').style.display = 'block';
    
      //update in database
     console.log("Upadte customer1");
    var action = component.get("c.updateCustomer");
     console.log("Upadte customer2");
        action.setParams({
            "customer":p,   
        });
     console.log("Upadte customer3");
        action.setCallback(this, function(response){
            var name = response.getState();
            if (name === "SUCCESS") {
                console.log("Successful");
                component.set("v.passenger",response.getReturnValue());
                
                  
                component.set("v.passengers[0]",response.getReturnValue());
                
             
                console.log("Age:"+response.getReturnValue().Name__c+""+response.getReturnValue().Age__C);
                if(response.getReturnValue()==''){
                    console.log("Error ");
                   
                }
				  document.getElementById('PassengerDeatils').scrollIntoView();                
            }else{
                console.log("un-Successful ");
			}
        });
    
        $A.enqueueAction(action);
    
    }
   
   
},

Add_Co_Passenger:function(component) {
      document.getElementById('PassengerDeatils').scrollIntoView();
    var num=component.get("v.number_of_passenger");
    var p=component.get("v.co_passenger");
    var passengers=component.get("v.passengers"); 
    if(p!=null&&p.Name__c!=''&&p.Age__c&&p.Gender__c){
          var customer={'sobjectType':'CustomerDetail__c',
                  'Name__c':p.Name__c,
                  'Age__c':p.Age__c,
                  'Gender__c':p.Gender__c,
                 }
  //  console.log(passengers);
   var index=component.get("v.customerIndex");
    if(index==0){
          passengers.push(customer);
          p.Name__c='';
          p.Age__c='';
          p.Gender__c='';
          component.set("v.co_passenger", p);
          
    }else{
        passengers[index]=customer;
           p.Name__c='';
          p.Age__c='';
          p.Gender__c='';
          component.set("v.co_passenger", p);
    }
  
  //  console.log(passengers);         
    component.set("v.passengers",passengers);
    }else{
         var errors=  component.get("v.errors1");
    errors=[];
        errors.push('Enter All Details');
        component.set('v.errors1',errors);
    }
  
 
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
    
    
    
      var inputCmp = component.find("btnGoToPayment");
    var value = inputCmp.get("v.value");

   
    
    var passengers=component.get("v.passengers");
    if(passengers.length>0){
        var cmpEvent=component.getEvent("bubblingEvent");
        cmpEvent.setParams({"ComponentAction":"AddPassengers_next"});
        cmpEvent.fire();
        var appEvent = $A.get("e.c:aeEvent");
        appEvent.setParams({
            "message" : "Passenger Add",
            "passengers":passengers,
            "flight":component.get("v.flight")
        });
        appEvent.fire();
    }else{
        //START Validation 
        var errors=  component.get("v.errors");
        errors=[];
        errors.push("Enter Atleast one passenger Detail");
        component.set("v.errors",errors);
        document.getElementById('PassengerDeatils').scrollIntoView();
        //END Validation 
        }
        
    },
    
    
})