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
    

    getDatas(): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('ent-mng.ent-prod-mng.all.get');

        return this.restApi.get(url, undefined, undefined, undefined);
    }
}