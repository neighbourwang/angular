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
    "region": string;
    "regionId": string;
    "phyMachineResourcPoolsProfile": Array<ResourcePool>;
    constructor() {
        this.regionId = '';
        this.region = '';
        this.areaDisplayName = '';
        this.phyMachineResourcPoolsProfile = new Array<ResourcePool>();
    }
}
class ResourcePool {
    "resourcePoolDisplayName": string;
    "pmPoolId": string;
    "poolName": string;
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
class FlatUnitObj {
    "id": string;
    "partsId": string;
    "partsName": string;
    "specId": string;
    "specName": string;
    "specValue": string;
    "referencePrice": number;
    isEdit: boolean;
    temPrice:number;
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
    "capacity":number;
    selected:boolean;
    constructor(){
        this.partsFlavorValue=0;
        this.partsId='';
        this.partsName='';
        this.specId='';
        this.specName='';
        this.partFlavorNum=0;
        this.capacity=0;
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
    PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj,Spec,FlatUnitObj
}    