import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class VmwareImgDictService{
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
    
    typeDict = this.dict.get({
        owner: "IMAGES",
        field: "TYPE"
    });
    statusDict = this.dict.get({
        owner: "IMAGES",
        field: "ADM_STATUS"
    });
    bitDict = this.dict.get({
        owner: "IMAGES",
        field: "BITS_TYPE"
    });
    osDict = this.dict.get({
        owner: "IMAGES",
        field: "OS"
    });
    syncReslDic = this.dict.get({
        owner: "IMAGES",
        field: "SYNC_RESULT"
    });
}