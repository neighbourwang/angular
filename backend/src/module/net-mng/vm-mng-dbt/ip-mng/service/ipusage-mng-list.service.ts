import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../../architecture';

//model 
import { IpUsageMngModel } from '../model/ip-mng.model';
import { IpUsageMngModel_mock } from '../model/ip-mng.mock';
import { Success_mock } from '../model/success.mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpUsageMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    statusDic = this.dict.get({
        owner: "IP",
        field: "STATUS"
    });

    getIpUsageMngList( pg_id: any ): Promise <any> {
        console.log("getIpUsageMngList"); 
        const pathParams = [
            {
                key: "id",
                value: pg_id
            }
        ];
        console.log(pathParams, "pathParams");
        const api = this.restApiCfg.getRestApi("net-mng.vmware.dbt.ipusagemng.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpUsageMngModel_mock });
    }

    enableIP(ipusage: IpUsageMngModel): Promise <any>  {
        console.log("enableIP"); 
        const pathParams = [
            {
                key: "id",
                value: ipusage.id
            }
        ];
        const body = [ipusage.description];
        console.log(pathParams, body, "pathParams and body");
        const api = this.restApiCfg.getRestApi("net-mng.vmware.dbt.subnetip.occupy");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });


    }

    disableIP(ipusage: IpUsageMngModel): Promise <any>  {
        console.log("disableIP");   
        const pathParams = [
            {
                key: "id",
                value: ipusage.id
            }
        ];
        const body = [""]; 
        console.log(pathParams, body, "pathParams and body");
        const api = this.restApiCfg.getRestApi("net-mng.vmware.dbt.subnetip.release");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });

    }

}
