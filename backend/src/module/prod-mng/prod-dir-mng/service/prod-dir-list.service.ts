/**
 * Created by wangyao on 2016/10/18.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,SystemDictionaryService } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdDirListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }  

    //�����ֵ�
    versionDic = this.dict.get({
        "owner":"SERVICE",
        "field":"STATUS"
    });

    // 取得所有产品目录
    getProdDirList(data:any) {
        console.log('disc',this.versionDic);
        let api = this.restApiCfg.getRestApi("prod-mng.prod-dir-mng.list.get");
        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
    //获取云主机产品规格列表    
     getProdDirSpecList() {
        let api = this.restApiCfg.getRestApi("services.flavors.get");
        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //获取管理服务对象列表
    dictServiceObjList = this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
      owner : "SUPERVISE_SERVICE",
      field : ""    
   });
}
