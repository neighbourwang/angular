import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EntProdMngTemplate } from '../model/ent-prod-mng.model';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntProdMngService {
   constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }
    

    getDatas(page : number , size : number): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('ent-mng.ent-prod-mng.all.get');
        let pathParams = [
            {
                key: 'page',
                value: page
            },{
                key: 'size',
                value: size
            }
        ];
        return this.restApi.get(url, pathParams, undefined, undefined);
    }

}