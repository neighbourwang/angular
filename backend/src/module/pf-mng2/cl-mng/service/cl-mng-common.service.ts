import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { CreStep1Model } from '../model/cre-step1.model'


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClMngCommonService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    // 类型数据字典
    private platFormTypes: Array<any> = new Array<any>();
    //地域数据字典
    private regions : Array<any> = new Array<any>();
    // 平台版本
    private version : Array<any> = new Array<any>();
    // 平台状态
    private status : Array<any> = new Array<any>();

    // 获取云平台类型的数据字典
    private platFormType() {
        let api = this.restApiCfg.getDataRestApi("sysdic.owner.field");

        return this.restApi.request(api.method, api.url, [
            {
                key: "_owner",
                value: 'PLATFORM'
            }, {
                key: "_field",
                value: "TYPE"
            }],undefined)
    }
    //获取地域
    private region (){
        let api = this.restApiCfg.getDataRestApi("pf.cre.step.01.paltform.get");

        return this.restApi.request(api.method , api.url ,undefined , undefined);
    }

    //根据平台类型获得版本
    private platFormVersion (owner : string){
        let api = this.restApiCfg.getDataRestApi("sysdic.owner.field");
        return this.restApi.request(api.method,api.url,[{key : "_owner",value : owner},{key : "_field", value : "VERSION"}],undefined);
    }

    //获取平台状态
    private platFormStatus(){
        let api = this.restApiCfg.getDataRestApi("sysdic.owner.field");

        return this.restApi.request(api.method, api.url, [
            {
                key: "_owner",
                value: 'GLOBAL'
            }, {
                key: "_field",
                value: "STATUS"
            }],undefined);
    }

    getPlatFormStatus() : Promise<Array<any>>{
        if(this.status.length == 0){
            return this.platFormStatus().then(
                res => {
                    this.status = res.resultContent;
                    return Promise.resolve(this.status);
                }
            )
        }else{
            return Promise.resolve(this.status);
        }
    }


    getPlatFormTypes() : Promise<Array<any>>{
        if(this.platFormTypes.length == 0){
            return this.platFormType().then(
                res => {
                    this.platFormTypes = res.resultContent;
                    return this.platFormTypes;
                }
            )
        }else{
            return Promise.resolve(this.platFormTypes);
        }
    }

    getRegion () : Promise<Array<any>>{
        if(this.regions.length == 0){
            return this.region().then(
                res =>{
                    this.regions = res.resultContent;
                    return this.regions;
                }
            )
        }else{
            return Promise.resolve(this.regions);;
        }
    }

    getVersion(id : string) : Promise<Array<any>>{
        if(this.version.length == 0){
            return this.platFormVersion(id).then(
                res => {
                    this.version = res.resultContent;
                    return this.version;
                }
            )
        }else{
            return Promise.resolve(this.version);
        }
    }



}
