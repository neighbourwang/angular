import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { RegionModel, keysecretModel, diskOrderModel, diskListModel, GetDisksSubmitModel, DiskQueryObject } from '../model/cloud-disk.model';

@Injectable()
export class AliCloudDiskService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    //keysecret: keysecretModel;
    keysecret: keysecretModel = new keysecretModel();

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

    getDiskList(pageIndex: number, pageSize: number, regionid: string, queryObject: DiskQueryObject): Promise<any> {
        const pathParams = [
            {
                key: "regionid",
                value: regionid
            }
        ];
        let body: GetDisksSubmitModel = new GetDisksSubmitModel();
        body.accessinfo.accessId = this.keysecret.accessId;
        body.accessinfo.accessSecret = this.keysecret.accessSecret;
        body.conditionModel.pageNumber = pageIndex;
        body.conditionModel.pageSize = pageSize;

        if (queryObject.keyword != "") {
            switch (queryObject.criteria) {
                case "disk_name":
                    body.conditionModel.diskName = "*" + queryObject.keyword + "*";
                    break;
                case "disk_ids":
                    let diskIds: Array<string> = [];
                    diskIds = queryObject.keyword.replace(/\s+/g, "").split(",");
                    console.log(diskIds);
                    body.conditionModel.diskIds = diskIds;
                    break;
                case "instance_id":
                    body.conditionModel.instanceId = queryObject.keyword;
                    break;
                case "snapshot_id":
                    body.conditionModel.snapshotId = queryObject.keyword;
                    break;
                default:
                    console.log("queryObject.keyword don't match any criteria");
            }
        }

        console.log(body, "body");
        let str = JSON.stringify(body);
        console.log(str);
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.disklist.get");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    attachDisk(diskItem: diskListModel, instanceId: string, deletewithinstance: boolean): Promise<any> {
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "diskId": diskItem.DiskId,
            "instanceId": instanceId,
            "deleteWithInstance": deletewithinstance
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.disk.attach");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    detachDisk(diskItem: diskListModel): Promise<any> {
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "diskId": diskItem.DiskId,
            "instanceId": diskItem.InstanceId
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.disk.detach");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    deleteDisk(diskItem: diskListModel): Promise<any> {
        const pathParams = [
            {
                key: "diskid",
                value: diskItem.DiskId
            }
        ];
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.diskorder.delete");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    updateDisk(disk: diskListModel): Promise<any> {
        const pathParams = [
            {
                key: "diskid",
                value: disk.DiskId
            }
        ];
        const body = {
            "accessinfo": {
                "accessId": this.keysecret.accessId,
                "accessSecret": this.keysecret.accessSecret
            },
            "deleteAutoSnapshot": null,
            "deleteWithInstance": null,
            "description": null,
            "diskName": disk.DiskName,
            "enableAutoSnapshot": null
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.property.modify");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }

    getAllRegionDisks(): Promise<any> {
        const body = {
            "accessId": this.keysecret.accessId,
            "accessSecret": this.keysecret.accessSecret
        }
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-vm.allregion.disks");/////////////////
        return this.restApi.request(api.method, api.url, null, null, body);
    }

}