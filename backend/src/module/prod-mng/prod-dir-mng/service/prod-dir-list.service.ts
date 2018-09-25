import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,SystemDictionaryService } from '../../../../architecture';

import { dictPipe } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdDirListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService,
        private dictPipe : dictPipe
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
      field : "TYPE"    
   });
   //获取数据库中间件服务器类型列表
   serverTypeDic=this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
      owner : "GLOBAL",
      field : "SERVER_TYPE"    
   })
   //模板软件类型字典
    databaseTypeDic = this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
        owner: "DB",
        field: "DB_TYPE"
    })
    //数据库模板部署模式字典
    databaseDeployModeDic=this.dict.get({
        owner:'DB',
        field:'DEPLOYMENT_MODE'
    })
    //中间件模板部署模式字典
    middlewareDeployModeDic=this.dict.get({
        owner:'MIDDLEWARE',
        field:'DEPLOYMENT_MODE'
    })
    //中间件模板类型字典
    middlewareTypeDic = this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
        owner: "MIDDLEWARE",
        field: "TYPE"
    })
}
