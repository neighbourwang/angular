import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi ,SystemDictionaryService} from "../../../../architecture";

 import { PhysicalModel } from "../model/physical.model";
// import { IpmiInfo } from "../model/physical-ipmi.model"
 import { serverTypeListAndbrandList_mock, physicalMachine_mock,Hardware_mock } from "../model/mock";
import "rxjs/add/operator/toPromise";

@Injectable()
export class PhysicalEditService {
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

     dictProductType = this.dict.get({      
      owner : "PM",
      field : "SERVER_TYPE"    
   });


    //根据id获取物理机、查看物理机
    getPhysical(pmId: string): Promise<any> {
        const pathParams = [
            {
                key: "pm_id",
                value: pmId
            }
        ];
        const api = this.restApiCfg.getRestApi("physical-mng.physical.check");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => physicalMachine_mock);
    }

    //编辑物理机
    editPhysical(physical: PhysicalModel): Promise<any> {
        const api = this.restApiCfg.getRestApi("physical-mng.physical.edit");
        return this.restApi.request(api.method, api.url, null, null, physical);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }

    //添加物理机
    createPhysical(physical:PhysicalModel):Promise<any>{

        const api = this.restApiCfg.getRestApi("physical-mng.physical.create");
        return this.restApi.request(api.method, api.url, null, null,physical);
    }
    
    //获取物理机硬件信息
    getPhysicalHardwareInfo(physical:PhysicalModel):Promise<any>{

        const api = this.restApiCfg.getRestApi("physical-mng.physical.hardwareinfo.get");
        return this.restApi.request(api.method, api.url, null, null, 
        {           
            "iloIPAddress":physical.iloIPAddress,
            "iloPwd": physical.iloPwd,
            "iloUserName": physical.iloUserName
        }
        );
       //  return new Promise(resovle => setTimeout(resovle, 200)).then(() => Hardware_mock);

    }

    //获取物理机服务器的品牌、型号、类型
    getServer():Promise<any>{
        const api = this.restApiCfg.getRestApi("physical-mng.physical.serverInfo.get");
        return this.restApi.request(api.method, api.url, null, null, null);
      // return new Promise(resovle => setTimeout(resovle, 200)).then(() => serverTypeListAndbrandList_mock);
    }

    //修改ipmi信息
    updateIpmiInfo(physical:PhysicalModel,pmId:string):Promise<any>{
        const pathParams = [
            {
                key: "pm_id",
                value: pmId
            }

        ];
        const api = this.restApiCfg.getRestApi("physical-mng.physical.ipmiInfo.put");
        return this.restApi.request(api.method, api.url, pathParams, null, 
        {
            "iloIPAddress":physical.iloIPAddress,
            "iloPwd": physical.iloPwd,
            "iloUserName": physical.iloUserName 
        }
        );
    }

    //测试ipmi信息
    testIpmiInfo(physical:PhysicalModel):Promise<any>{
        
        const api = this.restApiCfg.getRestApi("physical-mng.physical.ipmiInfo.test.put");
        return this.restApi.request(api.method, api.url, null, null, 
        {
             "iloIPAddress":physical.iloIPAddress,
            "iloPwd": physical.iloPwd,
            "iloUserName": physical.iloUserName
        }        
       );
    }


}