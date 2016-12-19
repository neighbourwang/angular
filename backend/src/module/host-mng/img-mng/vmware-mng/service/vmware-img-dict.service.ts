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
    
    typeDict = this.dict.get({  //镜像类型
        owner: "IMAGES",
        field: "TYPE"
    });
    statusDict = this.dict.get({  //镜像状态
        owner: "IMAGES",
        field: "ADM_STATUS"
    });
    bitDict = this.dict.get({  //os位数
        owner: "IMAGES",
        field: "BITS_TYPE"
    });
    osDict = this.dict.get({  //os类型
        owner: "IMAGES",
        field: "OS"
    });
    syncReslDict = this.dict.get({   //同步结果
        owner: "IMAGES",
        field: "SYNC_RESULT"
    });
}