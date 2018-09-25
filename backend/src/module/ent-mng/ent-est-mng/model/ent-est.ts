import { EntEstBasicInfo, EntEstCreResourceQuota} from "./";

export class EntEst{
	BasicInfo : EntEstBasicInfo;
	ResourceQuota : EntEstCreResourceQuota;

	constructor(){
		this.BasicInfo = new EntEstBasicInfo();
		this.ResourceQuota = new EntEstCreResourceQuota();
	}
}
