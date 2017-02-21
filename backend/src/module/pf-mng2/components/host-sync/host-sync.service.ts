import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

@Injectable()
export class HostSyncService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

	computeStatus = this.dict.get({    //获取状态列表
        owner : "COMPUTE",
        field : "STATUS"
    });
}