
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class CreateProdDirService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 新建VM产品目录
    postVmProdDir(data: any) {
        let api = this.restApiCfg.getRestApi("prod-dir-vmCreate");
        return this.restApi.request(api.method, api.url, undefined, undefined,data);
    }
    //根据cpu和mmr获取平台列表；
    postCpuMmr(vcpu: number, mmr: number) {
        let body = {
            "cpuCore": vcpu,
            "memSize": mmr
        }
        console.log(body);
        let api = this.restApiCfg.getRestApi("prod-dir-vmPlate");
        return this.restApi.request(api.method, api.url, undefined, undefined, body, );
    }

    

}