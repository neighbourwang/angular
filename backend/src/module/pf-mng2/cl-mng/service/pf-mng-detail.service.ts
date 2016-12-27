import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlatformDetailService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }
    //下一步
    // crPlatForm (creStep1Model : CreStep1Model){
    //     let api = this.restApiCfg.getDataRestApi("");

    //     return this.restApi.request(api.method , api.url,undefined , undefined , creStep1Model);
    // }
    //获取platform详情
    
    getPlatform (id:string){
        let api = this.restApiCfg.getRestApi("pf-mng-detail.get");

        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
        // let api = this.restApiCfg.getRestApi("pf.cre.paltform.delete");

        // return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: pid }], undefined, undefined);
    }
}
