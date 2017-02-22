import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

@Injectable()
export class VtSyncService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }
    //put同步宿主机信息
    putUpdateZone (zoneList:any){
        let api = this.restApiCfg.getRestApi("pf-mng-zoneUpdate.put");
        return this.restApi.request(api.method , api.url,[],undefined,zoneList );
    }
}