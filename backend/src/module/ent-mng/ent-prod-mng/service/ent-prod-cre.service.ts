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
   
    cashedEnterprise : Industry[];
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
        
    //获取企业    
    getEnterprises(page:number,size:number): Promise<any> {
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.enterprises.get');

           let pathParams = [
            {
                key: 'page',
                value: page
            },{
                key: 'size',
                value: size
            }
        ];


        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }
    
    //获取区域
    getRegions(): Promise<any> {
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.regions.get');

        return this.restApi.request(api.method, api.url, undefined, undefined, undefined);
    }

    
    //获取服务目录
    getDirectories(regionId: string): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.directories.get');

        let pathParams = [
            {
                key: 'region_id',
                value: regionId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    //获取所有可用区
    getStorages(platformId : string): Promise<any> {
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.storages.get');
        
        let pathParams = [
            {
                key: 'pf_id',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }
    
    createProd(enterpriseId : string,serviceDetail: ServiceDetail){
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.creation');

        let pathParams = [
            {
                key: 'enterpriseId',
                value: enterpriseId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, serviceDetail);
    }

}