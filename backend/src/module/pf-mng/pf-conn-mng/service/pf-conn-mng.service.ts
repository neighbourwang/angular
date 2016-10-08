import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PfConnMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }


    getPlatforms(page: number, size: number) {
        let url = this.restApiCfg.getRestApiUrl("pf.conn.mng.platforms.get");

        return this.restApi.get(url, [{key: "page", value: page}, {key: "size", value: size}], undefined);
    }
}