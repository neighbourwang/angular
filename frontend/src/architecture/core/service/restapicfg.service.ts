import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestApiModel } from '../model/rest';
import { RestApis } from '../config/restapi';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestApiCfg {
    protected baseIp = environment.baseIp;
    // protected basePort = '31072';//测试
    protected basePort = environment.basePort;//开发
    protected restApiList: RestApiModel[];

    constructor(private http: Http) {
        this.loadCfgData();
    }

    loadCfgData() {
        this.restApiList = RestApis;
    }

    getRestApiUrl(apiId: string, ip?: string, port?: string): string {
        let url = '';
        port = port || this.basePort;
        ip = ip || this.baseIp;
        for (let restItem of this.restApiList) {
            if (restItem.id.toLowerCase() === apiId.toLowerCase()) {
                url = `http://${ip}:${port}/${restItem.url}`;
                break;
            }
        }
        return url;
    }

    getRestApi(apiId: string, ip?: string, port?: string): RestApiModel {
        let restApi:RestApiModel = new RestApiModel();
        port = port || this.basePort;
        ip = ip || this.baseIp;
        for (let restItem of this.restApiList) {
            if (restItem.id.toLowerCase() === apiId.toLowerCase()) {
                restApi.url = `http://${ip}:${port}/${restItem.url}`;
                restApi.method = restItem.method;
                restApi.desc = restItem.desc;
                restApi.id = restItem.id;
                break;
            }
        }
        return restApi;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
