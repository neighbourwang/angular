export class PhysicalListModel{ 
    pmId:string;    
    pmName:string;
    pmSN:string;        
    pmBrand: string;
    pmModel: string;
    pmCPUCores: number; //cpu核数
    pmRAM: number;     //内存
    pmDiskInfo: string;  //硬盘
    pmPriIPAddr:string;
    pmPubIPAddr:string;
    pmILOAddr: string;
    pmLocation: string;
    pmPowerStatus: string;  //电源状态
    pmUseageStatus: string;   //使用状态
    pmMainStatus: string;   //运维状态
    pmHealthExam: string;   //健康检查
    partsNumber:string;
    isSelect=false;

}