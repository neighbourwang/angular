import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

@Injectable()
export class VtSyncService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }
    //POST更新VolumeypeList
    postUpdateVolumeType(data:any){
        let api = this.restApiCfg.getRestApi("platform-mng.addVolumeTypeList.post");
        return this.restApi.request(api.method , api.url,[],undefined ,data);
    }
}