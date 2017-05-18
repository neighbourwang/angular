import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { SuperviseQueryCondition, PageParameter} from '../model/post.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ManagementServicesListService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;

    fetchMgmtList(istQuery:SuperviseQueryCondition) {
        let api = this.restApiCfg.getRestApi('mngm-search-page');
        return this.restApi.request(api.method, api.url, undefined, undefined, istQuery)
            .then(res => {
                if (res.resultCode !== "100") {
                    throw "获取接口失败";
                }
                return res.resultContent;
            });
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