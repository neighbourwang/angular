import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Order } from '../model/order';
import { Payload } from '../model/payload';
import { Services } from '../model/service';
import { RestApiCfg } from '../../../../../src/core/service/restapicfg.service';
import { RestApi } from '../../../../../src/core/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getServices(): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('hosts.services.get');
        return this.restApi.get(url, undefined, undefined, undefined);
    }

    saveOrder(payload: Payload): Promise<Payload> {

        let url = this.restApiCfg.getRestApiUrl('hosts.order.add');
        return this.restApi.post(url, undefined, undefined, payload)
                            .then(ret => {
                                return ret;
                            });
    }

}