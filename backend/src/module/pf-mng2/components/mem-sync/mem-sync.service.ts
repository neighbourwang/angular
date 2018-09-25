import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

@Injectable()
export class MemSyncService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }
     //put存储区同步存储空间信息
    putUpdateStorage (storageList:any){
        let api = this.restApiCfg.getRestApi("pf-mng-storageUpdate.put");
        return this.restApi.request(api.method , api.url,[],undefined,storageList );
    }
}