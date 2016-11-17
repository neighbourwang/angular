import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model 
import { IpMngModel } from '../model/ip-mng.model';
import { IpMngQuery } from '../model/ipquery.model';
import { IpMngModel_mock } from '../model/ip-mng.mock';
import { Success_mock } from '../model/success.mock';
import { NetWork_mock } from '../model/dccluster.mock';
import { subnetModel } from '../model/subnet.model';
import { subnetIpModel } from '../model/subnet-ip.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getDcCluster(): Promise <any> {
        //API CALL /adminboe/authsec/vmware/network/getlist
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return NetWork_mock });
    }

    getIpMngList(): Promise <any> {
        //API CALL
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpMngModel_mock });
    }

	updateSubnetIPs(ippool: subnetIpModel): Promise <any> {
		//API CALL
		return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });
	}

	updateSubnet(subn: subnetModel): Promise <any> {
		//API CALL
		return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });
	}

	//获取设置子网的弹出框
	loadSetupSubnetBox(
        errorHandler:Function,
        successHandler:()=>void,
		caller: any,
		ipmngid:string)
	{
		console.log('loadSetupSubnetBox');

/*
		this.loadItems(errorHandler
			, caller
			, this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.simple.get")
			, [{
				key:"_enterpriseId"
				,value:entId
			}]
			, "设置IP子网"
			, successHandler);
*/
		
	}

}
