interface EnterpriseQuotaDetailResp {
	disk:number;
	id:number;
	image:number;
	ipaddress:number;
	mem:number;
	network:number;
	organizationId:number;
	physical:number;
	snapshot:number;
	storage:number;
	usedCpu:number;
	usedDisk:number;
	usedImage:number;
	usedIpaddress:number;
	usedMem:number;
	usedNetwork:number;
	usedPhysical:number;
	usedSnapshot:number;
	usedStorage:number;
	usedVm:number;
	vcpu:number;
	vm:number;
}

interface OrganizationExtItem {
	dbPaused : number;     //, optional),
	dbRunning : number;     //, optional),
	id : string;     //, optional),
	orderForAudit : number;     //, optional),
	pcPaused : number;     //, optional),
	pcRunning : number;     //, optional),
	serviceToExpired : number;     //, optional),
	snapshotPaused : number;     //, optional),
	snapshotRunning : number;     //, optional),
	storagePaused : number;     //, optional),
	storageRunning : number;     //, optional),
	ticketDone : number;     //, optional),
	ticketNew : number;     //, optional),
	ticketProcessing : number;     //, optional),
	userDisabled : number;     //, optional),
	userEnabled : number;     //, optional),
	vmPaused : number;     //, optional),
	vmRunning : number;     //, optional)
}

export {
	EnterpriseQuotaDetailResp,
	OrganizationExtItem
}