export class ProdList {

    "id": string;
      "code": number;
      "name": string;
      "serviceId": string;
      "serviceName": string;
      "serviceType": string;
      "serviceSpecification": string;
      "billingCycle": number;
      "recurringPrice": number;
      "basicPrice": number;
      "onetimePrice": number;
      "status": number;
      "description": string;
      "isSelected" : boolean
      dataBaseServiceTemplateSpecResp: DatabaseSpec;
      middleWareServiceTemplateSpecResp:{
        serviceTemplateId: string;
        serviceTemplateName: string;
        deploymentMode: string;
        version: string;
        middleWareType: string;
       
    };
}
class DatabaseSpec {
    serviceTemplateId: string;
    serviceTemplateName: string;
    deploymentMode: number;
    version: string;
    dbType: number;
     constructor(){
            this.serviceTemplateId='';
        this.serviceTemplateName='';
        this.deploymentMode=0;
        this.version='';
        this.dbType=0;
        }
}