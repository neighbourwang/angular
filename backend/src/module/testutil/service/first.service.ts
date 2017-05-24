import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../architecture';

import 'rxjs/add/operator/toPromise';

import { FirstModel } from'../model/first.model';

@Injectable()
export class FirstService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,        
        private dict: SystemDictionaryService,
    ) { }

    search(name:string, fun:string): Promise<any>{
        const pathParams = [
            {
                key: "groupcase",
                value: name
            },
            {
                key:"groupfunc",
                value:fun
            }
        ];
        const url: string= "http://15.114.100.31:30072/zerotest/authsec/zerotest/test/groupcase/{groupcase}/groupfunc/{groupfunc}";
        return this.restApi.request("get", url, pathParams, null, null);
    }
    
    insertone(one: FirstModel): Promise<any>{
        const url: string= "http://15.114.100.31:30072/zerotest/authsec/zerotest/test";
        return this.restApi.request("post", url , null, null, one);
    }

}
