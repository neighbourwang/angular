export class ResourceQuota{
	regionName: string = ""; //区域
    platformVMQuota: number = 0;//可分配云主机数量
    storageQuota: number = 0; //可用存储

	//for ui operation
	checked: boolean = false;
	added: boolean = false;
}