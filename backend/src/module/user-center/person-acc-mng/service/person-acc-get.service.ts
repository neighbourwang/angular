
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

//model
import { PersonAcc } from '../model/person-acc.model';

@Injectable()
export class GetPersonAcc {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 查看产品
    getPersonAcc() {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.detail");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
}