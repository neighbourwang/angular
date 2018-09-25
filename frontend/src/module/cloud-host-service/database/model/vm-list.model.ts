class pageParameter{
    currentPage: number = 0;
    offset: number = 0;
    size: number = 20;
    sort: {};
    totalPage: number = 0;
}

class QuiryVmList {
  pageParameter: pageParameter = new pageParameter();
  addonType : string = "" //  数据库附加服务类型: 参考数据字典COMPUTE_INSTANCE->ADDON_TYPE ,   ✅
  labelId : string = "" //  UI所选择的标签 ,  
  ownerType : string = "" //  实例归属 ,  ✅
  platformId : string = "" //  UI所选择的区域ID , ✅
  queryField : string = "0" //  数据库检索的字段列表，取数据字典的code返回 ,GLOBAL_QUERY  COMPUTE_INSTANCE  ✅
  queryFieldValue : string = "" //  数据库检索的字段列表所对应的文本框值 ,    ✅
  serviceLevel : string = "" //  数据库服务级别: 参考数据字典GLOBAL->SERVICE_LEVEL ,✅
  status : string = "" //  数据库实例状态: 参考数据字典 , ✅
  useType : string = "" //  数据库类型: 参考数据字典GLOBAL->USE_TYPE , ✅
  zoneId : string = "" //  UI所选择的区域ID  ✅
}

class VmList{
    expiryDate: number;
    instanceName: string;
    itemId: string;
    networkType: string;
    osInfo: string;
    paymentType: string;
    regionZone: string;
    specification: string;
    platformType : "0" | "1" | "2";
    uuid: string;
    vmState: string;
    privateIp: string; //内部IP
    publicIP : string; //外部IP
    diskCount : number; //磁盘数量
    snapshotCount : number; //快照数量
    platformId : string;
    subInstanceId: string;
}

class HandleVm {
  actions: string;
  enterpriseIds = {
    enterpriseId: "100",
    platformId: "88"
  };
  id:string;
  uid:string;
}

export {
    VmList,
    HandleVm,
    QuiryVmList
}