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
    baseurl:string="http://15.114.100.31:30072/zerotest/authsec/";
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
        const url: string= this.baseurl+"zerotest/test/groupcase/{groupcase}/groupfunc/{groupfunc}";
        return this.restApi.request("get", url, pathParams, null, null);
    }
    
    insertone(one: FirstModel): Promise<any>{
        const url: string= this.baseurl+"zerotest/test";
        return this.restApi.request("post", url , null, null, one);
    }

    delete(id:string): Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
         const url: string= this.baseurl+"zerotest/test/id/{id}";
        return this.restApi.request("delete", url , pathParams, null, null);
    }

    excuteGroup(searchGroupName:string, searchGroupFun:string, bearer:string): Promise<any>{
         const url: string = this.baseurl+"test/zeroTests";
        return this.restApi.request("post", url , null, null,
                    {
                        "bearer": bearer,
                    "groupcase": searchGroupName,
                    "groupfunc": searchGroupFun
                });
    }

    updateOne(one: FirstModel): Promise<any>{
        const url: string = this.baseurl+"zerotest/update";
        return this.restApi.request("put", url , null, null, one);
    }

    excuteOne(one: FirstModel){
        const url: string = this.baseurl+"test/zeromtest";
        return this.restApi.request("post", url, null, null, one);
    }
}
