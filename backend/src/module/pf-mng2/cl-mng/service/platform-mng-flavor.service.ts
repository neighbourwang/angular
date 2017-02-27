import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

@Injectable()
export class FlavorService{
    constructor(
        private http:Http,
        private restApi:RestApi,
        private restApiCfg:RestApiCfg
    ){}
    getFlavorList (id:string){
        let api = this.restApiCfg.getDataRestApi("platform-mng.flavorList.get");

        return this.restApi.request(api.method , api.url,[{key:'id',value:id}],undefined );
    }
} 