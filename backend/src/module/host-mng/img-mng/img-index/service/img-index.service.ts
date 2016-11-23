import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { platforms_mock } from '../model/platform.mock.model';
import { platform } from '../model/platform.model';

@Injectable()
export class ImgIndexService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getPlatforms(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.list");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => platforms_mock);
    }
}