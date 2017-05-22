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

    getEmailTemplateList(): Promise<any> {   //获取全部Email模板
        const api = this.restApiCfg.getRestApi("sys-mng.email-mng.emailtemplate.list");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    
    insertone(one: FirstModel): Promise<any>{
        const url: string= "http://15.114.100.31:30072/zerotest/authsec/zerotest/test";
        return this.restApi.request("post", url , null, null, one);
    }

}
