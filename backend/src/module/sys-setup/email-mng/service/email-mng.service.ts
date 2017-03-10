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
        const api = this.restApiCfg.getRestApi("sys-mng.email-mng.email.setup.edit");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    

}
