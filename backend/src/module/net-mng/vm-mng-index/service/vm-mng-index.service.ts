import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi , SystemDictionaryService} from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

//Model
//import { Network_mock } from '../model/network.mock.model';

@Injectable()
export class VmwareMngIndexService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //数据字典
     ////网络类型
    /*typeDic = this.dict.get({
        owner: "NETWORK", 
        field: "TYPE"
    });


    getNetworks( criteriaQuery: CriteriaQuery, pageIndex: number, pageSize: number): Promise<any>{
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.list");
        return this.restApi.request(api.method, api.url, pathParams, null, 
            {
                "dataCenter": criteriaQuery.dataCenter,
                "platformId": criteriaQuery.platformId,
                "region": criteriaQuery.region,
                "tenantName": criteriaQuery.tenantName
            }
        );

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Network_mock });
    }
    */
    
}