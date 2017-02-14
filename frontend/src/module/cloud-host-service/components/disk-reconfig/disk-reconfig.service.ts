import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

@Injectable()
export class DiskReconfigService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }


}