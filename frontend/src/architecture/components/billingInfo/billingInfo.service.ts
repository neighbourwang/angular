
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class BillingInfoService {
    constructor(private http:Http) {
    }

}