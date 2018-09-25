import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel,SystemDictionaryService } from '../../../../architecture';

import{AlarmList_mock,ReceiversList_mock} from '../model/mock';
import{ AlarmListModel,Threshold,Receiver} from '../model/alarm-list.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlarmNoticeListService {
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
    dictSwitch= this.dict.get(
        {      
        owner : "MAINTAIN",
        field : "SWITCH"             //告警开关1打开2关闭
    }             
    );
    dictMethod = this.dict.get(
        {      
        owner : "MAINTAIN",
        field : "METHOD"      //告警方式
    }             
    );
    dictLevel = this.dict.get(
        {      
        owner : "MAINTAIN",
        field : "LEVEL"      //告警级别
    }             
    );
     dictPeriod = this.dict.get(
        {      
        owner : "MAINTAIN",
        field : "PERIOD"      //周期
    }             
    );
   
    dictContent = this.dict.get(
        {      
        owner : "MAINTAIN",
        field : "ALERTCONTENT"      //告警内容
    }             
    );
    
    //获取告警列表
    getAlarmList():Promise<any>{
        const api = this.restApiCfg.getRestApi("trigger-list.get");
      return this.restApi.request(api.method, api.url,null, null,null);
     // return new Promise(resovle => setTimeout(resovle, 200)).then(() => AlarmList_mock);

    }

    //根据id获取告警项
    getAlarm(id:string):Promise<any>{
         const pathParams = [
            {
                key: "itemId",
                value: id
            },             
        ]
         const api = this.restApiCfg.getRestApi("trigger-detail.get");
        return this.restApi.request(api.method, api.url,pathParams, null,null);
      // return new Promise(resovle => setTimeout(resovle, 200)).then(() => AlarmList_mock);
    }

    //获取接收人列表
    getReceivers():Promise<any>{
         const api = this.restApiCfg.getRestApi("trigger-receiver-list.get");
        return this.restApi.request(api.method, api.url,null, null,null);
      //return new Promise(resovle => setTimeout(resovle, 200)).then(() => ReceiversList_mock);
    }

    //更新
    update(alarm:AlarmListModel):Promise<any>{
         const api = this.restApiCfg.getRestApi("trigger-update.put");
       return this.restApi.request(api.method, api.url,null, null,alarm);
       //return new Promise(resovle => setTimeout(resovle, 200)).then(() => AlarmList_mock);
    }


}
