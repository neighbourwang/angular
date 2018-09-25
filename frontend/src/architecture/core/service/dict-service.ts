import { Injectable } from "@angular/core";
import {SystemDictionaryService} from './system.dictionary.service';

@Injectable()
export class DictService{
	constructor(private _dic:SystemDictionaryService){
		this.cache = [{name:"", val:null}];
	}
	private cache:[{name:string, val:Promise<any[]>}];

	private getName(owner:string, field:string):string{
		return `${owner}-${field}`;
	}


	getDic(owner:string, field:string):Promise<any[]>{
		let result = this.cache.find(n=>n.name ==this.getName(owner, field));

		if(result)
			return result.val;
		else
		{
			result ={
				name:this.getName(owner,field)
				,val:this._dic.get({owner:owner, field:field})
			}
			this.cache.push(result);
			return result.val;		}
	}


}