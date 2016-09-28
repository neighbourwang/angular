import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ServiceDetail, Region, Template, Flavor, Zone, Storage } from '../model';
import { RestApiCfg } from '../../../core/service/restapicfg.service';
import { RestApi } from '../../../core/service/restapi.service';

import 'rxjs/add/operator/toPromise';


const apiIp: string = '15.114.100.54';
const apiPort: string = '9105';

@Injectable()
export class DirectoryCreateService {

    useLocalCachedData: boolean = false;
    
    private cachedServiceDetail: ServiceDetail;

    cachedRegions: Region[];
    cachedTemplates: Template[];
    cachedFlavors: Flavor[];
    cachedZones: Zone[];
    cachedStorages: Storage[];

    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    useCached(useFlg: boolean) {
        this.useLocalCachedData = useFlg;
    }

    getServiceDetail(): ServiceDetail {
        if (!this.useLocalCachedData) {
            this.clearAllCachedData();
        }
        this.useLocalCachedData = false;

        return this.getCachedData();
    }

    getCachedServiceDetail(): ServiceDetail {
        return this.getCachedData();
    }

    private getCachedData(): ServiceDetail {
        this.cachedServiceDetail = this.cachedServiceDetail || new ServiceDetail();
        return this.cachedServiceDetail;
    }

    clearAllCachedData() {
        this.cachedServiceDetail = new ServiceDetail();

        this.cachedRegions = undefined;
        this.cachedTemplates = undefined;
        this.cachedFlavors = undefined;
        this.cachedZones = undefined;
        this.cachedStorages = undefined;
    }

    getFlavors(platformId: number): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.flavors.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }
    
    getZones(platformId: number): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.zones.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

    getStorages(platformId: number): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.storages.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

    createServiceDirectory(platformId: string, serviceDetail: ServiceDetail) {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.services.create', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.post(url, pathParams, undefined, serviceDetail);
    }
}
