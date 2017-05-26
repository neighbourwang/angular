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

    delete(id:string): Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
         const url: string= "http://15.114.100.31:30072/zerotest/authsec/zerotest/test/id/{id}";
        return this.restApi.request("delete", url , pathParams, null, null);
    }

    excute(searchGroupName:string, searchGroupFun:string, bearer:string){
         const url: string= "http://15.114.100.31:30072/zerotest/authsec/test/zeroTests";
        return this.restApi.request("post", url , null, null,
                    {
                        "bearer": bearer,
                    "groupcase": searchGroupName,
                    "groupfunc": searchGroupFun
                });
    }
}
