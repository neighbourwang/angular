import { EntEstBasicInfo } from "./ent-est-basic-info";
import { EntEstResourceQuota } from "./ent-est-resourcequota";

export class EntEst{
	BasicInfo : EntEstBasicInfo;
	ResourceQuotas : EntEstResourceQuota[];

	constructor(){
		this.BasicInfo = new EntEstBasicInfo();
		this.ResourceQuotas = [];
	}
}