import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model 
import { IpMngModel } from '../model/ip-mng.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }


}
