import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Admin } from '../model/admin.model';

import 'rxjs/add/operator/toPromise';

const apiIp: string = '15.114.100.54';
const apiPort: string = '9105';

@Injectable()
export class EntAdminMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init():void {
         this.restApiCfg.loadCfgData();
    }


     getAdminByKey(key: String): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.storages.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'key',
                value: key
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }
}