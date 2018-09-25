export class ResourceQuota{
	platformName: string = ""; //区域
    platformVMQuota: number = 0;//可分配云主机数量
    storageQuota: number = 0; //可用存储
    platformId:string = null;
    vmQuota:number = null;

    cpu: number = null;// cpu,
    pychicalMachine: number = null;// 物理机,
    memory: number = null;// 内存



	//for ui operation
	checked: boolean = false;
	added: boolean = false;
}


/*

GeneralPagingResultOfListOfPlatformResourceQuota {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[PlatformResourceQuota], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
PlatformResourceQuota {
	description (string, optional),
	id (string, optional),
	platformId (string, optional),
	regionId (string, optional),
	regionName (string, optional),
	storageQuota (integer, optional),
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
      "description": "string",
      "id": "string",
      "platformId": "string",
      "regionId": "string",
      "regionName": "string",
      "storageQuota": 0,
      "vmQuota": 0
    }
  ]
}

*/