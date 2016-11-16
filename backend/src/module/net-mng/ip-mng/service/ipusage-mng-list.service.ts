import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model 
import { IpUsageMngModel } from '../model/ipusage-mng.model';
import { IpUsageMngModel_mock } from '../model/ipusage-mng.mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpUsageMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getIpUsageMngList(): Promise <any> {
        //API CALL
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpUsageMngModel_mock });
    }

}
