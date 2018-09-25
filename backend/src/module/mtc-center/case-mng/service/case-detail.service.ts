import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,SystemDictionaryService} from '../../../../architecture';

//model
import { CloseInfo,HandleInfo } from "../model/closeInfo.model";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CaseDetailService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

     //字典
    dictClose = this.dict.get(
             {      
                owner : "WORKSHEET",
                field : "CLOSE"             //关闭类型
            }             
    );
    dictEmergency = this.dict.get(
             {      
                owner : "WORKSHEET",
                field : "EMERGENCY"             //紧急程度
            }             
    );

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
     closeCase(closeInfo:CloseInfo,id:string): Promise<any>{          
        const api = this.restApiCfg.getRestApi("case-mng.case.close");
        return this.restApi.request(api.method, api.url, null, null,{
            "closeReason":closeInfo.closeInfo,
            "id":id,
            "closeType":closeInfo.closeType
        });
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhysicalList_mock);
    }
    
    //处理工单
    handleCase(handleInfo:HandleInfo,id:string): Promise<any>{          
        const api = this.restApiCfg.getRestApi("case-mng.case.handle");
        return this.restApi.request(api.method, api.url, null, null,{
            "handleInfo": handleInfo.handleInfo,
            "workListId": id,
            "emergency":handleInfo.emergency,
        });
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhysicalList_mock);
    }
}
