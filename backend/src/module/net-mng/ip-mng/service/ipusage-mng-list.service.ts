import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model 
import { IpUsageMngModel } from '../model/ipusage-mng.model';
import { IpUsageMngModel_mock } from '../model/ipusage-mng.mock';
import { Success_mock } from '../model/success.mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpUsageMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getIpUsageMngList( id: string ): Promise <any> {
        //API CALL
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpUsageMngModel_mock });
    }

    enableIP(ip_id: string): Promise <any>  {
        console.log("enableIP");        
        //API CALL
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });


    }

    disableIP(ip_id: string): Promise <any>  {
        console.log("disableIP");
        //API CALL
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });

    }

}
