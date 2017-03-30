import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../../architecture';

@Injectable()
export class OrderCancelService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;
    
    serviceType = this.dict.get({owner: 'GLOBAL', field:'SERVICE_TYPE'});
    billingModeType = this.dict.get({owner: 'BILLING_MODE', field:'TYPE'});
    packgeBilling = this.dict.get({owner: 'PACKAGE_BILLING', field:'PERIOD_TYPE'});
    subinstance = this.dict.get({owner: 'SUBINSTANCE', field:'STATUS'});
}