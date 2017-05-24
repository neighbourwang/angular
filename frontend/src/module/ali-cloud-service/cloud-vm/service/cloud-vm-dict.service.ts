import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudVMDictService{
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
    
    instanceStatusDict = this.dict.get({
        owner: "ALICLOUD",
        field: "INSTANCE_STATUS"
    });

    instanceChargeTypeDict = this.dict.get({
        owner: "ALICLOUD",
        field: "INSTANCE_CHARGE_TYPE"
    });

    ioOptimizedDict = this.dict.get({
        owner: "ALICLOUD",
        field: "IO_OPTIMIZED"
    });

    networkTypeDict = this.dict.get({
        owner: "ALICLOUD",
        field: "NETWORK_TYPE"
    });

    ioOptimizedDetailDict = this.dict.get({
        owner: "ALICLOUD",
        field: "IO_OPTIMIZED_DETAIL"
    });

    
}