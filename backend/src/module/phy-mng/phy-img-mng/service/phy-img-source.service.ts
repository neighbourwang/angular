import {Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

import'rxjs/add/operator/toPromise';

import { SourceListMock, ChangeStatusMock, AlloListMock } from '../model/mock.model';
import { PhyImgSource } from '../model/phy-img-source.model';


@Injectable()
export class PhyImgSourceService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ){   }

    //物理机镜像池状态
    poolStatusDic = this.dict.get({
        owner: "PM_IMAGE_POOL",
        field: "STATUS"
    });
    
    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //获取镜像源列表
    //POST /noauth/pmimage/pool/page/{page}/size/{size}
    getSourceList(page:number, size:number) : Promise<any>{
        const pathParams = [
            {
                key: "page",
                value: page
            },
            {
                key: "size",
                value: size
            }
        ];

        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimgsource.getlist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        
       //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return SourceListMock});
    }
    
    //物理机镜像池状态修改:0:禁用 1:启用 2:删除
    //PUT /noauth/pmimage/pool/{pmImagePoolId}/{status}
    changeStatus(id:string, status:number) : Promise<any>{
        const pathParams = [
            {
                key:"pmImagePoolId",
                value:id
            },
            {
                key:"status",
                value:status
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimgsource.changestatus");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return ChangeStatusMock});
        
    }

    //创建镜像源提交 POST /noauth/pmimage/pool
    commitCreate(tempCreate:PhyImgSource): Promise<any>{

        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimgsource.commit.create");
        return this.restApi.request(api.method, api.url, null, null,
         {
            "description": tempCreate.description,
            "imageName": tempCreate.imageName,
            "imageURL": tempCreate.imageURL
        });
    }
    //编辑镜像源提交 PUT /noauth/pmimage/pool/edit
    commitEdit(tempEdit:PhyImgSource): Promise<any>{
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimgsource.commit.edit");
        return this.restApi.request(api.method, api.url,null, null,
        {
            "description": tempEdit.description,
            "id": tempEdit.id,
            "imageName": tempEdit.imageName,
            "imageURL": tempEdit.imageURL,
            "status": tempEdit.status
        });
    }
    //获取分配列表 根据pmImagePoolId显示资源池的分配信息
    //GET /noauth/pmimage/pool/{pmImagePoolId}/pmpool/list
    getAllo(id:string): Promise<any>{
        const pathParams =[
            {
                key:"pmImagePoolId",
                value:id
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimgsource.getallolist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return AlloListMock});
        
    }
    //分配资源池提交 PUT /noauth/pmimage/pool/{pmImagePoolId}/pmpool/assign
    commitAllo(id:string, idlist:string): Promise<any>{
        const pathParams =[
            {
                key:"pmImagePoolId",
                value:id
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimgsource.commit.allocate");
        return this.restApi.request(api.method, api.url, pathParams, null, idlist);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return ChangeStatusMock});
    }
    //测试物理机镜像池 POST /noauth/pmimage/pool/test
    testPhyImgSource(temp:PhyImgSource): Promise<any>{
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimgsource.commit.test");
        return this.restApi.request(api.method, api.url, null, null,
        {
            "description": temp.description,
            "imageName": temp.imageName,
            "imageURL": temp.imageURL
        });
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return ChangeStatusMock});
    }

    
}