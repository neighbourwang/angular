class VlueList {
    attrValueId?: string = "";
    attrValueCode?: string = "";
    attrDisplayValue?: string = "";
    attrValue?: string = "";
}

class DiskValue {
    PLATFORM : VlueList = new VlueList;
    ZONE : VlueList = new VlueList;
	DISKSIZE : VlueList = new VlueList;
	STORAGE : VlueList = new VlueList;
	DISKINSNAME : VlueList = new VlueList;
	MOUNTPATH : VlueList = new VlueList;
	COPYLEVEL : VlueList = new VlueList;
	DISKGROUP : VlueList = new VlueList;
	USAGETYPE : VlueList = new VlueList;
}

class DatabaseValue {
	STORAGETYPE : VlueList = new VlueList;
	ARCHMODE : VlueList = new VlueList;
	LISTENPOST : VlueList = new VlueList;
	DBCHARSET : VlueList = new VlueList;
	MAXCONNECTION : VlueList = new VlueList;
	SYSPASSWORD : VlueList = new VlueList;
	ASMPASSWORD : VlueList = new VlueList;
}

export {
	DatabaseValue,
	DiskValue,
	VlueList
}