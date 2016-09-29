import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg } from '../../../core/service/restapicfg.service';
import { RestApi } from '../../../core/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PfConnCreStep02Service {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    /*init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }*/

    // 各资源项目需要同步数量取得
    resSyncCount(platFormId: String) {
        let url = this.restApiCfg.getRestApiUrl("pf.cre.step.02.res.sync.count.get");

        return this.restApi.get(url, [{ "pf-id": platFormId }], undefined);
    }
}