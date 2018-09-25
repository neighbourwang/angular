export class CancelParam{
	removeDisk:boolean = false; //退订disk
	isDisk:boolean = false; //是disk
	isMachine:boolean = false;//是云主机
	isInUse:boolean = false;//是否在使用
	subId:string = null;
	get cascadeFlag():string{
		return this.removeDisk ? "1":"0";
	};
	
	constructor(isdisk:boolean = false, ismachine:boolean = false, isinuse:boolean = false)
	{
		this.isDisk = isdisk;
		this.isMachine = ismachine;
		this.isInUse = isinuse;
	}

}