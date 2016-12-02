import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { QuiryDistList } from '../model/dist-list.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubTableListService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }
  
    getBackupList(quiry:QuiryDistList) : Promise<any>{
        const api = this.restApiCfg.getRestApi("disk.backup.search");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry);
    }
    getUnmountList(quiry:QuiryDistList) : Promise<any>{
        const api = this.restApiCfg.getRestApi("disk.unmount.search");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry);
    }
    getVmList(quiry:QuiryDistList) : Promise<any>{
        const api = this.restApiCfg.getRestApi("disk.vm.search");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry);
    }

    //数据字典所用到的值
    
    diskQueryField = this.dict.get({    //云硬盘检索的字段列表，取数据字典的code返回
        owner : "GLOBAL_QUERY",
        field : "DISK_INSTANCE"
    })
    vmQueryField = this.dict.get({    //云硬盘检索的字段列表，取数据字典的code返回
        owner : "GLOBAL_QUERY",
        field : "COMPUTE_INSTANCE"
    })

}