export class ResourceQuota{
	description: string = "";
	id: string = "";
	platformId: string = "";
	regionId: string = "";
	regionName: string = "";
	storageQuota: number = 0;
	vmQuota: number = 0;
	checked: boolean = false;
}