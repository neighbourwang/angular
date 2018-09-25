import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model 
import { EmailSetupModel } from '../model/email-mng.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmailMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,        
        private dict: SystemDictionaryService,
    ) { }

    getEmailSetup(): Promise<any> {
        /*
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        
        const body = {
                "subnetCIDR": subn.subnetCIDR,
                "subnetMask": subn.subnetMask,
                "gateway": subn.gateway,
                "dnsPre": subn.dnsPre,
                "dnsAlt": subn.dnsAlt
        };
        */
        const api = this.restApiCfg.getRestApi("sys-mng.email-mng.email.setup.list");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    editEmailSetup(emailsetup: EmailSetupModel): Promise<any> {
        const body = {
                "description": emailsetup.description,
                "noticeType": emailsetup.noticeType,
                "receivers": emailsetup.receivers,
                "send": emailsetup.send,
                "templateId": emailsetup.id
        };
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("sys-mng.email-mng.email.setup.edit");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    getEmailTemplates(type: string): Promise<any> {  //获取某类通知类型下的对应的模板
        const pathParams = [
            {
                key: "type",
                value: type
            }
        ];
        const api = this.restApiCfg.getRestApi("sys-mng.email-mng.email.setup.template.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

    getEmailTemplateList(): Promise<any> {   //获取全部Email模板
        const api = this.restApiCfg.getRestApi("sys-mng.email-mng.emailtemplate.list");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    getEmailTemplateDetails(id: string): Promise<any> {    //获取具体Email的详情
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("sys-mng.email-mng.emailtemplate.details");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }
    

}
