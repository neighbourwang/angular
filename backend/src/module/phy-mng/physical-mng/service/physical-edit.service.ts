import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

 import { PhysicalModel } from "../model/physical.model";
 import {  IpmiInfo } from "../model/physical-ipmi.model"
// import { adusers, attestDetail, attests } from "../model/attest-mock";
import "rxjs/add/operator/toPromise";

@Injectable()
export class PhysicalEditService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }


    //根据id获取物理机、查看物理机
    getPhysical(id: string): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("physical-mng.physical.check");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }

    //编辑物理机
    editPhysical(physical: PhysicalModel, id:string): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.edit");
        return this.restApi.request(api.method, api.url, pathParams, null, physical);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }

    //添加物理机
    createPhysical(physical:PhysicalModel):Promise<any>{

        const api = this.restApiCfg.getRestApi("physical-mng.physical.create");
        return this.restApi.request(api.method, api.url, null, null,physical);
    }
    
    //获取物理机硬件信息
    getPhysicalHardwareInfo(physical:PhysicalModel): Promise<any>{
        const pathParams = [
            {
                key: "ip_addr",
                value: physical.ipAddr
            },
            {
                key: "username",
                value: physical.username
            },
            {
                key: "password",
                value: physical.password
            },
            
        ];
        const api = this.restApiCfg.getRestApi("physical-mng.physical.hardwareinfo.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);

    }

    //获取物理机服务器的品牌、型号、类型
    getServer():Promise<any>{
        
        const api = this.restApiCfg.getRestApi("physical-mng.physical.serverInfo.get");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    //修改ipmi信息
    updateIpmiInfo(ipmi:IpmiInfo,pmId:string):Promise<any>{
        const pathParams = [
            {
                key: "pm_id",
                value: pmId
            }

        ];
        const api = this.restApiCfg.getRestApi("physical-mng.physical.ipmiInfo.put");
        return this.restApi.request(api.method, api.url, pathParams, null, ipmi);
    }

    //测试ipmi信息
    testIomiInfo(ipmi:IpmiInfo):Promise<any>{
        
        const api = this.restApiCfg.getRestApi("physical-mng.physical.ipmiInfo.test.put");
        return this.restApi.request(api.method, api.url, null, null, ipmi);
    }


}