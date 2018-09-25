interface Regions {
	code: string;
	id: string;
	name: string;
	parentId: string;
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

export {
    Regions,
    ResoucePolls
}
