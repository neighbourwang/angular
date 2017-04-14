class PhysicalService {
    "desc": string;
    "phyMachineAreaPoolsProfile": Array<ResourcePoolObj>;
    "phyMachinePartsFlavors": Array<PartsFlavor>;
    "serviceName": string
    constructor() {
        this.phyMachineAreaPoolsProfile = new Array<ResourcePoolObj>();
        this.phyMachinePartsFlavors = new Array<PartsFlavor>();
    }
}
class ResourcePoolObj {
    "areaDisplayName": string;
    "areaID": string;
    "areaName": string;
    "phyMachineResourcPoolsProfile": Array<ResourcePool>;
    constructor() {
        this.areaID = '';
        this.areaName = '';
        this.areaDisplayName = '';
        this.phyMachineResourcPoolsProfile = new Array<ResourcePool>();
    }
}
class ResourcePool {
    "resourcePoolDisplayName": string;
    "resourcePoolId": string;
    "resourcePoolName": string;
    "selected": boolean;
}
class FlatResourcePool {
    "pmPoolId": string;
    "poolName": string;
    "regionId": string;
    "region": string;
    "dataCenter": string;
    "description": string;
    selected: boolean;
}
// class FlatUnitObj {
//     "id": string;
//     "partsId": string;
//     "partsName": string;
//     "specId": string;
//     "specName": string;
//     "specValue": string;
//     "referencePrice": number;
//     selected: boolean
// }
class PartsFlavor {
    "partFlavorNum": number;
    "partsCode": string;
    "partsDisplayName": string;
    "partsFlavorDisplayName": string;
    "partsFlavorValue": string;
    "partsFlavorValueDisplayName": string;
    "partsFlavorValueName": string;
    "partsId": string;
    "partsName": string;
    "specId": string;
    "specName": string;
    selected:boolean;
    constructor(){
        this.partsFlavorValue="";
        this.partsId='';
        this.partsName='';
        this.specId='';
        this.specName='';
        this.partFlavorNum=0;
    }
}
class UnitObj {
    "partsId": string;
    "partsName": string;
    "editable": number
    "specList": Array<Spec>
    constructor(){
        this.specList=new Array<Spec>();
    }
}
class Spec {
    "specId": string;
    "specName": string;
    "editable": number
    "specValues": Array<string>;
    constructor(){
        this.specValues=new Array();
    }
}
export {
    PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj,Spec
}    