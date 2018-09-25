import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmailMngDictService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService,
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }
    
    typeDict = this.dict.get({  
        owner: "MAIL",
        field: "TYPE"
    });

    sendDict = this.dict.get({
        owner: "MAIL",
        field: "SEND"
    });

    temptypeDict = this.dict.get({
        owner: "MAIL",
        field: "TEMPLATE_TYPE"
    });

    receiverDict = this.dict.get({
        owner: "MAIL",
        field: "RECEIVER"
    });
}