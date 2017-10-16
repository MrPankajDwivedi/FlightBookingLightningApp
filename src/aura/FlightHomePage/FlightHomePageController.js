({
	doInit: function(component, event, helper) {
		var toggleText=component.find("PaymentDiv");
        $A.util.addClass(toggleText,'toggle');
         toggleText=component.find("PassengerDiv");
        $A.util.addClass(toggleText,'toggle');
	},
    handleBubbling: function(component, event, helper) {
		var params=event.getParams();
        var navigateAction=params.ComponentAction;
        switch(navigateAction){
            case "SearchFlight_next":
                var bookingDiv=component.find("BookingDiv");
                $A.util.addClass(bookingDiv,'toggle');
                 var paymentDiv=component.find("PaymentDiv");
                $A.util.addClass(paymentDiv,'toggle');
                var passengerDiv=component.find("PassengerDiv");
                $A.util.removeClass(passengerDiv,'toggle');
                break;
            case "AddPassengers_next":
                 var bookingDiv=component.find("BookingDiv");
                $A.util.addClass(bookingDiv,'toggle');
                 var paymentDiv=component.find("PaymentDiv");
                $A.util.removeClass(paymentDiv,'toggle');
                var passengerDiv=component.find("PassengerDiv");
                $A.util.addClass(passengerDiv,'toggle');
                break;
            case "Booking_back":
                var bookingDiv=component.find("BookingDiv");
                $A.util.removeClass(bookingDiv,'toggle');
                var paymentDiv=component.find("PaymentDiv");
                $A.util.addClass(paymentDiv,'toggle');
                var passengerDiv=component.find("PassengerDiv");
                $A.util.addClass(passengerDiv,'toggle');
                break;
                
        }
	}
})