import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

@Injectable()
export class StorageSyncService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }
    //平台新增存储区信息    
    putUpdateStorageList (storgeList:any){
        let api = this.restApiCfg.getRestApi("pf-mng-storagelist.post");
        return this.restApi.request(api.method , api.url,[],undefined ,storgeList);
    }
}