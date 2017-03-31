import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { VmList,HandleVm, QuiryVmList } from '../model/vm-list.model';
import { VMInstanceLabelItem } from '../model/labe-iItem.model';
import { InstanceVMProfile } from '../model/vm.model'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostServiceList {
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
        //     next({"resultCode":"100","detailDescription":null,"resultContent":[{"itemId":"32e47c96-60a7-4752-a51c-8408df1deb32","subInstanceId":"01bce896-f2af-4434-a628-49edb1465a63","instanceName":"JasonVM05_ZXD","osInfo":"Centos-6.5_new","specification":"2核CPU, 1024M内存, 1G启动盘","platformId":"eb3f4908-873c-4e68-b759-8303491ea502","platformType":"0","networkType":"network01","paymentType":"周期计费","description":null,"privateIP":"10.1.1.10","publicIP":"","regionZone":"wuxin_openstack Jason_test2","vmState":"14","diskCount":0,"snapshotCount":null,"expiryDate":"2017-03-30 06:15:18","releaseDate":null,"createDate":null,"billingInfo":{"billingId":"9a30bd66-ce36-4639-b06b-49ef29cd6075","billingMode":0,"basePrice":30.0,"periodType":3,"basicPrice":10.0,"cyclePrice":20.0,"unitPrice":null,"unitType":null},"vcpus":0,"memoryMb":0,"rootGb":0,"serviceLevel":0,"useType":0,"runningMillionMeters":0,"uuid":"e4e9e155-9bd8-45f5-9dec-d5af7aa49a4f"},{"itemId":"be824679-e2dd-4aeb-b705-ebe50c0f1816","subInstanceId":"b53b2097-285c-4d11-b612-df89455985f1","instanceName":"JasonVM03_VrP","osInfo":"Centos-6.5_new","specification":"2核CPU, 1024M内存, 1G启动盘","platformId":"eb3f4908-873c-4e68-b759-8303491ea502","platformType":"0","networkType":"network01","paymentType":"周期计费","description":null,"privateIP":"10.1.1.9","publicIP":"","regionZone":"wuxin_openstack Jason_test2","vmState":"0","diskCount":0,"snapshotCount":null,"expiryDate":"2017-03-30 01:27:24","releaseDate":null,"createDate":null,"billingInfo":{"billingId":"9a30bd66-ce36-4639-b06b-49ef29cd6075","billingMode":0,"basePrice":30.0,"periodType":3,"basicPrice":10.0,"cyclePrice":20.0,"unitPrice":null,"unitType":null},"vcpus":0,"memoryMb":0,"rootGb":0,"serviceLevel":0,"useType":0,"runningMillionMeters":0,"uuid":"f70e206e-f25b-431b-99b8-275a125de6fc"},{"itemId":"e2249241-70e1-48a6-81dd-792eb912fe40","subInstanceId":"9081b00c-3e13-4cfe-bdf1-85fbb530c650","instanceName":"测试通过_U3J","osInfo":"Centos-6.5_new","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"eb3f4908-873c-4e68-b759-8303491ea502","platformType":"0","networkType":"network01","paymentType":"周期计费","description":null,"privateIP":"10.1.1.8","publicIP":"","regionZone":"wuxin_openstack nova_test01","vmState":"0","diskCount":0,"snapshotCount":null,"expiryDate":"2017-03-29 03:14:39","releaseDate":null,"createDate":null,"billingInfo":{"billingId":"df2907fd-6154-472b-b75a-92e84ffa7a98","billingMode":0,"basePrice":30.0,"periodType":3,"basicPrice":10.0,"cyclePrice":40.0,"unitPrice":null,"unitType":null},"vcpus":0,"memoryMb":0,"rootGb":0,"serviceLevel":0,"useType":0,"runningMillionMeters":0,"uuid":"f0a4567f-c29c-4c1e-86de-36a46ecfbc5d"},{"itemId":"d873e923-c7ef-4ad8-aac5-c71ac4f52cb7","subInstanceId":"9de6f58c-7cdc-40f2-99da-11b4666e7315","instanceName":"de_q5V","osInfo":"Centos-6.5_new","specification":"1核CPU, 512M内存, 1G启动盘","platformId":"eb3f4908-873c-4e68-b759-8303491ea502","platformType":"0","networkType":"network01","paymentType":"周期计费","description":null,"privateIP":"10.1.1.7","publicIP":"","regionZone":"wuxin_openstack nova_test01","vmState":"0","diskCount":0,"snapshotCount":null,"expiryDate":"2017-03-29 02:39:35","releaseDate":null,"createDate":null,"billingInfo":{"billingId":"df2907fd-6154-472b-b75a-92e84ffa7a98","billingMode":0,"basePrice":30.0,"periodType":3,"basicPrice":10.0,"cyclePrice":40.0,"unitPrice":null,"unitType":null},"vcpus":0,"memoryMb":0,"rootGb":0,"serviceLevel":0,"useType":0,"runningMillionMeters":0,"uuid":"0a963bc7-7d82-47dd-9dce-57da985e88c6"}],"pageInfo":{"currentPage":1,"totalPage":1,"pageSize":20,"totalRecords":4}})
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

    getLabels() : Promise<VMInstanceLabelItem[]> { 
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
    useType = this.dict.get({    //云主机类型
        owner : "GLOBAL",
        field : "USE_TYPE"
    });
    serviceLevel = this.dict.get({    //云主机服务级别
        owner : "GLOBAL",
        field : "SERVICE_LEVEL"
    });
    queryField = this.dict.get({    //云主机检索的字段列表，取数据字典的code返回
        owner : "GLOBAL_QUERY",
        field : "COMPUTE_INSTANCE"
    });
    addonType = this.dict.get({    //云主机附加服务类型
        owner : "COMPUTE_INSTANCE",
        field : "ADDON_TYPE"
    });
    ownerType = this.dict.get({    //实例归属
        owner : "INSTANCE",
        field : "OWNER_TYPE"
    });
}