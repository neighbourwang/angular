import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model 
import { PhysicalProductModel,ProductEnterpiseReqs } from '../model/physical-product.model';
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj, Spec,FlatUnitObj } from '../model/physical-prod-service.model'

@Injectable()
export class PhysicalProductService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    product:PhysicalProductModel=new PhysicalProductModel();
    physicalService:PhysicalService=new PhysicalService();
    enterpriseListForSelect:Array<ProductEnterpiseReqs>;
    // unitList:FlatUnitObj;
    // 获取部件列表
    getUnitList() {
        let api = this.restApiCfg.getRestApi("physical-service-unitList.get");
        return this.restApi.request(api.method, api.url, [], undefined).then(res => {
            console.log('unitList', res);
            if (res.resultCode == '100') {
                // this.unitList = res.resultContent;
                this.product.pmPartsBaseprises=res.resultContent;
                this.product.pmPartsBaseprises.forEach(ele=>{
                    ele.ajustmentPrice=ele.referencePrice;
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    //获取物理机产品目录详情
    getPhysicalService(id:string){
        this.product=new PhysicalProductModel();
        this.physicalService=new PhysicalService();
        let api = this.restApiCfg.getRestApi("physical-service-detail.get");
        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined).then(res=>{
            console.log(res);
            this.physicalService=res.resultContent;
            this.product.serviceId=this.physicalService.serviceId;            
        }).catch(err=>{
            console.error(err);
        });    
    }   

    //创建物理机产品
    postPhysicalProduct(data:PhysicalProductModel){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.prod-cre.post");

        return this.restApi.request(api.method, api.url, [], undefined,data);
    }
    //获取企业列表    
    getEnterPriseList() {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-enterprise.list");
        return this.restApi.request(api.method, api.url, [], undefined).then(res=>{
            console.log(res);
            this.enterpriseListForSelect=res.resultContent;
        }).catch(err=>{
            console.error(err);
        });    ;
    }
}
  