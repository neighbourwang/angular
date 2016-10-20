import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class IndexCloudHostService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    getVmList (page : number , size : number){
        let api = this.restApiCfg.getRestApi("hosts.instance.get");

        return this.restApi.request(api.method,api.url,[{key : 'page' , value : page} , { key : 'size' , value : size}],undefined);
    }



}