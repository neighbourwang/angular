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
    
   
}