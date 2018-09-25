class Flavor{
    "id": string;
      "name": string;
      "displayName": string;
      "memSize": number;
      "diskSize": number;
      "publicFlag": boolean
      "description": string;
      "updateDate": string;
      "status": number;
      "uuid": string;
      "vcpu": number 
}
class FlavorObj{
      "code": string;
      "cpu": number;
      cpuValid:boolean;
      "disableFlag": string;
      "disk": number;
      diskValid:boolean;
      "displayName": string;
      "ephemeral": number;
      "id": string;
      "mem": number;
      memValid:boolean;
      "name": string;
      nameValid:boolean;
      "platformId": string;
      "publicFlag": string;
      "ram": number;
      "rxtxCap": number;
      "rxtxFactor": number;
      "rxtxQuota": number;
      "swap": number;
      "uuid": string;
      constructor(){
          this.nameValid=true;
          this.cpuValid=true;
          this.memValid=true;
          this.diskValid=true;
      }
  }
  export{
      Flavor,
      FlavorObj
  }