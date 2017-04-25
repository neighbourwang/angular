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
	attrDisplayValue :string; //, optional),
	attrValue :string; //, optional),
	attrValueCode :string; //, optional),
	attrValueId :string; //, optional),
	platformIds :string[]; //[string], optional),
	status :boolean; //, optional)
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
	valueList : Values[] = [] ; //[ProductAttributeValueItem], optional),
	valueType : string ; //, optional): 0: Single Value -- 单值回传; 1: Multi Type --多值回传
}
class AttrList{
	CPU:ResAttr = new ResAttr;  // "CPU",…}
	PMID:ResAttr = new ResAttr;  // "物理机ID",…}
	TIMELINEUNIT:ResAttr = new ResAttr;  // "时长单位",…}
	PASSWORD:ResAttr = new ResAttr;  // "登录密码",…}
	USERNAME:ResAttr = new ResAttr;  // "用户名",…}
	INSTANCENAME:ResAttr = new ResAttr;  // "实例名称",…}
	RESOURCEPOOL:ResAttr = new ResAttr;  // "资源池",…}
	SECURITYGROUP:ResAttr = new ResAttr;  // "安全组",…}
	SETTINGTYPE:ResAttr = new ResAttr;  // "设置方式",…}
	NETWORKCARD:ResAttr = new ResAttr;  // "网卡",…}
	DISK:ResAttr = new ResAttr;  // "硬盘",…}
	REGION:ResAttr = new ResAttr;  // "区域",…}
	MEM:ResAttr = new ResAttr;  // "内存", skuFlag: null,…}
}

class ValuesList {
	PMID:ValuesType[] = [];  // "物理机ID",…}
	TIMELINEUNIT:ValuesType[] = [];  // "时长单位",…}
	PASSWORD:ValuesType[] = [];  // "登录密码",…}
	USERNAME:ValuesType[] = [];  // "用户名",…}
	INSTANCENAME:ValuesType[] = [];  // "实例名称",…}
	RESOURCEPOOL:ValuesType[] = [];  // "资源池",…}
	TIMELINE:ValuesType[] = [];  // "资源池",…}
}

class Values {
	PMID:ValuesType = new ValuesType;  // "物理机ID",…}
	TIMELINEUNIT:ValuesType = new ValuesType;  // "时长单位",…}
	PASSWORD:ValuesType = new ValuesType;  // "登录密码",…}
	USERNAME:ValuesType = new ValuesType;  // "用户名",…}
	INSTANCENAME:ValuesType = new ValuesType;  // "实例名称",…}
	RESOURCEPOOL:ValuesType = new ValuesType;  // "资源池",…}
	TIMELINE:ValuesType = new ValuesType;  // "资源池",…}
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
	Values
}