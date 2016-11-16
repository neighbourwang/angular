import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model 
import { IpMngModel } from '../model/ip-mng.model';
import { IpMngQuery } from '../model/ipquery.model';
import { IpMngModel_mock } from '../model/ip-mng.mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    //getIpMngList(query: IpMngQuery, pageIndex: number, pageSize: number): Promise <any> {
    getIpMngList(query: IpMngQuery): Promise <any> {
        //API CALL
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpMngModel_mock });
    }

}
