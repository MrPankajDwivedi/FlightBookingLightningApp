trigger IPCustomerTrigger on IP_Customer__c (before insert, before update) {
  PolicySelectorClass.SuggestedPolicy(Trigger.new);
}