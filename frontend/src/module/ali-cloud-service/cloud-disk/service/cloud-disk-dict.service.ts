import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudDiskDictService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService,
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }
    
    diskDict = this.dict.get({
        owner: "ALICLOUD",
        field: "CLOUD_DISK"
    });

    /*
    ipstatusDict = this.dict.get({  //IP地址状态
        owner: "PM_NETWORK",
        field: "IP_STATUS"
    });
    */
}