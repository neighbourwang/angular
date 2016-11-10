import {Status, CertMethod} from './'

export class EntEstItem{ 
	id:string = "";	// id
	enterpriseId: string = "";
	authMode:CertMethod = CertMethod.Local; //认证方式
	enterpriseName:string = "";	// 企业（租户）名称
	usedVMNumber: number = null;	// 云主机数量
	snapshotQuota: number = null;	// 快照数量
	
	imageQuota : number = null;	// 镜像数量
	productNumber : number = null;	// 产品数量
	orderNumber : number = null;	// 订单数量
	usedVCpuRate: number = null;	// vCPU配额使用率%
	usedMemRate : number = null;	// 内存配额使用率%
	usedStorageRate: number = null;	// 存储配额使用率

	status: string = "";	// 状态

	description: string = "";	// 描述// 描述
	checked: boolean = false;//ui operation
	statusName: string = ""; //ui operation

	

}


/*
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
      "diskQuota": 0,
      "enterpriseId": "string",
      "enterpriseName": "string",
      "floatIpQuota": 0,
      "id": "string",
      "imageQuota": 0,
      "memQuota": 0,
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
      "usedMemRate": 0,
      "usedStorageNumber": 0,
      "usedStorageRate": 0,
      "usedVCpuRate": 0,
      "usedVMNumber": 0,
      "usedVMRate": 0,
      "vcpuQuota": 0,
      "vmQuota": 0
    }
  ]
}
EnterpriseQuotaItem {
authMode (string, optional): 认证模式， 类型是数字，不要传入string 类型
 ,

diskQuota (integer, optional): 磁盘配额配额
 ,

enterpriseId (string, optional),

enterpriseName (string, optional),

floatIpQuota (integer, optional): 浮动IP配额配额
 ,

id (string, optional),

imageQuota (integer, optional): 镜像配额
 ,

memQuota (integer, optional): 内存配额配额
 ,

networkQuota (integer, optional): 网络配额
 ,

orderNumber (integer, optional): 订单数量
 ,

physicalMachineQuota (integer, optional): 物理机配额
 ,

platformId (string, optional),

productNumber (integer, optional): 产品数量配额
 ,

regionId (string, optional),

regionName (string, optional),

snapshotQuota (integer, optional): 快照配额
 ,

status (string, optional): 状态，类型是数字，不要传入string 类型
 ,

storageQuota (integer, optional): 储存配额
 ,

usedMemRate (integer, optional): 内存使用率使用率
 ,

usedStorageNumber (integer, optional): 已使用的储存数量
 ,

usedStorageRate (integer, optional): 储存使用率
 ,

usedVCpuRate (integer, optional): CPU使用率
 ,

usedVMNumber (integer, optional): 云主机（以创建的）
 ,

usedVMRate (integer, optional): 云主机配额使用率
 ,

vcpuQuota (integer, optional),

vmQuota (integer, optional): 云主机配额
 
} 

*/