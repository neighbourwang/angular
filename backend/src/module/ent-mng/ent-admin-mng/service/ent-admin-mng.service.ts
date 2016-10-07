import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { adminList } from '../model/enterprise-mock.model';

import { Admin } from '../model/admin.model';

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


     getAdmins(pageIndex:number,pageSize:number): Promise<any> {
         let pathParams = [
             {
                 key: 'page',
                 value: pageIndex
             },
             {
                 key: 'size',
                 value: pageSize
             }
         ];

         //let url = this.restApiCfg.getRestApiUrl('ent-mng.admin.all.get');

         //return this.restApi.get(url, pathParams, undefined, undefined);


         return new Promise(resovle => setTimeout(resovle, 2000.)).then(() => adminList);
    }

     getEnterpriseAdmins(enterpriseId: string, pageIndex: number, pageSize: number): Promise<any> {
         let pathParams = [
             {
                 key: 'enterpriseId',
                 value: enterpriseId
             },
             {
                 key: 'page',
                 value: pageIndex
             },
             {
                 key: 'size',
                 value: pageSize
             }
         ];

         //let url = this.restApiCfg.getRestApiUrl('ent-mng.admin.all.get');

         //return this.restApi.get(url, pathParams, undefined, undefined);
         return new Promise(resovle => setTimeout(resovle, 2000.)).then(() => adminList);
     }

     updateAdminStatus(admins: Admin[], status: number): Promise<any> {

         let pathParams = [
             {
                 key: 'status',
                 value: status
             }
         ];

         //let url = this.restApiCfg.getRestApiUrl('ent-mng.admin.updateStatus.put');

         //return this.restApi.get(url, pathParams, undefined, admins);

         return new Promise(resovle => setTimeout(resovle, 2000.)).then(() => adminList);
     }

     deleteAdmin(admins: Admin[]): Promise<any> {

          //let url = this.restApiCfg.getRestApiUrl('ent-mng.admin.del.delete');

         //return this.restApi.get(url, null, undefined, admins);

         return new Promise(resovle => setTimeout(resovle, 2000.)).then(() => adminList);
     }
}