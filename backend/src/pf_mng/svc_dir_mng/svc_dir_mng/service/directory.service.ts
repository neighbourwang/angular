import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Directory } from '../model/directory';
import { Region } from '../model/region';
import { RestApiCfg } from '../../../../core/service/restapicfg.service';
import { RestApi } from '../../../../core/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DirectoryService {
    API_IP: string = '15.114.100.54';
    API_PORT: string = '9105';
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getRegions(): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf_mng.svc_dir_mng.regions.get', this.API_IP, this.API_PORT);


        let queryParams = [
            {
                key: 'status',
                value: 1
            }
        ];

        return this.restApi.get(url, undefined, undefined, undefined);
    }

    getDirectories(platformId: number, status: string,  page: number, size: number): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('pf_mng.svc_dir_mng.svc_dir_mng.services.get', this.API_IP, this.API_PORT);

        let pathParams = [
            {
                key: 'platformid',
                value: platformId
            }
        ];

        let queryParams = [
            {
                key: 'status',
                value: status
            },
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

    getPublish(platformId: number, id: number, status: string) {
        let url = this.restApiCfg.getRestApiUrl('pf_mng.svc_dir_mng.services.publish', this.API_IP, this.API_PORT);

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

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

}