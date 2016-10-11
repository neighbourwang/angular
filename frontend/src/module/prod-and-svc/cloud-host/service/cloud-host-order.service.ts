import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Order } from '../model/order';
import { Payload } from '../model/payload';
import { Services } from '../model/service';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getServices(): Promise<any> {
        let api = this.restApiCfg.getRestApi('hosts.services.get');
        return this.restApi.request(api.method, api.url, undefined, undefined, undefined);
    }

    saveOrder(payload: Payload): Promise<Payload> {

        let api = this.restApiCfg.getRestApi('hosts.order.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload)
                            .then(ret => {
                                return ret;
                            });
    }

}