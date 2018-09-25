import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';


@Injectable()
export class MngSetService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    completeDic= this.dict.get({
        owner: "SUPERVISE_SERVICE",
        field: "COMPLETE"
    });

    setMngService(complete: string, minutes: string): Promise<any>{
        const api = this.restApiCfg.getRestApi("mtc-center.mng-set.set");
        return this.restApi.request(api.method, api.url, null, null,
            {
                "complete": complete,
                "minutes":minutes
            });
    }

    getMngService(): Promise<any>{
        const api = this.restApiCfg.getRestApi("mtc-center.mng-set.get");
        return this.restApi.request(api.method, api.url, null, null, null);
    }
}
