import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { RegionModel, keysecretModel } from '../../cloud-disk/model/cloud-disk.model';
import { orderVmPageModel, QuantityModel, instanceListModel, priceSubmitModel, priceCommodityModel } from "../model/cloud-vm.model";

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
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.image.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getInstanceTypeFamily(regionid: string): Promise<any> {
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
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.type.family.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getInstanceType(regionid: string): Promise<any> {
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.type.get");
        return this.restApi.request(api.method, api.url, null, null, body);
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
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.family.tree.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
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
            "pageNumber": "1",
            "pageSize": "50",
            "vpcId": ""
            }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.vpc.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getVSwitches(vpcid: string) : Promise<any> {
        const pathParams = [
            {
                key: "vpcid",
                value: vpcid
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.network.vswitch.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    calculatePrice(selectedOrderVmPage: orderVmPageModel): Promise<any> {
        let body1 = {
            "orderType": "traffic-bandwidth",
            "regionId": selectedOrderVmPage.RegionId
        };
        let body2: priceSubmitModel = new priceSubmitModel();
        let body;
        body2.orderType = "instance-buy";
        body2.regionId = selectedOrderVmPage.RegionId;
        body2.zoneId = selectedOrderVmPage.selectedArea.ZoneId;

        body2.commodity.instanceType = selectedOrderVmPage.selectedChargeType;

        body2.commodity.amount = 1;
        body2.commodity.maxAmount = 1;

        body2.commodity.autoRenew = selectedOrderVmPage.renew;
        body2.commodity.ioOptimized = selectedOrderVmPage.ioOptimized;        

        body2.commodity.internetChargeType = selectedOrderVmPage.selectedInternetChargeType;
        body2.commodity.internetMaxBandwidthOut = selectedOrderVmPage.selectedInternetMaxBandwidthOut;
        
        body2.commodity.networkType = selectedOrderVmPage.selectedInternetChargeType;

        body2.commodity.period = selectedOrderVmPage.period;
        body2.commodity.periodType = selectedOrderVmPage.periodType;
        body2.commodity.priceUnit = selectedOrderVmPage.priceUnit;

        body2.commodity.systemDisk.category = selectedOrderVmPage.selectedDisk;
        body2.commodity.systemDisk.size = selectedOrderVmPage.diskCount;
        if (selectedOrderVmPage.selectedChargeType == "PostPaid") { //按量计费，多传一个traffic-bandwidth            
            body = [body1, body2];
        } else if (selectedOrderVmPage.selectedChargeType == "PrePaid") { //包年包月，只传一个instance-buy
            body = [body2];
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.price.get");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    createInstanceOrder(orderVmPage: orderVmPageModel): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: orderVmPage.RegionId
            }
        ];
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "instanceType": orderVmPage.selectedInstanceType,
            "imageId": orderVmPage.selectedImage,

            //"autoRenew": "",
            //"autoRenewPeriod": "",
            //"clientToken": "",
            "dataDisk1Category": "",
            "dataDisk1Description": "",
            "dataDisk1Device": "",
            "dataDisk1DiskName": "",
            "dataDisk1Size": "",
            "dataDisk1SnapshotId": "",
            "dataDisk2Category": "",
            "dataDisk2Description": "",
            "dataDisk2Device": "",
            "dataDisk2DiskName": "",
            "dataDisk2Size": "",
            "dataDisk2SnapshotId": "",
            "dataDisk3Category": "",
            "dataDisk3Description": "",
            "dataDisk3Device": "",
            "dataDisk3DiskName": "",
            "dataDisk3Size": "",
            "dataDisk3SnapshotId": "",
            "dataDisk4Category": "",
            "dataDisk4Description": "",
            "dataDisk4Device": "",
            "dataDisk4DiskName": "",
            "dataDisk4Size": "",
            "dataDisk4SnapshotId": "",
            "description": "",
            "hostName": "",
            "instanceChargeType": orderVmPage.selectedChargeType,
            "instanceName": orderVmPage.InstanceName,
            "internetChargeType": orderVmPage.selectedInternetChargeType,
            "internetMaxBandwidthIn": orderVmPage.selectedInternetMaxBandwidthIn,
            "internetMaxBandwidthOut": orderVmPage.selectedInternetMaxBandwidthOut,
            "ioOptimized": "",
            "nodeControllerId": "",
            "password": orderVmPage.Password,
            "period": "",
            "privateIpAddress": "",
            "securityGroupId": "",
            "systemDiskCategory": orderVmPage.selectedDisk,
            "systemDiskDescription": "",
            "systemDiskDiskName": "",
            "systemDiskSize": orderVmPage.diskCount,
            "userData": "",
            "vswitchId": orderVmPage.selectedNetworkId,
            "zoneId": orderVmPage.selectedArea.ZoneId

        }
        console.log(body, "order vm body")
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.create");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getInstanceList(pageIndex: number, pageSize: number, regionid: string): Promise<any> {
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
            "pageNumber": pageIndex,
            "pageSize": pageSize
        }
        console.log(body, "body");
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