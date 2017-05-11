import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import{AlarmList_mock} from '../model/mock';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlarmNoticeListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //获取告警列表
    getAlarmList():Promise<any>{
        const api = this.restApiCfg.getRestApi("ali-mainAccount-list.get");
       // return this.restApi.request(api.method, api.url,null, null,null);
       return new Promise(resovle => setTimeout(resovle, 200)).then(() => AlarmList_mock);

    }

    //根据id获取告警项
    getAlarm(id:string):Promise<any>{
         const api = this.restApiCfg.getRestApi("ali-mainAccount-list.get");
       // return this.restApi.request(api.method, api.url,null, null,null);
       return new Promise(resovle => setTimeout(resovle, 200)).then(() => AlarmList_mock);
    }

}
