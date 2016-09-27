import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Directory } from '../model/directory';
import { RestApiCfg } from '../../../../core/service/restapicfg.service';
import { RestApi } from '../../../../core/service/restapi.service';

import 'rxjs/add/operator/toPromise';

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

    getDirectories(page: number, size: number): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('svc_dir-mng.directory.get');

        let pathParams = [
            {
                key: 'page',
                value: page
            }, 
            {
                key: 'size',
                value: size
            }
        ];

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

}