import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { adminList } from '../model/enterprise-mock.model';



import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntAdminMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init():void {
         this.restApiCfg.loadCfgData();
    }


     getAdmins(): Promise<any> {
         //let url = this.restApiCfg.getRestApiUrl('ent-mng.admin.cre.enterprise.get');

         //return this.restApi.get(url, null, undefined, undefined);


         return new Promise(resovle => setTimeout(resovle, 2000.)).then(() => adminList);
    }

     getEnterpriseAdmins(enterpriseId:string): Promise<any> {
         return new Promise(resovle => setTimeout(resovle, 2000.)).then(() => adminList);
     }

     updateAdminStatus(id: string[],status:number): Promise<any> {
         return new Promise(resovle => setTimeout(resovle, 2000.)).then(() => adminList);
     }

     deleteAdmin(ids: string[]): Promise<any> {
         return new Promise(resovle => setTimeout(resovle, 2000.)).then(() => adminList);
     }
}