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

class MiddlewareValue {
    DEPLOYMODE : VlueList = new VlueList;
    WEBLOGICACCOUNT : VlueList = new VlueList;
    WEBLOGICPASSWORD : VlueList = new VlueList;
    MOUNTPATH : VlueList = new VlueList;
    USAGETYPE : VlueList = new VlueList;
    MIDDLEWARETYPE : VlueList = new VlueList;
    MIDDLEWAREVERSION : VlueList = new VlueList;
    TIMELINE : VlueList = new VlueList;
    TIMELINEUNIT: VlueList = new VlueList;
    MIDDLEWARREGIONNAME: VlueList = new VlueList;  //域名称
    MIDDLEWARSERVERROLE: VlueList = new VlueList;  //服务器角色
    MIDDLEWARSERVERNAME: VlueList = new VlueList;  //服务器名称
    MIDDLEWARLISTENADDR: VlueList = new VlueList;  //监听地址
    MIDDLEWARLISTENPORT: VlueList = new VlueList;  //监听端口

}

export {
	MiddlewareValue,
	DiskValue,
	VlueList
}