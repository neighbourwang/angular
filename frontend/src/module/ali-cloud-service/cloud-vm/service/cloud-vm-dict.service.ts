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
    
    diskCategoryDict = this.dict.get({
        owner: "ALICLOUD",
        field: "CLOUD_DISK"
    });

    diskStatusDict = this.dict.get({
        owner: "ALICLOUD",
        field: "CLOUD_DISK_STATUS"
    });

    diskChargeTypeDict = this.dict.get({
        owner: "ALICLOUD",
        field: "CLOUD_DISK_CHARGE_TYPE"
    });

    diskTypeDict = this.dict.get({
        owner: "ALICLOUD",
        field: "CLOUD_DISK_TYPE"
    });

    diskBoolDict = this.dict.get({
        owner: "ALICLOUD",
        field: "CLOUD_DISK_BOOL"
    });

    /*
    ipstatusDict = this.dict.get({  //IP地址状态
        owner: "PM_NETWORK",
        field: "IP_STATUS"
    });
    */
}