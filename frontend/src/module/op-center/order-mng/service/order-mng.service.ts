import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';



import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderMngService {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private restApi: RestApi) {
	}


  download(filename:string,param:any){
	  	let api = this.restApiCfg.getRestApi("op-center.order-mng.cost-pandect.bill-download.post");

		return this.restApi.downloadFile( api.method, api.url, filename,undefined,param);
  }


}
