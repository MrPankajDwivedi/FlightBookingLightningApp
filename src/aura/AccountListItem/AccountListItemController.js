({
    doInit : function(component, event) {
        var action = component.get("c.findAll");
        action.setCallback(this, function(a) {
            component.set("v.accounts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    accountSelected : function(component) {
        var event = $A.get("e.c:AccountSelected");
        event.setParams({"account": component.get("v.account")});
        event.fire();
    }
})