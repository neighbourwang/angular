import { ResourceQuota } from './resourcequota';

export class EntEstResourceQuota {
    id: string = null;
    enterpriseId: string = null; //企业id
    platformVMQuota: number = null;//可创建云主机数量
    physicalMachineQuota: number = null;//可创建物理机数量
    storageQuota: number = null; //可用存储额度
    snapQuota: number = null; //可创建快照数量
    imageQuota: number = null; //可创建镜像数量

    //ui operation
    checked: boolean = false;
    referredResourceQuota : ResourceQuota = null;

    reset(){
        this.id = null;
    	this.enterpriseId = null;
    	this.platformVMQuota = null;
    	this.physicalMachineQuota = null;
    	this.storageQuota = null;
    	this.snapQuota = null;
    	this.imageQuota = null;
    }
}


/*
GET /authsec/enterprise/{_enterpriseId}/resouces/quotas/page/{_page}/size/{_size}

GeneralPagingResultOfListOfEnterpriseQuotaItem {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[EnterpriseQuotaItem], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
EnterpriseQuotaItem {
    authMode (string, optional): 类型是数字，不要传入string 类型 ,
    enterpriseId (string, optional),
    enterpriseName (string, optional),
    id (string, optional),
    imageQuota (integer, optional),
    networkQuota (integer, optional),
    orderNumber (integer, optional),
    physicalMachineQuota (integer, optional),
    platformId (string, optional),
    productNumber (integer, optional),
    regionId (string, optional),
    regionName (string, optional),
    snapshotQuota (integer, optional),
    status (string, optional): 类型是数字，不要传入string 类型 ,
    storageQuota (integer, optional),
    usedStorageNumber (integer, optional),
    usedStorageRate (integer, optional),
    usedVMNumber (integer, optional),
    usedVMRate (integer, optional),
    vmQuota (integer, optional)
}

{
    
    "detailDescription": "string",
  "pageInfo": {
    "currentPage": 0,
    "pageSize": 0,
    "totalPage": 0,
    "totalRecords": 0
  },
  "resultCode": "string",
  "resultContent": [
    {
      "authMode": "string",
      "enterpriseId": "string",
      "enterpriseName": "string",
      "id": "string",
      "imageQuota": 0,
      "networkQuota": 0,
      "orderNumber": 0,
      "physicalMachineQuota": 0,
      "platformId": "string",
      "productNumber": 0,
      "regionId": "string",
      "regionName": "string",
      "snapshotQuota": 0,
      "status": "string",
      "storageQuota": 0,
      "usedStorageNumber": 0,
      "usedStorageRate": 0,
      "usedVMNumber": 0,
      "usedVMRate": 0,
      "vmQuota": 0
    }
  ]
}
*/