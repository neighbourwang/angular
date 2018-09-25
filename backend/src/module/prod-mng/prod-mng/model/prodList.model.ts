export class ProdList {

    "id": string;
      "code": number;
      "name": string;
      "serviceId": string;
      "serviceName": string;
      "serviceType": string;
      "serviceSpecification": string;
      "specContent":any;
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
    phyMachinePartsFlavors:Array<PartsFlavor>;
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
class PartsFlavor {
    "partFlavorNum": number;
    "partsCode": string;
    "partsDisplayName": string;
    "partsFlavorDisplayName": string;
    "partsFlavorValue": number;
    "partsFlavorValueDisplayName": string;
    "partsFlavorValueName": string;
    "partsId": string;
    "partsName": string;
    "specId": string;
    "specName": string;
    "capacity": number;
    selected: boolean;
    constructor() {
        this.partsFlavorValue = 0;
        this.partsId = '';
        this.partsName = '';
        this.specId = '';
        this.specName = '';
        this.partFlavorNum = 0;
        this.capacity = 0;
    }
}