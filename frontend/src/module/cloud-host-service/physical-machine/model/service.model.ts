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

export {
	Regions,
	PMOrderResponse,
	PMPartsEntity,
	PMNetworkVO,
	ResoucePolls,
	PMImageBaseVO
}