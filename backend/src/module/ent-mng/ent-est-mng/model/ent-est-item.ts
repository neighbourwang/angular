import {Status, CertMethod} from './'

export class EntEstItem{ 
	id:string = "";	// id
	authMode:CertMethod = CertMethod.Local; //认证方式
	enterpriseName:string = "";	// 企业（租户）名称
	networkQuota: number = null;	// 云主机数量
	snapshotQuota: number = null;	// 快照数量
	
	imageQuota : number = null;	// 镜像数量
	productNumber : number = null;	// 产品数量
	orderNumber : number = null;	// 订单数量
	usedVMRate: number = null;	// vCPU配额使用率%
	storageQuota : number = null;	// 内存配额使用率%
	usedStorageRate: number = null;	// 存储配额使用率

	status: string = "";	// 状态

	description: string = "";	// 描述// 描述
	checked: boolean = false;//ui operation
	statusName: string = ""; //ui operation

}


/*
GET /authsec/enterprises/resouces/quotas/page/{_page}/size/{_size}

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