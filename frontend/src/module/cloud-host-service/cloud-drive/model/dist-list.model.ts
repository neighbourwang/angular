class pageParameter{
    currentPage: number = 0;
    offset: number = 0;
    size: number = 20;
    sort: {};
    totalPage: number = 0;
}

class QuiryDistList {
  pageParameter: pageParameter = new pageParameter();
  // ownerType : string = "";  //搜索类型: 0: 个人；1: 部门 ,
  // platformId : string = "";  //UI所选择的区域ID ,
  // queryField : string = "";  //云硬盘检索的字段列表，取数据字典的code返回 ,
  // queryFieldValue : string = "";  //云硬盘检索的字段列表所对应的文本框值 ,
  // status : string = "";  //云硬盘实例状态: ,
  // unloadAble : string = "";  //云硬盘是否可卸载
  addonType: string = "";
  labelId: string = "";
  ownerType: string = "";
  platformId: string = "";
  queryField: string = "";
  queryFieldValue: string = "";
  serviceLevel: string = "";
  status: string = "";
  useType: string = "";
  zoneId: string = "";
}

 

class HandleDist {
  actions: string;
  enterpriseIds = {
    enterpriseId: "100",
    platformId: "88"
  };
  id:string;
  uuid:string;
  serverId:string;
}


class DistList {
    id: string;
    instanceItemId: string;
    name: string;
    type: string;
    size: number;
    relyId: string;
    relyName: string;
    status: number;
    expireDate: number;
    unloadAble: string;
    platformType : "0" | "1" | "2";
    platformName: string;
    zoneName: string;
    useType: string;
    sourceType: number;
    uid:string;
    platformId: string;
    uuid : string;
    subInstanceId : string;
}

export {
    HandleDist,
    DistList,
    QuiryDistList
}