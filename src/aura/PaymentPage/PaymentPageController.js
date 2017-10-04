({
	 handleApplicationEvent : function (component, event) {
        var message = event.getParam("message");
		var passengers=event.getParam("passengers");
         var flight=event.getParam("flight");
         component.set("v.flight",flight);
         component.set("v.passengers",passengers);
        // set the handler attributes based on event data
       console.log("In payment page");
    }
})