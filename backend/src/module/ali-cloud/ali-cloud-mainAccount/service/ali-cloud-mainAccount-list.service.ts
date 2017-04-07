import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudMainAccountMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //获取主账号列表
    getMainAccounts():Promise<any>{
        
        return

    }

}
