import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

// import { VmList,HandleVm, QuiryVmList } from '../model/pm-list.model';
// import { VMInstanceLabelItem } from '../model/labe-iItem.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ManagementServicesListService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;

    fetchMgmtList(istQuery) {
        return Promise.resolve([])
    }
    
   
    status = this.dict.get({    //服务状态
        owner : "SUPERVISE_SERVICE",
        field : "STATUS"
    })
   
    period = this.dict.get({    //服务对象
        owner : "SUPERVISE_SERVICE",
        field : "PERIOD"
    })


}