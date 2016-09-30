import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Admin } from '../model/admin.model';

import 'rxjs/add/operator/toPromise';

const apiIp: string = '15.114.100.54';
const apiPort: string = '9105';

@Injectable()
export class EntAdminCreService {
    admin:Admin;
    
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init():void {
         this.restApiCfg.loadCfgData();
    }

     getAdminById(id: String): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.storages.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: id
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }
}