export class PhysicalModel {
    id:string;
    pmName: string;
    pmId:string;
    iloIPAddress: string;
    pmPoolId:string;
    macAddress:string;
    iloUserName: string;
    iloPwd: string;
    sererTypeId: string="";
    serverTypeName:string;
    brandId: string;
    brandName:string;
    modelName: string;
    modelId: string="";
    model:string;
    sn:string;
    locale: string;
    description: string;
   // hardwareInfo: HardwareInfo;  
    enterprise: string;
    department: string;
    startDate: string;
    endDate: string;
    applicant: string;
    priIPAddr: string;
    pubIPAddr: string;
    image: string;
    pmHardwareCPU:CPU;
    pmHardwareMemory:Memory;
    pmHardwareDiskList:Array<Disk>;

}
 
export class CPU {
    version: string;
    value: number;
}
export class Memory {
    version: string;
    value: number;
}

export class Disk {
    version: string;
    value: number;
}


