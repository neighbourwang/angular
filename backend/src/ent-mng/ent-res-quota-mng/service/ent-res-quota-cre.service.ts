import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg } from '../../../core/service/restapicfg.service';
import { RestApi } from '../../../core/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntResQuotaCreService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }
}