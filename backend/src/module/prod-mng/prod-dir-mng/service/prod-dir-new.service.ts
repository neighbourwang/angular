
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class CreateProdDirService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 新建VM产品目录
    postVmProdDir(data: any) {
        let api = this.restApiCfg.getRestApi("prod-dir-vmCreate");
        return this.restApi.request(api.method, api.url, undefined, undefined, data);
    }
    //根据cpu和mmr获取平台列表；
    postCpuMmr(vcpu: number, mmr: number,bootSize:number) {
        let body = {
            "serviceTemplateCode": "",
            "vmServiceSpecQueryCondition": {
                "cpuCore": vcpu,
                "memSize": mmr,
                "bootSize":bootSize
            }
        }
        console.log(body);
        let api = this.restApiCfg.getRestApi("prod-dir-vmPlate");
        return this.restApi.request(api.method, api.url, undefined, undefined, body, );
    }
    //编辑云主机产品你目录
    


    //新建Disk产品
    postDiskProdDir(data: any) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-disk-dir.create");
        return this.restApi.request(api.method, api.url, undefined, undefined, data);
    }
    //获取DISK产品平台信息
    getDiskPlateForms() {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-disk-dir.plateforms");
        return this.restApi.request(api.method, api.url, undefined, undefined);
    }

}