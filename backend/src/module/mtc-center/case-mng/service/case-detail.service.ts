import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model
// import {Criteria} from "../model/criteria.model";
// import { Region_mock } from '../model/phy-list.mock.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CaseDetailService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //根据case id 获取case基本信息
    getcaseInfo(id :string): Promise<any>{       
        const pathParams = [
            {
                key: "id",
                value: id
            }             
        ];
        const api = this.restApiCfg.getRestApi("case-mng.case.info.get");
        return this.restApi.request(api.method, api.url, pathParams, null,null  );
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhysicalList_mock);
    }

    //根据case id 获取case关闭信息
    getcaseCloseInfo(id :string): Promise<any>{       
        const pathParams = [
            {
                key: "id",
                value: id
            }             
        ];
        const api = this.restApiCfg.getRestApi("case-mng.case.closeinfo.get");
        return this.restApi.request(api.method, api.url, pathParams, null,null  );
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhysicalList_mock);
    }

     //根据case id 获取case处理信息
    getcaseHandleInfo(id :string): Promise<any>{       
        const pathParams = [
            {
                key: "id",
                value: id
            }             
        ];
        const api = this.restApiCfg.getRestApi("case-mng.case.handleinfo.get");
        return this.restApi.request(api.method, api.url, pathParams, null,null  );
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhysicalList_mock);
    }

    //关闭工单
     closeCase(): Promise<any>{          
        const api = this.restApiCfg.getRestApi("case-mng.case.close");
        return this.restApi.request(api.method, api.url, null, null,null  );
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhysicalList_mock);
    }

   
}
