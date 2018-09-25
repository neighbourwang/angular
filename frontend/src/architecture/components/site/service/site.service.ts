import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SiteService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    logOut() : Promise<any>{
        const api = this.restApiCfg.getRestApi("uaa.logout");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, undefined)
                           
        return request;
    }

}