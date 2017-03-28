import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { RegionModel, keysecretModel, diskOrderModel } from '../model/cloud-disk.model';

@Injectable()
export class AliCloudDiskService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    keysecret: keysecretModel;

    getKeySecret(): Promise<any> {
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.key-secret.get");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    getAllRegions(): Promise<any> {
        /*
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            },
            {
                key: "status",
                value: status
            }
        ];
        */
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body")
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.regions.get");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    getArea(id: string): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: id
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.regionZone.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

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

    createDiskOrder(regionid:string, zoneid:string, diskorder: diskOrderModel ): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            },
            {
                key: "zoneid",
                value: zoneid
            }
        ];
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "diskModel": {
                "clientToken": diskorder.clientToken,
                "description": diskorder.description,
                "diskCategory": diskorder.diskCategory,
                "diskName": diskorder.diskName,
                "size": diskorder.size,
                "snapshotId": diskorder.snapshotId
            }
        }
        console.log(body, "body")
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.diskorder.post");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getDiskList(pageIndex: number, pageSize: number, regionid: string): Promise<any> {
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            },
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
            "conditionModel": {
            }
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.disklist.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

}