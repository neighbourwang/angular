import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PfConnCreStep02Service {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 各资源项目需要同步数量取得
    resSyncCount(platFormId: String) {
        let url = this.restApiCfg.getRestApiUrl("pf.cre.step.01.synchronize.count.get");

        return this.restApi.get(url, [{ "pf-id": platFormId }], undefined);
    }
}