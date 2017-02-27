import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import'rxjs/add/operator/toPromise';

import { PhyImgListMock, ChangeStatusMock} from'../model/mock.model';
import { PhyImg } from'../model/phy-img.model';
@Injectable()
export class PhyImgListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ){   }


    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //POST /noauth/pmimage/image/{pmImagePoolId}/page/{page}/size/{size}
    //分页获取物理机镜像列表
    getPhyImgList(id:string, page:number, size:number):Promise<any>{
        const pathParams = [
            {
                key: "page",
                value: page
            },
            {
                key: "size",
                value: size
            },
            {
                key:"pmImagePoolId",
                value: id
            }
        ];

        // const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.getlist");
        // return this.restApi.request(api.method, api.url, pathParams, null, null);
        
        return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return PhyImgListMock});
    }
    //PUT /noauth/pmimage/image/changestatus/{pmImageId}/{status} 
    //物理机镜像状态修改:0:禁用 1:启用 2:删除
    changeStatus(id:string, status:number) : Promise<any>{
        const pathParms = [
            {
                key:"pmImagePoolId",
                value:id
            },
            {
                key:"status",
                value:status
            }
        ]
        // const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.changestatus");
        // return this.restApi.request(api.method, api.url, pathParams, null, null);
        
        return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return ChangeStatusMock});
        
    }

    private savedPhyImgList:Array<PhyImg>;

    refreshList(ImgList: Array<PhyImg>){
        this.savedPhyImgList = ImgList;
    }
    getOneFromList(id: string):PhyImg{
        let r ;
        this.savedPhyImgList.forEach(
            (e)=>{
                if(e.id == id){
                    r = e;
                }
            }
        )
        return r;
    }
}
