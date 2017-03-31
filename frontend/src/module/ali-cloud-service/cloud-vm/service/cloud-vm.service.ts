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

    getVPCs() : Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: ""   //////////////?????????????
            }
        ];
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "isDefault": "",
            "pageNumber": "",
            "pageSize": "",
            "vpcId": ""
            }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.instance.vpc.get");
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
            "imageId": "ubuntu_14_0405_64_40G_base_20170222.vhd",// orderVmPage.imageId
        }
        console.log(body, "body")
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



}