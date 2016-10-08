import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ServiceDetail, Region, Template, Flavor, Zone, Storage } from '../model';
import { RestApiCfg, RestApi } from '../../../../architecture';

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
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.flavors.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }
    
    getZones(platformId: string): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.zones.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    getStorages(platformId: string): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.storages.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    createServiceDirectory(platformId: string, serviceDetail: ServiceDetail) {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.services.create', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, serviceDetail);
    }
}
