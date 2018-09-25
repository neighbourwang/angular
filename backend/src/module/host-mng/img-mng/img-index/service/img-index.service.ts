import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService} from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { platforms_mock } from '../model/platform.mock.model';
import { platform } from '../model/platform.model';

@Injectable()
export class ImgIndexService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }
     //平台类型
    typeDic = this.dict.get({
        owner: "PLATFORM",
        field: "TYPE"
    });
    getPlatforms(pageIndex: number, pageSize: number): Promise<any> {
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        const api = this.restApiCfg.getRestApi("host-mng.img-index.platforms.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => platforms_mock);
    }
}