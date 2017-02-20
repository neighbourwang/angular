import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model
// import {Criteria} from "../model/criteria.model";
// import { Region_mock } from '../model/phy-list.mock.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CaseDetailService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

   
}
