import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi,SystemDictionaryService } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

//import { port_mock, dclist_mock, port_mock_changed } from '../model/port.mock.model';
//import { port } from '../model/port.model';

@Injectable()
export class VmNSXIndexService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }
}