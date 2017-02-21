import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

@Injectable()
export class ZoneSyncService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    //平台可用区信息    
    putUpdateZoneList (zoneList:any){
        let api = this.restApiCfg.getRestApi("pf-mng-zonelist.post");
        return this.restApi.request(api.method , api.url,[],undefined ,zoneList);
    }
	
}