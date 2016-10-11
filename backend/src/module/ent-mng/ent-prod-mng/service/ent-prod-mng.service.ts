import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EntProdMngTemplate } from '../model';
import { RestApiCfg, RestApi, ValidationService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntProdMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private validationService: ValidationService
    ) { }
    
    // 取得产品信息
    getEntProds(ent: String, region: String, page : number , size : number): Promise<any> {
        let api = null;

        if (!this.validationService.isBlank(ent) && !this.validationService.isBlank(region)) {
            api = this.restApiCfg.getRestApi('ent-mng.ent-prod-mng.ent.region.all.get');
        } else if (!this.validationService.isBlank(ent)) {
            api = this.restApiCfg.getRestApi('ent-mng.ent-prod-mng.ent.all.get');
        } else if (!this.validationService.isBlank(region)) {
            api = this.restApiCfg.getRestApi('ent-mng.ent-prod-mng.region.all.get');
        } else {
            api = this.restApiCfg.getRestApi('ent-mng.ent-prod-mng.all.get');
        }

        let pathParams = [
            {
                key: "_enterpriseId",
                value: ent
            },
            {
                key: "_regionId",
                value: region
            },
            {
                key: '_page',
                value: page
            },{
                key: '_size',
                value: size
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    // 更改产品状态
    changeStatus(status, datas) {
        let api = this.restApiCfg.getRestApi('ent-mng.ent-prod-mng.prod.status.put');

        let pathParams = [
            {
                key: '_status',
                value: status
            }
        ];

        let payload = [];

        datas.forEach(
            item => {
                if (item.isSelected) {
                    payload.push({ 'id': item.id });
                }
            }
        );

        return this.restApi.request(api.method, api.url, pathParams, undefined, payload);
    }
}