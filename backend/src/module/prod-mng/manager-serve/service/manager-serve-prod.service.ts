import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,SystemDictionaryService,LayoutService} from '../../../../architecture';

import 'rxjs/add/operator/toPromise';
import { ManagerServeServiceModel, PmPool, Platform ,PlatformObj} from '../model/manager-serve-service.model';
import { ManagerServeProductModel,Enterprise} from '../model/manager-serve-product.model'


@Injectable()
export class ManagerServeProdService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService,
        private layoutService :LayoutService
    ) { }

    managerServeProduct:ManagerServeProductModel;
    managerServeService:ManagerServeServiceModel;
    enterpriseListForSelect:Array<Enterprise>=new Array<Enterprise>();
    //获取管理服务详情
    getManagerServeServiceDetail(id:string) {
        let api = this.restApiCfg.getRestApi("manager-serve-service-detail.get");
        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined)
    }
    //根据平台获取企业列表    
    getEnterpriseListById(list) {
        this.layoutService.show();
        let api = this.restApiCfg.getRestApi("prod-mng.prod-enterprise.post");
        return this.restApi.request(api.method, api.url, [], undefined,list).then(res=>{
            console.log(res);
            if(res.resultContent){
                this.enterpriseListForSelect=res.resultContent;                
            }
            this.managerServeProduct.platformSimpleItems=this.managerServeService.platformList;
            this.layoutService.hide();
        }).catch(err=>{
            console.error(err);
            this.layoutService.hide();
        });;
    }
    //获取企业列表    
    getEnterPriseList() {
        this.layoutService.show();
        let api = this.restApiCfg.getRestApi("prod-mng.prod-enterprise.list");
        return this.restApi.request(api.method, api.url, [], undefined).then(res=>{
            if(res.resultContent){
                this.enterpriseListForSelect=res.resultContent;                
            }
            this.layoutService.hide();
        }).catch(err=>{
            console.error(err);
            this.layoutService.hide();
        });
    }
    //获取管理服务对象列表
    dictServiceObjList = this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
      owner : "SUPERVISE_SERVICE",
      field : "TYPE"    
   });
   //创建管理服务产品   
   postManagerServeProduct(data:ManagerServeProductModel) {
        let api = this.restApiCfg.getRestApi("manager-serve-product-create.post");

        return this.restApi.request(api.method, api.url, [], undefined,data);
    }
}
  