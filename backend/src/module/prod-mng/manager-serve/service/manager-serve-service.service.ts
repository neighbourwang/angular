import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';
import { ManagerServeServiceModel, PmPool, Platform ,PlatformObj} from '../model/manager-serve-service.model';


@Injectable()
export class ManagerServeServiceService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
    ) { }

    //获取可用资源池列表
    getResourcePoolList() {
        let api = this.restApiCfg.getRestApi("physical-service-resourcepool.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //获取平台信息
    getDiskPlateForms() {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-disk-dir.plateforms");
        return this.restApi.request(api.method, api.url, undefined, undefined);
    }
    //创建管理服务产品目录    
    postManagerServeService(data:ManagerServeServiceModel) {
        let api = this.restApiCfg.getRestApi("manager-serve-service-create.post");

        return this.restApi.request(api.method, api.url, [], undefined,data);
    }
}
  