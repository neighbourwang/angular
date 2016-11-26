import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

import {Image} from '../model/image.model';
import { CriteriaQuery } from '../model/criteria-Query.model';
import { Images_mock} from'../model/images.mock.model'
import { Tenants_mock} from'../model/tenants.mock.model'
import { SyncPublic_mock } from '../model/sync-public.mock.model'

@Injectable()
export class OpenstackMngService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    getImages(criteriaQuery: CriteriaQuery, platformId:string, pageIndex: number, pageSize: number): Promise<any>{
        const pathParams = [
            {
                key: "platformId",
                value: platformId
            },
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        // const api = this.restApiCfg.getRestApi('host-mng.openstack-mng.image.list');
        // return this.restApi.request(api.method, api.url, pathParams, null, {
        //     "type": criteriaQuery.type,
        //     "tenantId": criteriaQuery.tenantId})
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_mock });
    }

    getTenants(platformId:string){
        const pathParams = [
            {
                key: "platformId",
                value: platformId
            }
        ];
        //  const api = this.restApiCfg.getRestApi('host-mng.openstack-mng.image.tenantlist');
        // return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return Tenants_mock});
    }
    saveEditImage(image:Image){
        const pathParams = [
            {
                key: "id",
                value: image.id
            }
        ];
        // const api = this.restApiCfg.getRestApi('host-mng.openstack-mng.image.saveedit');
        // return this.restApi.request(api.method, api.url, pathParams, null, {
        //      "displayName": image.displayName,
        //     "os": image.os,
        //     "bitesType": image.bitesType,
        //     "type": image.type,
        //     "description": image.description});
        return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return {
            resultCode: 100,
            detailDescription: null
            }}
        );
    }

    //启用/禁用
    imageEnableOrDisable(id:string,status:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            },
             {
                key: "status",
                value: status
            }
        ];

        // const api = this.restApiCfg.getRestApi("host-mng.openstack-mng.image.EDable");
        // return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return {
                resultCode: 100,
                detailDescription: null
            }}
        );
    }
    //host-mng.openstack-mng.image.sync-public.getlist
    getSynImages_public(platformId:string): Promise<any>{
        const pathParams = [
            {
                key: "platformId",
                value: platformId
            }
        ];

        // const api = this.restApiCfg.getRestApi("host-mng.openstack-mng.image.sync-public.getlist");
        // return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return SyncPublic_mock});
    }

    //host-mng.openstack-mng.image.sync-public.sync
    doSynImages_public(platformId:string, synImages:Array<Image>): Promise<any>{
        const pathParams = [
            {
                key: "platformId",
                value: platformId
            }
        ];

        // const api = this.restApiCfg.getRestApi("host-mng.openstack-mng.image.sync-public.sync");
        // return this.restApi.request(api.method, api.url, pathParams, null, synImages);
         return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return {
                resultCode: 100,
                detailDescription: null
            }}
        );
    }
}