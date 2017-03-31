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
    mainEndDate:string;  //维保结束时间
    mainStartDate:string;  //维保开始时间

    // pmHardwareCPU:CPU; 
    // pmHardwareMemory:Memory;
    // pmHardwareDiskList:Array<Disk>;
    //   toString() {
    //     return JSON.stringify(this);
    // }
    //读取的硬件信息 
   partsList:Array<PartHardwareInfo>;

   //部件列表
   partsEntitys:Array<PartsEntitys>;
 }

 export class PartHardwareInfo{
      count: string;
      specName: string;
      specValue: string;
    }
 
 export class PartsEntitys{
    id: string;
    number: string="0";
    partsId: string;
    partsName: string;
    specId: string="";
    specName: string="";
    specValue:string;
    isSelect=false;

 }

 export class Part{
   // id: string;
  partsId: string;
  partsName: string;
  specList: Array<Space>=[];
}
export class Space{
    specId: string;
    specName: string;
    specValues:Array<String>;
}
export class PartList{
    partsId: string;
    partsName: string;
    specId: string="";
    specName: string="";
    specValue:string;
    partsNum:number;
    partsCap:string="";
    isSelect=false;
}



// export class CPU {
//     version: string;
//     value: number;
// }
// export class Memory {
//     version: string;
//     value: number;
// }

// export class Disk {
//     version: string;
//     value: number;
// }

