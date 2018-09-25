import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';
import { EntProdMngServiceDetail, Enterprise, Region, Directory } from '../model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntProdCreService {    
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }
        
    // 获取企业    
    getEnterprises(): Promise<any> {
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.enterprises.get');

           let pathParams = [
            {
                key: 'page',
                value: 1
            },{
                key: 'size',
                value: 1000
            }
        ];
        
        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }
    
    // 获取区域
    getRegions(): Promise<any> {
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.regions.get');

        return this.restApi.request(api.method, api.url, undefined, undefined, undefined);
    }

    
    // 获取服务目录
    getDirectories(regionId: String): Promise<any> {
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.directories.get');

        let pathParams = [
            {
                key: 'region_id',
                value: regionId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    // 获取所有可用区
    getFlavors(platformId : String): Promise<any> {
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.storages.get');
        
        let pathParams = [
            {
                key: 'pf_id',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }
    
    createProd(serviceDetail: EntProdMngServiceDetail) {
        let enterpriseId: String = serviceDetail.enterpriseId;

        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-cre.creation');

        let pathParams = [
            {
                key: 'enterpriseId',
                value: enterpriseId
            }
        ];

        let payload = {
            "desc": serviceDetail.description,
            "enterpriseId": enterpriseId,
            "id": null,
            "name": serviceDetail.entProdName,
            "platformId": serviceDetail.platformId,
            "regionId": serviceDetail.regionId,
            "serviceId": serviceDetail.serviceId,
            "skus": []
        }

        serviceDetail.flavors.forEach(
            item => {
                let sku = {
                    "periodType": serviceDetail.periodType,
                    "price": item.price,
                    "quantity": item.quantity,
                    "skuId": item.uuid
                };
            }
        );

        return this.restApi.request(api.method, api.url, pathParams, undefined, payload);
    }
}