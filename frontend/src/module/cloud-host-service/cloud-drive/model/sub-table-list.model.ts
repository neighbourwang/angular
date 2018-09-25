class DiskUnMountItem {
	id: string = "";  		// optional): 实例ID, 映射INS_VOLUME_INSTANCE.ID ,
	name: string = "";  	// optional): 硬盘实例Name, 映射？ ,
	size: number = 0; 		//integer, optional): 存储容量, 映射？ ,
	type: string = "";  	// optional): 存储类型, 映射？
}
class DiskBackupItem {
	id: string = "";  		// optional): 备份盘实例ID, 映射INS_VOLUME_INSTANCE.ID？ ,
	name: string = "";  	// optional): 硬盘实例Name, 映射？ ,
	size: number = 0; 		//integer, optional): 存储容量, 映射？ ,
	type: string = "";  	// optional): 存储类型, 映射？ ,
	vmName: string = "";  	// optional): 原虚拟机名称, 映射？
}
class VMSimpleItem {
	instanceName: string = "";  	// optional): 主机实例名称 ,
	itemId: string = "";  	// optional): 主机实例Id ,
	osInfo: string = "";  	// optional): 主机操作系统信息 ,
	privateIP: string = "";  	// optional): 主机私网IP ,
	publicIP: string = "";  	// optional): 主机公网IP ,
	specification: string = "";  	// optional): 主机规格信息，亦即：CPU和MEM信息 ,
	uuid: string = "";  	// optional)
}
export {
	DiskUnMountItem,
	DiskBackupItem,
	VMSimpleItem
}