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
      "disableFlag": string;
      "disk": number;
      "displayName": string;
      "ephemeral": number;
      "id": string;
      "mem": number;
      "name": string;
      "platformId": string;
      "publicFlag": string;
      "ram": number;
      "rxtxCap": number;
      "rxtxFactor": number;
      "rxtxQuota": number;
      "swap": number;
      "uuid": string;
  }
  export{
      Flavor,
      FlavorObj
  }