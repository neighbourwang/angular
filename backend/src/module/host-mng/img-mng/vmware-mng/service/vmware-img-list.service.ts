import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model
import { VmwareImgModel, CriteriaQuery, VmwareEntModel } from '../model/vmware-img-list.model';

//mock
import { VmwareImgModel_mock } from '../model/vmware-img-list.mock';
import { success_resp_mock } from '../model/vmware-img-enable-disable.mock';


@Injectable()
export class VmwareImgListService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getVmwareImgList( platformId: string, queryOpt: CriteriaQuery, pageIndex: number, pageSize: number): Promise<any>{
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
        const obj = {
                "type": queryOpt.type,
                "tenantId": queryOpt.tenantId
        };
        console.log(platformId, obj, "(((((((((((((((((((platformId and obj)))))))))))))))))))");
        
        //*
        const api = this.restApiCfg.getRestApi("host-mng.vmware-mng.image.list");
        return this.restApi.request(api.method, api.url, pathParams, null, obj);
        //*/
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return VmwareImgModel_mock });
    }

    enableImage(img_id: string, status: any): Promise<any> {
        ///*
        const pathParams = [
            {
                key: "id",
                value: img_id
            },
            {
                key: "status",
                value: status
            }            
        ];
        console.log(img_id, status, "(((((((((((((((((((((img_id and status)))))))))))))))))))))img_id and status");
        const api = this.restApiCfg.getRestApi("host-mng.vmware-mng.image.enable-disable");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //*/
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return success_resp_mock });
    }

    disableImage(img_id: string, status: any): Promise<any> {
        ///*
        const pathParams = [
            {
                key: "id",
                value: img_id
            },
            {
                key: "status",
                value: status
            }            
        ];
        console.log(img_id, status, "((((((((((((((((((((img_id and status))))))))))))))))))))");
        const api = this.restApiCfg.getRestApi("host-mng.vmware-mng.image.enable-disable");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //*/
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return success_resp_mock });
    }

    updateImage(image: VmwareImgModel): Promise<any> {
        ///*
        const pathParams = [
            {
                key: "id",
                value: image.id
            }
        ];
        const obj = {
                "displayName" : image.displayName,
                "os" : image.os,
                "bitsType" : image.bitsType,
                "type" : image.type,
                //"capacity" : image.capacity,
                "description" : image.description
        };
        console.log(image, obj, "(((((((((((((((((((((image and obj)))))))))))))))))))))");
        const api = this.restApiCfg.getRestApi("host-mng.vmware-mng.image.edit");
        return this.restApi.request(api.method, api.url, pathParams, null, obj);
        //*/

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return success_resp_mock });
    }

    getEntList( platformId: string ): Promise<any>{
        //*
        const pathParams = [
            {
                key: "platformId",
                value: platformId

            }
        ];
        //const obj = {
        //        "platformId": criteriaQuery.platformId,
        //        "type": criteriaQuery.type,
        //        "tenantId": criteriaQuery.tenantId
        //};
        console.log(platformId, "platformId in getEntList()");
        const api = this.restApiCfg.getRestApi("host-mng.vmware-mng.dropdown-ent.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //*/
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return EnterpriseModel_mock });
    }
    
}