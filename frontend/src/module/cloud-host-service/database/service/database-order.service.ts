import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatabaseServiceOrder {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }


    fetchDatabaseInit (): Promise<any> {
        const api = this.restApiCfg.getRestApi("database.template.init");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    fetchShoppingMDproducts (postData): Promise<any> {
        const api = this.restApiCfg.getRestApi("shopping.MDproducts");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, postData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    fetchDatabaseSearch(postData): Promise<any> {
        const api = this.restApiCfg.getRestApi("database.template.search");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, postData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }
}
