import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService  } from '../../../../architecture';

import'rxjs/add/operator/toPromise';

import { PhyImgListMock, ChangeStatusMock} from'../model/mock.model';
import { PhyImg } from'../model/phy-img.model';
@Injectable()
export class PhyImgListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ){   }

    //镜像类型
    typeDic = this.dict.get({
        owner: "PM_IMAGE",
        field: "IMAGE_TYPE"
    });//  IMAGES TYPE
    //系统位数
    bits_typeDic = this.dict.get({
        owner: "IMAGES",
        field: "BITS_TYPE"
    });
    //操作系统
    osDic = this.dict.get({
        owner: "IMAGES",
        field: "OS"
    });

    //-- 物理机镜像状态
    imgStatusDic = this.dict.get({
        owner: "PM_IMAGE",
        field: "STATUS"
    });
    //-- 物理机镜像同步状态
    imgSyncStatusDic = this.dict.get({
        owner: "PM_IMAGE_SYNC",
        field: "STATUS"
    });
    
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

        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.getlist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return PhyImgListMock});
    }
    //PUT /noauth/pmimage/image/changestatus/{pmImageId}/{status} 
    //物理机镜像状态修改:0:禁用 1:启用 2:删除
    changeStatus(id:string, status:number) : Promise<any>{
        const pathParams = [
            {
                key:"pmImageId",
                value:id
            },
            {
                key:"status",
                value:status
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.changestatus");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return ChangeStatusMock});
        
    }

    private savedPhyImgList:Array<PhyImg>;

    refreshList(ImgList: Array<PhyImg>){
        this.savedPhyImgList = null;
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

// PUT pmimagemgmt/noauth/pmimage/image/edit 提交编辑物理机镜像
    commitEdit(img:PhyImg): Promise<any>{
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.commit.edit");
        return this.restApi.request(api.method, api.url, null, null, img);
    }
// GET pmimagemgmt/noauth/pmimage/image/view/{pmImageId} 根据pmImageId获取镜像信息
    imgDetail(id:string): Promise<any>{
        const pathParams = [
            {
                key:"pmImageId",
                value:id
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.imgdetail");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }
// PUT pmimagemgmt/noauth/pmimage/image/{pmImageId}/enterprise 保存镜像的企业选择信息
//根据pmImageId保存镜像的企业选择信息--逗号分割
    commitAllo(id:string, idlist:string): Promise<any>{
        const pathParams =[
            {
                key:"pmImageId",
                value:id
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.commit.allocate");
        return this.restApi.request(api.method, api.url, pathParams, null, idlist);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return ChangeStatusMock});
    }
// GET /authsec/pmimage/image/{pmImageId}/enterprise/show 获取镜像的企业选择信息
//根据pmImageId显示镜像提供企业选择信息
    getAllo(id:string): Promise<any>{
        const pathParams =[
            {
                key:"pmImageId",
                value:id
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.getallolist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(()=> {return AlloListMock});
        
    }
    

// GET /noauth/pmimage/image/{pmImagePoolId}/list 
//根据pmImagePoolId显示镜像信息列表--同步功能
    getSyncInfo(id:string):Promise<any>{
        const pathParams =[
            {
                key:"pmImagePoolId",
                value:id
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.sync.getinfo");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        
    }
// POST /noauth/pmimage/image/{pmImagePoolId}/savesync 同步保存物理机镜像信息
    saveSyncInfo(id:string, imgList:Array<PhyImg>):Promise<any>{
        const pathParams =[
            {
                key:"pmImagePoolId",
                value:id
            }
        ]
        const api = this.restApiCfg.getRestApi("phy-mng.phy-img-mng.phyimglist.sync.saveinfo");
        return this.restApi.request(api.method, api.url, pathParams, null, imgList);
        
    }

}
