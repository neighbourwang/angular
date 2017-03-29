export class PhysicalModel {
   // id:string;
    pmPoolId:string; //资源池id

    pmName: string;  //物理机id name
    pmId:string;

    iloIPAddress: string;  //ilo信息
    iloUserName: string;
    iloPwd: string;

    macAddress:string; //MAC地址

    sererTypeId: string="";//服务器类型
    serverTypeName:string;

    brandId: string;
    brandName:string;//服务器品牌

    modleName: string; //服务器型号
    modleId: string="";

    model:string;  //物理机品牌

    sn:string;  //物理机序列号

    locale: string;
    description: string;
   // hardwareInfo: HardwareInfo;  

    enterprise: string;  //企业信息
    department: string;
    startDate: string;
    endDate: string;
    applicant: string;
    priIPAddr: string;
    pubIPAddr: string;
    image: string;

    pmHardwareCPU:CPU; //硬件信息
    pmHardwareMemory:Memory;
    pmHardwareDiskList:Array<Disk>;
      toString() {
        return JSON.stringify(this);
    }

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

export class Part{
   // id: string;
  partsId: string;
  partsName: string;
  specList: Array<Space>;
}
export class Space{
    specId: string;
    specName: string;
}

