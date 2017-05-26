import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,LayoutService} from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model 
import { PhysicalProductModel,ProductEnterpriseReqs } from '../model/physical-product.model';
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj, Spec,FlatUnitObj } from '../model/physical-prod-service.model'

@Injectable()
export class PhysicalProductService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private layoutService:LayoutService
    ) { }

    product:PhysicalProductModel=new PhysicalProductModel();
    physicalService:PhysicalService=new PhysicalService();
    enterpriseListForSelect:Array<ProductEnterpriseReqs>;
    // unitList:FlatUnitObj;
    // 获取部件列表
    getUnitList() {
        this.layoutService.show();
        let api = this.restApiCfg.getRestApi("physical-service-unitList.get");
        return this.restApi.request(api.method, api.url, [], undefined).then(res => {
            console.log('unitList', res);
            if (res.resultCode == '100') {
                // this.unitList = res.resultContent;
                this.product.pmPartsBaseprises=res.resultContent;
                this.product.pmPartsBaseprises.forEach(ele=>{
                    ele.ajustmentPrice=ele.referencePrice;
                    ele.priceValid=true;
                })
            }
            this.layoutService.hide();
        }).catch(err => {
            this.layoutService.hide();
            console.log(err);
        })
    }
    //获取物理机产品目录详情
    getPhysicalService(id:string){
        this.layoutService.show();
        this.product=new PhysicalProductModel();
        this.physicalService=new PhysicalService();
        let api = this.restApiCfg.getRestApi("physical-service-detail.get");
        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined).then(res=>{
            console.log(res);
            this.physicalService=res.resultContent;
            this.layoutService.hide();
            this.product.serviceId=this.physicalService.serviceId;            
        }).catch(err=>{
            this.layoutService.hide();
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
        this.layoutService.show();
        let api = this.restApiCfg.getRestApi("prod-mng.prod-enterprise.list");
        return this.restApi.request(api.method, api.url, [], undefined).then(res=>{
            console.log(res);
            this.layoutService.hide();
            this.enterpriseListForSelect=res.resultContent;
        }).catch(err=>{
            this.layoutService.hide();
            console.error(err);
        });    ;
    }
}
  