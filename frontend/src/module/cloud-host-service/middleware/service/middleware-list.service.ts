import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { VmList,HandleVm, QuiryVmList } from '../model/vm-list.model';
import { MiddlewareLabelItem } from '../model/labe-iItem.model';
import { InstanceVMProfile } from '../model/vm.model'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiddlewareServiceList {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;
    
    getHostConfigList() : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getHostList(quiry:QuiryVmList) : Promise<any>{
        const api = this.restApiCfg.getRestApi("vm.search.page");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry);
        
        // return new Promise(next => {
        //     next({"resultCode":"100","detailDescription":null,"resultContent":[{"itemId":"62dd9317-f5c9-456a-ab1d-0c133ccdeb1c","subinstanceNo":"20170330174924761","subInstanceId":"229e2277-628c-4bbc-9d2f-1b642bdec495","instanceName":"泪流满面_7VJ_VBD","osInfo":"rhel6.5","specification":"1核CPU, 2048M内存, 6G启动盘","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","platformType":"2","networkType":"Net1","paymentType":"周期计费","description":null,"privateIP":"90041","publicIP":null,"regionZone":"前端云平台 Dev_Cluster","vmState":"1","diskCount":0,"snapshotCount":null,"expiryDate":null,"releaseDate":null,"createDate":null,"billingInfo":{"billingId":"2175a613-ffd1-4304-899e-b1c9fbe1138c","billingMode":0,"basePrice":45.0,"periodType":1,"basicPrice":3.0,"cyclePrice":23.0,"unitPrice":null,"unitType":null},"vcpus":0,"memoryMb":0,"rootGb":0,"serviceLevel":0,"useType":0,"runningMillionMeters":0,"uuid":"泪流满面_7VJ_VBD"}],"pageInfo":{"currentPage":1,"totalPage":1,"pageSize":20,"totalRecords":1}})
        // })
    }

    fetchVmState(vmid): Promise<any> {
        const api = this.restApiCfg.getRestApi("featch.vm.state");

        let pathParams = [
            {
                key: 'id',
                value: vmid
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;

        // return new Promise(next => {
        //     setTimeout(() => {
        //         next({"resultCode":"100","detailDescription":null,"resultContent":{"id":null,"vmState":""+Math.round(Math.random()*30),"uuid":"都得_GvH_34E"}}.resultContent)
        //     },500)
        // })

    }
    
    postVmInfo(instanceId:string, postData:InstanceVMProfile) : Promise<any> {
        const api = this.restApiCfg.getRestApi("vm.instance.detail.updata");

        let pathParams = [
            {
                key: 'instanceId',
                value: instanceId
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, postData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    handleVm(senData:HandleVm) : Promise<any> { 
        const api = this.restApiCfg.getRestApi("hosts.instance.action");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, senData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getLabels() : Promise<MiddlewareLabelItem[]> { 
        const api = this.restApiCfg.getRestApi("instance.labels");

        // const request = this.restApi.request(api.method, api.url, undefined, undefined)
        //                     .then(res => {
        //                         if(res.resultCode !== "100"){
        //                             throw "";
        //                         }
        //                         return res.resultContent;
        //                     });

        const mock = new Promise(next => {
            next(
                 [
                    {
                        labelCode : "22123",
                        labelDisplayName : "标签一",
                        labelId : "1232",
                        labelName : "biaoqianyi"
                    },
                    {
                        labelCode : "22123",
                        labelDisplayName : "fake标签",
                        labelId : "1233",
                        labelName : "biaoqianer"
                    },
                    {
                        labelCode : "22123",
                        labelDisplayName : "我只是一个mock标签",
                        labelId : "1243",
                        labelName : "biaoqiansa"
                    },
                ]
            ) 
        })
        return mock;
    }

    //数据字典所用到的值
    dictSourceType = this.dict.get({ 
        owner : "RESOURCE_USAGE_DETAIL",
        field : "SOURCE_TYPE"
    })

    dictStatus = this.dict.get({ 
        owner : "SUBINSTANCE",
        field : "STATUS"
    })

    computeStatus = this.dict.get({    //获取状态列表
        owner : "COMPUTE",
        field : "STATUS"
    });
    useType = this.dict.get({    //中间件类型
        owner : "GLOBAL",
        field : "USE_TYPE"
    });
    serviceLevel = this.dict.get({    //中间件服务级别
        owner : "GLOBAL",
        field : "SERVICE_LEVEL"
    });
    queryField = this.dict.get({    //中间件检索的字段列表，取数据字典的code返回
        owner : "GLOBAL_QUERY",
        field : "COMPUTE_INSTANCE"
    });
    addonType = this.dict.get({    //中间件附加服务类型
        owner : "COMPUTE_INSTANCE",
        field : "ADDON_TYPE"
    });
    ownerType = this.dict.get({    //实例归属
        owner : "INSTANCE",
        field : "OWNER_TYPE"
    });
}