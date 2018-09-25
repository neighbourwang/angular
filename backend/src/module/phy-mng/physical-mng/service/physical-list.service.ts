import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi ,SystemDictionaryService} from "../../../../architecture";

 import { PhysicalListModel } from "../model/physicalList.model";
 import { PmQuery} from "../model/pmQuery.model"
 import {  PhysicalList_mock  } from "../model/mock";

import "rxjs/add/operator/toPromise";

@Injectable()
export class PhysicalListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    dicMain = this.dict.get(
             {      
                owner : "PM",
                field : "STATUS"             //运维状态
            }             
    );
    dicHealth = this.dict.get(
                {      
                    owner : "PM",
                    field : "HEALTH_STATUS"    //健康检查
                }             
    );
    dicUseage = this.dict.get(
                {      
                    owner : "PM",
                    field : "USED_STATUS"    //使用状态
                }             
    );
    dicPower = this.dict.get(
                {      
                    owner : "PM",
                    field : "POWER_OO_STATUS"    //电源状态
                }             
    );


    //获取物理机列表
    getPhysicals(pageIndex: number, pageSize:number,pmQuery:PmQuery,poolId:string): Promise<any> {
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            },
             {
                key: "pmpool_id",
                value: poolId
            }
        ];
        const api = this.restApiCfg.getRestApi("physical-mng.physical.list.get");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "brand": pmQuery.brand,
                "iloAddr": pmQuery.iloAddr,
                "model": pmQuery.model,
                "pmName": pmQuery.pmName,
                "privateIpAddr": pmQuery.privateIpAddr,
                "publicIpAddr": pmQuery.publicIpAddr
                }
        );
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhysicalList_mock);
    }

    //根据资源池id获取资源池信息
    getPoolInfo(poolId:string){
         const pathParams = [
            {
                key: "pmpool_id",
                value:poolId
            }
        ];
        const api = this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.view");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }

    //修改物理机的状态
    updateStatusAndDelete(pmId:string,status:string):Promise<any>{
         const pathParams = [
            {
                key: "pm_id",
                value: pmId
            },
            {
                key: "status",
                value: status
            }
        ];

        const api = this.restApiCfg.getRestApi("physical-mng.physical.statusChange");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }

    //获取物理机电源状态
    getPhysicalPowerStatus(id:string):Promise<any>{      
         const pathParams = [
            {
                key: "pmId",
                value: id
            },
        ];
        const api = this.restApiCfg.getRestApi("physical-mng.physical.power.status");
        const request= this.restApi.request(api.method, api.url, pathParams, null,null)
        .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    
}