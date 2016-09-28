import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Directory, Region } from '../model';
import { RestApiCfg } from '../../../core/service/restapicfg.service';
import { RestApi } from '../../../core/service/restapi.service';

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

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getRegions(): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.regions.get', apiIp, apiPort);


        let queryParams = [
            {
                key: 'status',
                value: 1
            }
        ];

        return this.restApi.get(url, undefined, queryParams, undefined);
    }

    getTemplates(): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.servicetemplates.get', apiIp, apiPort);


        let queryParams = [
            {
                key: 'status',
                value: 1
            }
        ];

        return this.restApi.get(url, undefined, queryParams, undefined);
    }

    getDirectories(platformId: number, status: string,  page: number, size: number): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.services.get', apiIp, apiPort);

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

        return this.restApi.get(url, pathParams, queryParams, undefined);
    }

    publish(platformId: number, id: number, status: string) {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.services.publish', apiIp, apiPort);

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

        return this.restApi.put(url, pathParams, undefined, undefined);
    }

    modify(platformId: number, directory: any) {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.services.update', apiIp, apiPort);

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

        return this.restApi.put(url, pathParams, undefined, directory);
    }

    removeAll(platformId: number, ids: number[]) {
        let url = this.restApiCfg.getRestApiUrl('pf-mng.svc-dir-mng.services.removeAll', apiIp, apiPort);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        return this.restApi.delete(url, pathParams, undefined, ids);
    }

}