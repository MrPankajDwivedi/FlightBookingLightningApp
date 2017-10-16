({
    
    
    test : function(component, event, helper) {
        var key=component.get('v.search');
        var result=component.get('v.result');
        result=[];	
        console.log(key);
        var people = ['Steven', 'Sean', 'Stefan', 'Sam', 'Nathan'];
        var reg = new RegExp(key.split('').join('\\w*').replace(/\W/, ""), 'i');
        people.filter(function(person) {
           if (person.match(reg)) {
               console.log("matched: "+person);
               result.push(person);
           }else{
             // console.log("Not matched: "+person); 
           }
       });
        component.set("v.result",result);
        if(result.length==1){
           console.log(result[0]);        
        }
    },
    clicked : function(component, event, helper) {
       var name=event.getSource().get("v.value");

       component.set("v.result",null);
        console.log('clicked'+ name);
           component.set("v.search",name);
    }
    
})