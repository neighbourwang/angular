import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { RegionModel, keysecretModel } from '../../cloud-disk/model/cloud-disk.model';
import { orderVmPageModel, QuantityModel, instanceListModel, 
    priceSubmitModel, priceCommodityModel, orderSubmitModel, GetSecGroupSubmitModel, 
    GetInstancesSubmitModel, VmQueryObject } from "../model/cloud-vm.model";

@Injectable()
export class AliCloudVmService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    keysecret: keysecretModel = new keysecretModel();
    quantity: Array<QuantityModel> = [
        {
            displayValue: "1",
            monthnum: 1
        },
        {
            displayValue: "2",
            monthnum: 2
        },
        {
            displayValue: "3",
            monthnum: 3
        },
        {
            displayValue: "4",
            monthnum: 4
        },
        {
            displayValue: "5",
            monthnum: 5
        },
        {
            displayValue: "6",
            monthnum: 6
        },
        {
            displayValue: "7",
            monthnum: 7
        },
        {
            displayValue: "8",
            monthnum: 8
        },
        {
            displayValue: "9",
            monthnum: 9
        },
        {
            displayValue: " 1",
            monthnum: 12
        },
        {
            displayValue: " 2",
            monthnum: 24
        },
        {
            displayValue: " 3",
            monthnum: 36
        },
    ];

    getArea(regionid: string): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        //console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.regionZone.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    getImages(regionid: string): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
             "accessinfo": {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
             },
             "pageNumber": 1,
             "pageSize": 100
        }
        //console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.image.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    getInstanceFamilyTree(regionid: string): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        //console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.family.tree.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    getVPCs(regionid: string) : Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            //"isDefault": "",
            //"vpcId": "",
            "pageNumber": "1",
            "pageSize": "50"
            
            }
        console.log(body, "getVPCs body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.vpc.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    getVSwitches(selectedOrderVmPage: orderVmPageModel): Promise<any> {
        const pathParams = [
            {
                key: "vpcid",
                value: selectedOrderVmPage.selectedVpcId
            }
        ];

        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "pageNumber": "1",
            "pageSize": "50",
            "zoneId": selectedOrderVmPage.selectedArea.ZoneId
        }

        console.log(body, "getVSwitches body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.vswitch.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    serviceGetVSwitches(selectedOrderVmPage: orderVmPageModel): Promise<any> {
        const pathParams = [
            {
                key: "vpcid",
                value: selectedOrderVmPage.selectedVpcId
            }
        ];

        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "pageNumber": "1",
            "pageSize": "50",
            "zoneId": selectedOrderVmPage.selectedArea.ZoneId
        }

        console.log(body, "serviceGetVSwitches body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.vswitch.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body)
            .then(
            res => {
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
            );
    }

    getSecurityGroups(regionid: string, selectedOrderVmPage:orderVmPageModel) {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        let body: GetSecGroupSubmitModel = new GetSecGroupSubmitModel();
        body.accessinfo.accessId = this.keysecret.accessId;
        body.accessinfo.accessSecret = this.keysecret.accessSecret;
        body.pageNumber = "1";
        body.pageSize = "50";
        /*
        if(selectedOrderVmPage.selectedNetworkType == 'classic') {
            body.vpcId = null;
        } else if (selectedOrderVmPage.selectedNetworkType == 'vpc'){
            body.vpcId = selectedOrderVmPage.selectedVpcId;
        }
        */
        body.vpcId = null;
        
        console.log(body, "getSecurityGroups body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.securitygroup.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    serviceGetSecurityGroups(regionid: string, selectedOrderVmPage:orderVmPageModel) {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        let body: GetSecGroupSubmitModel = new GetSecGroupSubmitModel();
        body.accessinfo.accessId = this.keysecret.accessId;
        body.accessinfo.accessSecret = this.keysecret.accessSecret;
        body.pageNumber = "1";
        body.pageSize = "50";
        /*
        if(selectedOrderVmPage.selectedNetworkType == 'classic') {
            body.vpcId = null;
        } else if (selectedOrderVmPage.selectedNetworkType == 'vpc'){
            body.vpcId = selectedOrderVmPage.selectedVpcId;
        }
        */
        body.vpcId = null;
        
        console.log(body, "serviceGetSecurityGroups body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.securitygroup.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    calculatePrice(selectedOrderVmPage: orderVmPageModel): Promise<any> {
        let body1 = {
            "orderType": "traffic-bandwidth",
            "regionId": selectedOrderVmPage.RegionId
        };
        let body2: priceSubmitModel = new priceSubmitModel();
        
        body2.orderType = "instance-buy";
        body2.regionId = selectedOrderVmPage.RegionId;
        body2.zoneId = selectedOrderVmPage.selectedArea.ZoneId;

        body2.commodity.instanceType = selectedOrderVmPage.selectedInstanceType;

        body2.commodity.amount = 1;
        body2.commodity.maxAmount = 1;
        
        body2.commodity.imageId =  selectedOrderVmPage.selectedImage;

        body2.commodity.systemDisk.category = selectedOrderVmPage.selectedDisk;
        body2.commodity.systemDisk.size = selectedOrderVmPage.diskCount;

        body2.commodity.securityGroupId = selectedOrderVmPage.SecurityGroupId;
        body2.commodity.securityGroupRule = null;//selectedOrderVmPage.securityGroupRule;

        /*
        if(selectedOrderVmPage.selectedGeneration == "ecs-1"){
            body2.commodity.ioOptimized = false;
        } else {
            body2.commodity.ioOptimized = true;
        }
        */
        body2.commodity.ioOptimized = selectedOrderVmPage.ioOptimized_price;
        
        body2.commodity.networkType = selectedOrderVmPage.selectedNetworkType;
        if(body2.commodity.networkType == 'classic') {
            body2.commodity.vpcId = null;
            body2.commodity.internetChargeType = selectedOrderVmPage.selectedInternetChargeType;
            body2.commodity.internetMaxBandwidthOut = selectedOrderVmPage.selectedInternetMaxBandwidthOut;            
        } else if (body2.commodity.networkType == 'vpc'){
            body2.commodity.vpcId = selectedOrderVmPage.selectedVpcId;
            body2.commodity.internetChargeType = selectedOrderVmPage.selectedInternetChargeType;
            body2.commodity.internetMaxBandwidthOut = selectedOrderVmPage.selectedInternetMaxBandwidthOut;
            
            /*
            if(selectedOrderVmPage.AllocatePublicIP == false) {
                body2.commodity.internetChargeType = selectedOrderVmPage.selectedInternetChargeType;
                body2.commodity.internetMaxBandwidthOut = 0;             
            } else if(selectedOrderVmPage.AllocatePublicIP == true) {
                body2.commodity.internetChargeType = selectedOrderVmPage.selectedInternetChargeType;
                body2.commodity.internetMaxBandwidthOut = selectedOrderVmPage.selectedInternetMaxBandwidthOut; 
            }
            */
        }

        if(selectedOrderVmPage.selectedChargeType.toLowerCase()=='postpaid') {
            body2.commodity.period = 1;
            body2.commodity.priceUnit = 'Hour';
            body2.commodity.periodType = 'Hourly';
            body2.commodity.autoRenew = null;
        } else if (selectedOrderVmPage.selectedChargeType.toLowerCase()=='prepaid') {
            if (selectedOrderVmPage.selectedQuantity<12) {
                body2.commodity.period = selectedOrderVmPage.selectedQuantity;
                body2.commodity.priceUnit = 'Month';
                body2.commodity.periodType = 'Monthly';
            } else if (selectedOrderVmPage.selectedQuantity>=12) {
                body2.commodity.period = selectedOrderVmPage.selectedQuantity/12;
                body2.commodity.priceUnit = 'Year';
                body2.commodity.periodType = 'Yearly';
            }
            body2.commodity.autoRenew = selectedOrderVmPage.renew;
        }

        console.log("----------- InternetChargeType ------------", selectedOrderVmPage.selectedInternetChargeType);
        
        let str1 = JSON.stringify(body1);
        console.log(str1);
        let str2 = JSON.stringify(body2);
        console.log(str2);
        

        let body: any = null;
        //if (selectedOrderVmPage.selectedInternetChargeType == null || selectedOrderVmPage.selectedInternetChargeType.toLowerCase() == "paybybandwidth") { //固定带宽，只传一个instance-buy
        if (selectedOrderVmPage.selectedInternetChargeType.toLowerCase() == "paybybandwidth") { //固定带宽，只传一个instance-buy
            body = [body2];
        } else if (selectedOrderVmPage.selectedInternetChargeType.toLowerCase() == "paybytraffic") { //按量带宽，多传一个traffic-bandwidth            
            body = [body1, body2];
        } else {
            body = [body2];
        } 
        console.log(body, "calculatePrice body!!!!!!!!!!!");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.price.get");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    createInstanceOrder(selectedOrderVmPage: orderVmPageModel): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: selectedOrderVmPage.RegionId
            }
        ];
        let body2:orderSubmitModel = new orderSubmitModel();
        body2.accessinfo.accessId = this.keysecret.accessId;
        body2.accessinfo.accessSecret = this.keysecret.accessSecret;

        body2.imageId = selectedOrderVmPage.selectedImage;
        body2.instanceType = selectedOrderVmPage.selectedInstanceType;

        body2.clientToken = null;
        body2.hostName = null;        
        body2.internetMaxBandwidthIn = null;
        body2.nodeControllerId = null;
        body2.privateIpAddress = null;
        body2.userData = null;
        body2.description = null;
        body2.systemDiskDescription = null;
        body2.systemDiskDiskName = null;

        body2.instanceChargeType = selectedOrderVmPage.selectedChargeType;
        if(selectedOrderVmPage.selectedChargeType.toLowerCase()=='postpaid') {
            body2.autoRenew = null;
            body2.autoRenewPeriod = null;
        } else if (selectedOrderVmPage.selectedChargeType.toLowerCase()=='prepaid') {
            body2.autoRenew = selectedOrderVmPage.renew;
            body2.autoRenewPeriod = "1";            
        }

        body2.instanceName = selectedOrderVmPage.InstanceName || null;
        
        body2.internetChargeType = selectedOrderVmPage.selectedInternetChargeType  || null;                
        body2.internetMaxBandwidthOut = selectedOrderVmPage.selectedInternetMaxBandwidthOut || null;

        if(selectedOrderVmPage.selectedGeneration == "ecs-1"){
            body2.ioOptimized = "none";
        } else {
            body2.ioOptimized = "optimized";
        }
        
        body2.password = selectedOrderVmPage.Password  || null;
        body2.period = selectedOrderVmPage.selectedQuantity  || null;
        
        body2.securityGroupId = selectedOrderVmPage.SecurityGroupId  || null;
        body2.systemDiskCategory = selectedOrderVmPage.selectedDisk  || null;
        
        body2.systemDiskSize = selectedOrderVmPage.diskCount  || null;
        
        body2.vswitchId = selectedOrderVmPage.selectedVswitchId  || null;
        body2.zoneId = selectedOrderVmPage.selectedArea.ZoneId  || null;

        let body = body2;
        console.log(body, "order vm body!!!!!!!!!!");
        let str = JSON.stringify(body);
        console.log(str);
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.create");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getInstanceList(pageIndex: number, pageSize: number, regionid: string, queryObject: VmQueryObject): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        let body: GetInstancesSubmitModel = new GetInstancesSubmitModel();
        body.accessinfo.accessId = this.keysecret.accessId;
        body.accessinfo.accessSecret = this.keysecret.accessSecret;
        body.pageNumber = pageIndex;
        body.pageSize = pageSize;
        if (queryObject.keyword != "") {
            switch (queryObject.criteria) {
                case "instance_name":
                    body.instanceName = queryObject.keyword;
                    break;
                case "instance_ids":
                    let instanceIds: Array<string> = [];                    
                    instanceIds = queryObject.keyword.replace(/\s+/g, "").split(",");
                    console.log(instanceIds);
                    body.instanceIds = instanceIds;
                    break;
                case "private_ips":
                    let privateIps: Array<string> = [];
                    privateIps = queryObject.keyword.replace(/\s+/g, "").split(",");
                    console.log(privateIps);
                    body.privateIpAddresses = privateIps;
                    break;
                case "inner_ips":
                    let innerIps: Array<string> = [];
                    innerIps = queryObject.keyword.replace(/\s+/g, "").split(",");
                    console.log(innerIps);
                    body.innerIpAddresses = innerIps;
                    break;
                case "public_ips":
                    let publicIps: Array<string> = [];
                    publicIps = queryObject.keyword.replace(/\s+/g, "").split(",");
                    console.log(publicIps);
                    body.publicIpAddresses = publicIps;
                    break;
                case "image_id":
                    body.imageId = queryObject.keyword;
                    break;
                case "securitygroup_id":
                    body.securityGroupId = queryObject.keyword;
                    break;
                /*case "expire":
                    body. = queryObject.keyword;
                    break;
                    */
                case "instance_type":
                    body.instanceType = queryObject.keyword;
                    break;
                case "vpc_id":
                    body.vpcId = queryObject.keyword;
                    break;
                case "vswitch_id":
                    body.vswitchId = queryObject.keyword;
                    break;
                default:
                    console.log("queryObject.keyword don't match any criteria");
            }

        }
        console.log(body, "body");
        let str = JSON.stringify(body);
        console.log(str);
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.list");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    deleteInstance(instance: instanceListModel) : Promise<any> {
        const pathParams = [
            {
                key: "instanceid",
                value: instance.InstanceId
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.delete");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    startInstance(instance: instanceListModel): Promise<any> {
        const pathParams = [
            {
                key: "instanceid",
                value: instance.InstanceId
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.start");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    stopInstance(instance: instanceListModel): Promise<any> {
        const pathParams = [
            {
                key: "instanceid",
                value: instance.InstanceId
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.stop");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }



}