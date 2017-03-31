import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

//model
import { PhyPartsList } from '../model/phy-parts-list.model';
import { Phyparts_mock } from '../model/phy-parts.mock.model';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PhyUnitMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    statusDic = this.dict.get({
        owner: "PMRESOURCE",
        field: "STATUS"
    });

    getData(pageIndex: number, pageSize: number): Promise<any>{
        const pathParams=[
            {
                key:"page",
                value: pageIndex
            },
            {
                key:"size",
                value: pageSize
            }
        ];
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.parts.data");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => Phyparts_mock);
    }

    getPartsList(): Promise<any>{
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.parts.speclist");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    create(criteria: PhyPartsList){
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.parts.create");
        return this.restApi.request(api.method, api.url, null, null,
            {
                "id": criteria.id,
                "partsId": criteria.partsId,
                "partsName": criteria.partsName,
                "referencePrice": criteria.referencePrice,
                "specId": criteria.specId,
                "specName": criteria.specName,
                "specValue": criteria.specValue
            });
    }

    edit(criteria: PhyPartsList){
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.parts.edit");
        return this.restApi.request(api.method, api.url, null, null,
            {
                "id": criteria.id,
                "partsId": criteria.partsId,
                "partsName": criteria.partsName,
                "referencePrice": criteria.referencePrice,
                "specId": criteria.specId,
                "specName": criteria.specName,
                "specValue": criteria.specValue
            });
    }

    delete(pmpartsId: string){
        const pathParams=[
            {
                key:"pmparts_id",
                value: pmpartsId
            }
        ];
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.parts.delete");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }


}
