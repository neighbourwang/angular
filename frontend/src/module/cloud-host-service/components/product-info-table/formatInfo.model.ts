class attrList {
    attrCode: string = "";
    attrDisplayName: string = "";
    attrDisplayValue: string = "";
    attrOrderSeq: number = 0;
    attrValueCode: string = "";
    description: string = "";
    valueUnit: string = "";
}
class Info {
	OS : attrList = new attrList;
	BILLINGMODE:attrList = new attrList;
	BOOTSIZE:attrList = new attrList;
	BOOTSTORAGE:attrList = new attrList;
	CPU:attrList = new attrList;
	DISKINITIALSIZE:attrList = new attrList;
	DISKMAXSIZE:attrList = new attrList;
	DISKSTEPSIZE:attrList = new attrList;
	DISKTYPE:attrList = new attrList;
	IMAGETYPE:attrList = new attrList;
	INSTANCENAME:attrList = new attrList;
	MEM:attrList = new attrList;
	PASSWORD:attrList = new attrList;
	PLATFORM:attrList = new attrList;
	SECURITYGROUP:attrList = new attrList;
	SETTINGTYPE:attrList = new attrList;
	STARTUPSOURCE:attrList = new attrList;
	STORAGE:attrList = new attrList;
	TIMELINE:attrList = new attrList;
	TIMELINEUNIT:attrList = new attrList;
	USERNAME:attrList = new attrList;
	ZONE:attrList = new attrList;
	DISKSIZE:attrList = new attrList;
	DISKINSNAME:attrList = new attrList;
	RESOURCEPOOL:attrList = new attrList;
	OSYSTEM: attrList = new attrList;
	SERVICEOBJECTCODE: attrList = new attrList;
	REGION: attrList = new attrList;
	DBVERSION: attrList = new attrList;
	DBTYPE: attrList = new attrList;
	DEPLOYMODE: attrList = new attrList;
	MIDDLEWAREVERSION: attrList = new attrList;
	MIDDLEWARETYPE: attrList = new attrList;
}
export {
    Info,
    attrList
}
