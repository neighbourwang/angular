interface Regions {
	code: string;
	id: string;
	name: string;
	parentId: string;
}
class PMOrderResponse {
	cpuNumber: number; //integer, optional);
	cpuSpec: string; //string, optional);
	diskInfo: string; //string, optional);
	diskSize: number; //integer, optional);
	hbaInfo: string; //string, optional);
	id: string; //string, optional);
	memSize: number; //integer, optional);
	netInfo: string; //string, optional);
	partsEntitys: PMPartsEntity[] = []; //PMPartsEntity[], optional);
	pmNetworkVO: PMNetworkVO = new PMNetworkVO; //PMNetworkVO, optional);
	serverTypeId: number; //integer, optional);
	serverTypeName: string; //string, optional);
	status: number; //integer, optional)
}
interface PMPartsEntity {
	id: string; //string, optional);
	number: string; //integer, optional);
	partsId: string; //string, optional);
	partsName: number; //string, optional);
	specId: string; //string, optional);
	specName: string; //string, optional);
	specValue: string; //string, optional)
}
class PMNetworkVO {
	dnsAlt: string;  // optional);
	dnsPre: string;  // optional);
	gateway: string;  // optional);
	id: string;  // optional);
	networkName: string;  // optional);
	subnetCIDR: string;  // optional);
	subnetIP: string;  // optional);
	subnetMask: string;  // optional)
}

interface ResoucePolls {
	id: string; // 61827105-3fba-4825-8d32-32714e190ecb;
	poolName: string; // test1;
	regionId: string; // 1;
	regionName: string; // 北京;
	datacenter: string; // c;
	description: string; // des;
	status: number; // 1;
	createDate: string; // null;
	updateDate: string; // null;
}
class PMImageBaseVO {
	bitId: string;   //integer, optional),
	bitName: string;   //string, optional),
	destImageName: string;   //string, optional),
	id: string = "";   //string, optional),
	imageTypeId: string;   //integer, optional),
	imageTypeName: string;   //string, optional),
	origImageName: string;   //string, optional),
	osTypeId: string;   //integer, optional),
	osTypeName: string;   //string, optional)
}

class ValuesType {
	attrDisplayValue :string = ""; //, optional),
	attrValue :string = ""; //, optional),
	attrValueCode :string = ""; //, optional),
	attrValueId :string = ""; //, optional),
	platformIds? :string[]; //[string], optional),
	status? :boolean; //, optional)
	capacity?: number;
	osType?: number;
}

class ResAttr {
	attrCode : string ; //, optional),
	attrDisplayName : string ; //, optional),
	attrId : string ; //, optional),
	mandatory : string ; //, optional),
	mapValueList : any ; //, optional): 属性依赖 ,
	relyAttrId : string ; //, optional),
	relyType : string ; //, optional),
	skuFlag : boolean ; //, optional),
	valueList : ValuesType[] = [] ; //[ProductAttributeValueItem], optional),
	valueType : string ; //, optional): 0: Single Value -- 单值回传; 1: Multi Type --多值回传
}
class AttrList{
	CPU: ResAttr = new ResAttr; //attrDisplayName: "CPU",…}
	MEM: ResAttr = new ResAttr; //attrDisplayName: "内存", skuFlag: null,…}
	RESOURCEPOOL: ResAttr = new ResAttr; //attrDisplayName: "资源池",…}
	NETWORK: ResAttr = new ResAttr; //attrDisplayName: "网络",…}
	NETWORKCARD: ResAttr = new ResAttr; //attrDisplayName: "网卡",…}
	PASSWORD: ResAttr = new ResAttr; //attrDisplayName: "登录密码",…}
	SECURITYGROUP: ResAttr = new ResAttr; //attrDisplayName: "安全组",…}
	TIMELINEUNIT: ResAttr = new ResAttr; //attrDisplayName: "时长单位",…}
	DISK: ResAttr = new ResAttr; //attrDisplayName: "硬盘",…}
	OSYSTEM: ResAttr = new ResAttr; //attrDisplayName: "操作系统",…}
	TIMELINE: ResAttr = new ResAttr; //attrDisplayName: "购买时长",…}
	USERNAME: ResAttr = new ResAttr; //attrDisplayName: "用户名",…}
	REGION: ResAttr = new ResAttr; //attrDisplayName: "区域",…}
	PMID: ResAttr = new ResAttr; //attrDisplayName: "物理机ID",…}
	SETTINGTYPE: ResAttr = new ResAttr; //attrDisplayName: "设置方式",…}
	INSTANCENAME: ResAttr = new ResAttr; //attrDisplayName: "实例名称",…}
}

class PMServiceItem {
	appendService :string = ""; //, optional),
	expireDate :string = ""; //, optional),
	osInfo :string = ""; //, optional),
	pmConfInfo :string = ""; //, optional),
	pmId :string = ""; //, optional),
	pmName :string = ""; //, optional),
	poolRegionInfo :string = ""; //, optional),
	privateIP :string = ""; //, optional),
	publicIP :string = ""; //, optional),
	serviceLevel :string = ""; //, optional),
	serviceType :string = ""; //, optional),
	status :string = ""; //, optional)
	pmstatus :string = ""; //, optional)
}

class ValuesList {
	TIMELINEUNIT:ValuesType[] = [];  // "时长单位",…}
	PASSWORD:ValuesType[] = [];  // "登录密码",…}
	USERNAME:ValuesType[] = [];  // "用户名",…}
	INSTANCENAME:ValuesType[] = [];  // "实例名称",…}
	RESOURCEPOOL:ValuesType[] = [];  // "资源池",…}
	OSYSTEM: ValuesType[] = []; //attrDisplayName: "操作系统",…}
	TIMELINE: ValuesType[] = []; //attrDisplayName: "购买时长",…}
}

class Values {
	PMID:ValuesType = new ValuesType;  // "物理机ID",…}
	TIMELINEUNIT:ValuesType = new ValuesType;  // "时长单位",…}
	PASSWORD:ValuesType = new ValuesType;  // "登录密码",…}
	USERNAME:ValuesType = new ValuesType;  // "用户名",…}
	INSTANCENAME:ValuesType = new ValuesType;  // "实例名称",…}
	RESOURCEPOOL:ValuesType = new ValuesType;  // "资源池",…}
	OSYSTEM: ValuesType = new ValuesType; //attrDisplayName: "操作系统",…}
	TIMELINE: ValuesType = new ValuesType; //attrDisplayName: "购买时长",…}
	REGION: ValuesType = new ValuesType; //attrDisplayName: "购买时长",…}
}

export {
	Regions,
	PMOrderResponse,
	PMPartsEntity,
	PMNetworkVO,
	ResoucePolls,
	PMImageBaseVO,
	AttrList,
	ValuesList,
	ValuesType,
	PMServiceItem,
	Values
}