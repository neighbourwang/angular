import { EntEstBasicInfo } from "./ent-est-basic-info";
import { EntEstResourceQuota } from "./ent-est-resourcequota";

export class EntEst{
	BasicInfo : EntEstBasicInfo;
	ResourceQuota : EntEstResourceQuota;

	constructor(){
		this.BasicInfo = new EntEstBasicInfo();
		this.ResourceQuota = new EntEstResourceQuota();
	}
}