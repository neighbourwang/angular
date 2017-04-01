import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { RegionModel, keysecretModel } from '../../cloud-disk/model/cloud-disk.model';
import { orderVmPageModel, QuantityModel, instanceListModel } from "../model/cloud-vm.model";

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
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
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

/*
    calculatePrice(selectedRegion: RegionModel): Promise<any> {
        const body = [
            {
                "orderType": "disk-buy",
                "regionId": selectedRegion.RegionId,
                "commodity": {
                    "zoneId": selectedRegion.selectedArea.ZoneId,
                    "dataDisk": {
                        "category": selectedRegion.selectedDisk,
                        "size": selectedRegion.diskCount,
                        "snapshotId": null
                    },
                    "amount": selectedRegion.count
                }
            }
        ]
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.price.get");
        return this.restApi.request(api.method, api.url, null, null, body);
    }
    */

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
            "instanceType": "ecs.n1.tiny",
            "imageId": orderVmPage.selectedImage,
            /*
  "autoRenew": "string",
  "autoRenewPeriod": "string",
  "clientToken": "string",
  "dataDisk1Category": "string",
  "dataDisk1Description": "string",
  "dataDisk1Device": "string",
  "dataDisk1DiskName": "string",
  "dataDisk1Size": "string",
  "dataDisk1SnapshotId": "string",
  "dataDisk2Category": "string",
  "dataDisk2Description": "string",
  "dataDisk2Device": "string",
  "dataDisk2DiskName": "string",
  "dataDisk2Size": "string",
  "dataDisk2SnapshotId": "string",
  "dataDisk3Category": "string",
  "dataDisk3Description": "string",
  "dataDisk3Device": "string",
  "dataDisk3DiskName": "string",
  "dataDisk3Size": "string",
  "dataDisk3SnapshotId": "string",
  "dataDisk4Category": "string",
  "dataDisk4Description": "string",
  "dataDisk4Device": "string",
  "dataDisk4DiskName": "string",
  "dataDisk4Size": "string",
  "dataDisk4SnapshotId": "string",
  "description": "string",
  "hostName": "string",
  "imageId": "string",
  "instanceChargeType": "string",
  "instanceName": "string",
  "instanceType": "string",
  "internetChargeType": "string",
  "internetMaxBandwidthIn": "string",
  "internetMaxBandwidthOut": "string",
  "ioOptimized": "string",
  "nodeControllerId": "string",
  "password": "string",
  "period": "string",
  "privateIpAddress": "string",
  "securityGroupId": "string",
  "systemDiskCategory": "string",
  "systemDiskDescription": "string",
  "systemDiskDiskName": "string",
  "systemDiskSize": "string",
  "userData": "string",
  "vswitchId": "string",
  "zoneId": "string"
            */
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