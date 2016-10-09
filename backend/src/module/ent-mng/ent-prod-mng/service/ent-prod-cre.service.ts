import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';
import { ServiceDetail } from '../model/ServiceDetail.model';
import {Industry} from '../model/industry.model';
import {Region} from '../model/region.model';
import {Storage} from '../model/storage.model';
import {Directory} from '../model/directory.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntProdCreService {

    private cachedServiceDetail: ServiceDetail;
   
    cashedIndustry : Industry[];
    cachedRegions: Region[];
    cachedStorages: Storage[];
    cashedDirectory : Directory[];


   constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }
    

    getCachedServiceDetail(): ServiceDetail {
        return this.getCachedData();
    }

    private getCachedData(): ServiceDetail {
        this.cachedServiceDetail = this.cachedServiceDetail || new ServiceDetail();
        return this.cachedServiceDetail;
    }
    
    getRegions(platformId: string  ): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.zones.get');

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    getStorages(platformId: string): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.storages.get');

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    getIndustries(platformId: string): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.storages.get');

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    getDirectories(platformId: string): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.storages.get');

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    createProd(){

    }

}