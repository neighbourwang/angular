class DbTemplateInfo{
	version: string = "";
	dbType: number = 0;
	deploymentMode: number = 0;
}

class MDproductReq {
	platformId : string = ""; //, optional): 如果是私有云，则platformid不为空 ,
	resourcePoolId?: string = ""; //, optional): 如果是物理机，则资源池不为空 ,
	serverType? : string = ""; //, optional): 物理机or私有云or公有云 ,
	serviceType : string = ""; //, optional): 服务类型 ,
	templateIds : string[] = []; //[string], optional): 模板ID
}

export {
	DbTemplateInfo,
	MDproductReq
}