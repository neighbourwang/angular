import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

 import { PhysicalModel } from "../model/physical.model";
// import { AdUser } from "../model/aduser.model"
// import { adusers, attestDetail, attests } from "../model/attest-mock";
import "rxjs/add/operator/toPromise";

@Injectable()
export class PhysicalListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }


    //获取物理机列表
    getPhysicals(pageIndex: number, pageSize:number): Promise<any> {
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }

        ];
        const api = this.restApiCfg.getRestApi("physical-mng.physical.list.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }

    
}