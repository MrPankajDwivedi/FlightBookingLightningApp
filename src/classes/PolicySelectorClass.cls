public class PolicySelectorClass {
              public static void SuggestedPolicy(List<IP_Customer__c> CusObj){
       
              
             for(integer i=0;i<CusObj.size();i++){
                 CusObj[i].Policy_1__c='No Policy';
                 CusObj[i].Policy_2__c='No Policy';
                 CusObj[i].Policy_3__c='No Policy';
                 integer policyCount=0;
                        List<IP_Policies__c> policies = [select IP_Policies__c.Policy_Name__c,
                                                     IP_Policies__c.AgeLower__c,
                                                     IP_Policies__c.AgeUpper__c,
                                                     IP_Policies__c.IncomeLower__c,
                                                     IP_Policies__c.IncomeUpper__c,
                                                     IP_Policies__c.Marital_status__c,
                                                     IP_Policies__c.Health_Status__c
                                                     from IP_Policies__c];
                        for(integer j=0;j<policies.size();j++){
                            if(
                               CusObj[i].Age__c>=policies[j].AgeLower__c 
                                && CusObj[i].Age__c<=policies[j].AgeUpper__c
                              
                               && CusObj[i].Income__c>=policies[j].IncomeLower__c
                               && CusObj[i].Income__c<=policies[j].IncomeUpper__c
                                 
                                && CusObj[i].Marital_status__c==policies[j].Marital_status__c
                                 
                              ){ if(policyCount==0){
                                       CusObj[i].Policy_1__c=policies[j].Policy_Name__c;
                                      CusObj[i].Policy_1_Link__c=policies[j].Id; }
                                 if(policyCount==1){
                                      CusObj[i].Policy_2__c=policies[j].Policy_Name__c;
                                      CusObj[i].Policy_2_Link__c=policies[j].Id; }
                                  if(policyCount==2){
                                       CusObj[i].Policy_3__c=policies[j].Policy_Name__c;
                                       CusObj[i].Policy_3_Link__c=policies[j].Id; }
                                      policyCount++;
                              
                                  
                       						 }
                      
                           
						}
                 
                
             
             }
                  
                  
                  
                    }
                   
            }