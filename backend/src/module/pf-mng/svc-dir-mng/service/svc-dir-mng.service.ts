import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Directory, Region } from '../model';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

const apiIp: string = '15.114.100.54';
const apiPort: string = '9105';

@Injectable()
export class DirectoryService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }
    
    getRegions(): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.regions.get', apiIp, apiPort);


        let queryParams = [
            {
                key: 'status',
                value: 1
            }
        ];

        return this.restApi.request(api.method, api.url, undefined, queryParams, undefined);
    }

    getTemplates(): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.servicetemplates.get', apiIp, apiPort);


        let queryParams = [
            {
                key: 'status',
                value: 1
            }
        ];

        return this.restApi.request(api.method, api.url, undefined, queryParams, undefined);
    }

    getDirectories(platformId: string, status: string,  page: number, size: number): Promise<any> {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.services.get', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        let queryParams = [
            // {
            //     key: 'status',
            //     value: status
            // },
            {
                key: 'page',
                value: page
            },
            {
                key: 'size',
                value: size
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, queryParams, undefined);
    }

    publish(platformId: string, id: string, status: string) {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.services.publish', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            },
            {
                key: 'id',
                value: id
            },
            {
                key: 'status',
                value: status
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    modify(platformId: string, directory: any) {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.services.update', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            },
            {
                key: 'id',
                value: directory.id
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, directory);
    }

    removeAll(platformId: string, ids: string[]) {
        let api = this.restApiCfg.getRestApi('pf-mng.svc-dir-mng.services.removeAll', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.request(api.method, api.url, pathParams, undefined, ids);
    }

}