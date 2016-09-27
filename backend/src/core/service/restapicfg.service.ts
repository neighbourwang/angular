import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestApiModel } from '../model/rest';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestApiCfg {
    protected baseIp = '15.114.100.58';
    protected basePort = '9000';
    protected restApiList: RestApiModel[];

    constructor(private http: Http) {
        this.loadCfgData();
    }

    loadCfgData(): Promise<any> {
        return this.http.get('core/config/restapi.json')
                         .toPromise()
                         .then(res => 
                         {
                             this.restApiList = res.json()
                         })
                         .catch(this.handleError);
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

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}