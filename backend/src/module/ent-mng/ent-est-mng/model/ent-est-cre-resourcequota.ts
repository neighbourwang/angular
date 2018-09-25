export class EntEstCreResourceQuota{
	enterpriseId : string = null;//": "string",
	
	id : string = null;//": "string",
  floatIpQuota : number = 0;//": 0,//可创建浮动IP数量floatIpQuota 
  usedFloatIpQuota: number = null;

	imageQuota : number = 0;//": 0,//可创建镜像数量imageQuota 
  usedImageQuota: number = null;

 
	memroyQuota : number = 0;//": 0,//可用内存数量	memQuota: number = null;
  usedMemQuota: number = null;

	networkQuota : number = 0;//": 0,
  usedNetworkQuota: number = null;

	physicalQuota : number = 0;//": 0,//可创建物理机数量physicalMachineQuota 
  usedPhysicalMachineQuota: number = null;

	snapShotQuota : number = 0;//": 0,//可创建快照数量snapshotQuota 
  usedSnapshotQuota: number = null;

	storageQuota : number = 0;//": 0,//可使用存储额度storageQuota 
  usedStorageQuota: number = null;

	vcpuQuota : number = 0;//": 0, //可使用vCPU数量vcpuQuota 
  usedCpuQuota: number = null;
  
	vmQuota : number = 0;//": 0
  usedVmQuota: number = null;



  usedCpuRate :number = null;//CPU配额使用率
  usedFloatIpRate :number = null;// 浮动IP配额配额
  usedImageRate :number = null;//镜像配额使用率
  usedMemRate  :number = null; //内存使用率
  usedPhysicalMachineRate :number = null;//物理机配额使用率
  usedSnapshotRate  :number = null; //快照配额使用率
  usedStorageRate :number = null;//储存使用率
 


	reset(){
		this.enterpriseId = null;
		this.floatIpQuota = null;
		this.id = null;
		this.imageQuota = null;
		this.memroyQuota = null;
		this.networkQuota = null;
		this.physicalQuota = null;
		this.snapShotQuota = null;
		this.storageQuota = null;
		this.vcpuQuota = null;
		this.vmQuota = null;

	}
}


/*
{
    "enterpriseId": "string",
    "floatIpQuota": 0,//可创建浮动IP数量
    "id": "string",
    "imageQuota": 0,//可创建镜像数量
    "memroyQuota": 0,//可用内存数量
    "networkQuota": 0,
    "physicalQuota": 0,//可创建物理机数量
    "snapShotQuota": 0,//可创建快照数量
    "storageQuota": 0,//可使用存储额度
    "vcpuQuota": 0, //vcpu数量
    "vmQuota": 0
  }



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