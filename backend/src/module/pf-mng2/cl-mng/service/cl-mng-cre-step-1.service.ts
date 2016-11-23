/**
 * Created by junjie on 16/10/19.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { CreStep1Model } from '../model/cre-step1.model'


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClMngCreStep1Service {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }
    //下一步
    crPlatForm (creStep1Model : CreStep1Model){
        let api = this.restApiCfg.getDataRestApi("pf.cre.step.01.paltform.post");

        return this.restApi.request(api.method , api.url,undefined , undefined , creStep1Model);
    }
}
