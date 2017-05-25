/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import {
    LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, SystemDictionaryService,
    dictPipe
} from '../../../../architecture';
//service
import { ProdDirListService } from '../service/prod-dir-list.service';
import { ProdSeriesService } from '../service/prod.series.service';
import { PlatformsActiveService } from '../service/platform.service';
import { ProdDirPublishService } from '../service/prod-dir-publish.service';
import { CcProdDirPublishService } from '../service/prod-dir-ccPublish.service';
import { ProdDirDeleteService } from '../service/prod-dir-delete.service';

//model
import { Proddir, ProdDirSpec } from '../model/prodDirList.model';
import { specification } from '../model/prodDir.model';
// import {ProdDirModule} from '../prod-dir-mng.routing'
@Component({
    selector: 'prod-dir-list',
    templateUrl: '../template/prod-dir-list.component.html',
    styles: [
        `.btn-active{
            background-color: #00a982;
            color : #fff
        }`
    ],
    providers: []
})
export class ProdDirListComponent implements OnInit {

    constructor(
        private layoutService: LayoutService,
        private service: ProdDirListService,
        private ProdSeriesService: ProdSeriesService,
        private PlatformsActiveService: PlatformsActiveService,
        private ProdDirPublishService: ProdDirPublishService,
        private CcProdDirPublishService: CcProdDirPublishService,
        private ProdDirDeleteService: ProdDirDeleteService,
        private dictPipe: dictPipe,
        private router: Router,
        private dict: SystemDictionaryService

    ) { }

    // 产品目录数组
    prodDirList: Array<Proddir> = new Array<Proddir>();

    // 产品目录总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;

    prodDirTypeList = new Array();
    vmProdDirSpecList = new Array<ProdDirSpec>();
    prodDirSpec: ProdDirSpec = new ProdDirSpec();
    platformsList = new Array();
    platformId: string = '';
    prodDirTypeCode: string;;
    queryProDirTypeId: string = '';
    ngOnInit() {
        console.log(this.service.serverTypeDic);
        //获得激活云平台数据
        this.PlatformsActiveService.getPlatformsActive().then(response => {
            console.log('激活云平台数据', response);
            // if (response && 100 == response.resultCode) {
            this.platformsList = response.resultContent;
            // } else {

            // }
        }).catch(err => {
            console.error(err);
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.ERROR_GETTING_PLATFORM_LIST')
        })
        //获取产品目录类别
        this.ProdSeriesService.getProdSeries().then(response => {
            if (response && 100 == response.resultCode) {
                this.prodDirTypeList = response.resultContent;
                this.prodDirTypeList.forEach(ele => {
                    ele.isSelected = false;
                })
                this.prodDirTypeCode = this.prodDirTypeList[0].code;
                this.prodDirTypeList[0].isSelected = true;
                console.log('Servicetypelist', this.prodDirTypeList);
            }
        }).catch(err => {
            console.error(err);
        })
        this.backend({
            "categoryId": '',
            "page": 1,
            "platformId": '',
            "size": this.pp,
        });
        console.log(this.service.dictServiceObjList);
    }
    data: any = {
        "categoryId": "",
        "page": 1,
        "platformId": "",
        "size": 10,
    };
    onQuery() {
        // console.log(this.platformId);
        // console.log(this.queryProDirTypeId);
        this.queryProDirTypeId =
            this.queryProDirTypeId ? this.queryProDirTypeId : '';
        this.platformId =
            this.platformId ? this.platformId : '';
        this.data = {
            "categoryId": this.queryProDirTypeId,
            "platformId": this.platformId,
            page: 1,
            size: this.pp
        }
        this.backend(this.data);
    }
    @ViewChild('publishConfirm')
    publishConfirm: ConfirmComponent;

    @ViewChild('ccPublishConfirm')
    ccPublishConfirm: ConfirmComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('createProdDir')
    createProdDir: PopupComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

    //初始化


    // 选择产品目录（多选）
    switchSelectIndividual(id: number) {
        this.prodDirList[id].isSelected =
            this.prodDirList[id].isSelected == true ? true : false;
    }
    //全选
    isSelectedAll: boolean = false;
    switchSelectAll() {
        this.isSelectedAll = !this.isSelectedAll;
        for (let dir of this.prodDirList) {
            dir.isSelected = this.isSelectedAll;
        }
    }

    // 获得当前选中的产品目录
    getProddir() {
        //radiio
        // let proddir : Proddir ;
        // for(let i = 0 ; i < this.prodDirList.length ; i ++){
        //     if(this.prodDirList[i].isSelected == true){
        //         proddir = this.prodDirList[i];
        //     }
        // }
        // return proddir;
        //checkbox
        let selectedProdDirList: Array<Proddir> = new Array<Proddir>();
        for (let dir of this.prodDirList) {
            if (dir.isSelected == true) {
                selectedProdDirList.push(dir);
            }
        }
        return selectedProdDirList;
    }

    //命令按钮
    action(order) {
        let prodDirList: Array<Proddir> = this.getProddir();
        if (prodDirList.length < 1) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.SELECT_PRODUCT_CAT'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.SELECT_PRODUCT_CAT=>请选择产品目录 
        } else {
            let message: string = '';
            for (let dir of prodDirList) {
                message += dir.serviceName + ",";
            }
            console.log(message);
            message = message.substring(0, message.length - 1);
            switch (order) {
                case 'delete':
                    if (prodDirList[0].status == '1') {
                        this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.NOT_ALLOW_TO_DELETE_PUBLISHED_PRODUCT_CAT') //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.NOT_ALLOW_TO_DELETE_PUBLISHED_PRODUCT_CAT=>不能删除状态为已发布的产品目录 
                    } else if(prodDirList[0].productNum>0){
                        this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.NOT_ALLOW_TO_DELETE_PRODUCT_CAT_WITH_PRODUCT') //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.NOT_ALLOW_TO_DELETE_PUBLISHED_PRODUCT_CAT=>不能删除状态为已发布的产品目录                         
                    }else{
                        console.log(prodDirList);
                        //PROD_MNG.DELETE_SELECTED_PRODUCT=>您选择删除{{value_1}}产品,请确认；如果确认，此产品目录的数据将不能恢复。
                        this.deleteConfirm.open('PROD_MNG.REMOVE_PRODUCT_CAT', 'PROD_MNG.DELETE_SELECTED_PRODUCT^^^' + message);
                    }
                    break;
                case 'publish':
                    if (prodDirList[0].status == '1') {
                        this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.PRODUCT_CAT_HAS_BEEN_PUBLISHED') //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.PRODUCT_CAT_HAS_BEEN_PUBLISHED=>产品目录状态为已发布 
                    } else {
                        this.publishConfirm.open('PROD_MNG.PUBLISH_PRODUCT_CAT', 'PROD_MNG.PUBLISH_SELECTED_PRODUCT^^^' + message) //PROD_MNG.PUBLISH_SELECTED_PRODUCT=>您选择发布{{value1}}产品,请确认。
                    }
                    break;
                case 'ccPublish':
                    if (prodDirList[0].status == '3') {
                        this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.PRODUCT_CAT_IS_CANCELLED') //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.PRODUCT_CAT_IS_CANCELLED=>产品目录状态为取消发布 

                    } else {
                        this.ccPublishConfirm.open('PROD_MNG.CANCEL_PUBLISH_PRODUCT_CAT', 'PROD_MNG.CANCEL_SELECTED_PRODUCT^^^' + message) //PROD_MNG.CANCEL_PUBLISH_PRODUCT_CAT=>取消发布产品目录 
                    }
                    break;
            }
        }
    };
    deleteCof() {
        let selectedList: Array<Proddir> = this.getProddir();
        console.log(selectedList[0]['serviceId']);
        let id = selectedList[0]['serviceId'];
        this.ProdDirDeleteService.deleteProdDir(id).then(response => {
            console.log(response);
            this.backend(this.data);
        }).catch(err => {
            console.error(err);
        })
    }
    //发布按钮
    publishCof() {
        let selectedList: Array<Proddir> = this.getProddir();
        console.log(selectedList[0]);
        let id = selectedList[0]['serviceId'];
        this.ProdDirPublishService.publishProdDir(id).then(response => {
            console.log(response);
            this.backend(this.data);
        }).catch(err => {
            console.error(err);
        })
    }

    ccPublishCof() {
        let selectedList: Array<Proddir> = this.getProddir();
        console.log(selectedList[0]['serviceId']);
        let id = selectedList[0]['serviceId'];
        this.CcProdDirPublishService.ccPublishProdDir(id).then(response => {
            console.log(response);
            this.backend(this.data);
        }).catch(err => {
            console.error(err);
        })
    }

    //编辑按钮
    edit() {
        console.log('edit');
        // this.router.navigateByUrl("prod-mng/prod-dir-mng/prod-dir-cre", { skipLocationChange: true });
    }
    //创建按钮
    creation() {
        //跳转
        console.log(this.vmProdDirSpecList);
        // if (this.vmProdDirSpecList.length==0) {
            this.layoutService.show();
            this.service.getProdDirSpecList().then(res => {
                console.log(res);
                this.vmProdDirSpecList = res.resultContent;
                this.prodDirSpec = this.vmProdDirSpecList[0];
                this.createProdDir.open('PROD_MNG.CREATE_PRODUCT_CAT'); //PROD_MNG.CREATE_PRODUCT_CAT=>创建产品目录
                this.layoutService.hide();
            }).catch(err => {
                console.error(err);
                this.createProdDir.open('PROD_MNG.CREATE_PRODUCT_CAT'); //PROD_MNG.CREATE_PRODUCT_CAT=>创建产品目录                
                this.layoutService.hide();
            })
        // } else {
        //     this.createProdDir.open('PROD_MNG.CREATE_PRODUCT_CAT'); //PROD_MNG.CREATE_PRODUCT_CAT=>创建产品目录
        // }
    }
    //选择云主机产品目录规格
    prodDirSpecIdx: number = 0;
    selectProDirSpec(e) {
        this.prodDirSpec = this.vmProdDirSpecList[e];
        console.log(e);
    }

    servObjCode: string = 'MAINFRAME';//服务对象code值;
    serverTypeCode:string='PrivateCloud';//服务器类型code
    otcreate() {
        if (this.prodDirTypeCode == 'VITRUALMACHINE_SERVICE') {
            if (this.prodDirSpec.cpu) {
                this.prodDirSpec.bootStorageSize =
                    this.prodDirSpec.bootStorageSize ? this.prodDirSpec.bootStorageSize : '0';
                this.router.navigate(["prod-mng/prod-dir-mng/prod-dir-cre", { vcpu: this.prodDirSpec.cpu, mem: this.prodDirSpec.mem, startupDisk: this.prodDirSpec.bootStorageSize, type: 'new' }]);
            } else {
                this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.PLATFORM_PRODUCT_CAT_ERROR') //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.PLATFORM_PRODUCT_CAT_ERROR=>云主机产品目录规格输入错误 
            }
        } else if (this.prodDirTypeCode == 'VITRUALDISK_SERVICE') {
            //云硬盘
            this.router.navigate(["prod-mng/prod-dir-mng/prod-dirDisk-cre", { type: 'new' }]);
        } else if (this.prodDirTypeCode == 'PHYMACHINE_SERVICE') {
            //物理机
            this.router.navigate(["prod-mng/physical-prod-mng/prod-dirPhsical-cre", { type: 'new' }]);
        } else if (this.prodDirTypeCode == 'SUPERVISE_SERVICE') {
            //管理服务
            this.service.dictServiceObjList.then(arrs => {
                if (!$.isArray(arrs)) return "";  //如果不是arr返回空
                    // console.log(arrs);                
                arrs = arrs.filter(arr => arr.code == this.servObjCode); //过滤字典
                if (arrs.length) {   //是否取到了值
                    // console.log(arrs[0]);
                    this.router.navigate(["prod-mng/manager-serve/manager-serve-service-cre", { type: 'new' ,code:arrs[0].value,objName:arrs[0].displayValue}]);                   
                }
                return "";
            });
        }else if(this.prodDirTypeCode=='Database'||this.prodDirTypeCode=='MiddleWare'){
            //中间件
            console.log(this.serverTypeCode);
            console.log(this.service.serverTypeDic);
            this.router.navigate(['prod-mng/database-middleware-mng/database-middleware-service-cre',{type:this.prodDirTypeCode,code:this.serverTypeCode}])
        }
    }
    //去编辑详情
    goDetail(item) {
        console.log(item);
        if (item.serviceType == "0") {
            this.router.navigate(["prod-mng/prod-dir-mng/prod-dir-cre", { id: item.serviceId, type: 'edit' }]);
        } else if (item.serviceType == "1") {
            this.router.navigate(["prod-mng/prod-dir-mng/prod-dirDisk-cre", { id: item.serviceId, type: 'edit' }]);
        }else if(item.serviceType=='4'){
            this.router.navigate(["prod-mng/physical-prod-mng/prod-dirPhsical-cre", { id: item.serviceId, type: 'edit' }]);            
        }else if(item.serviceType=='5'||item.serviceType=='3'){
            this.router.navigate(["prod-mng/database-middleware-mng/database-middleware-service-cre", { id: item.serviceId, type: item.serviceType }]);            
        }
    }
    //获取列表数据
    backend(data) {
        this.layoutService.show();
        this.tp = 0;
        this.service.getProdDirList(data).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;
                    if (resultContent.length == 0) {
                        this.notice.open('提示', '未找到相关产品目录信息');
                    }
                    let backend = new Array<Proddir>();
                    for (let content of resultContent) {
                        let proddir = new Proddir();
                        proddir.serviceId = content.serviceId;
                        proddir.serviceName = content.serviceName;
                        proddir.serviceType = content.serviceType;
                        proddir.productNum = content.productNum;
                        proddir.serviceTemplateName = content.serviceTemplateName;
                        proddir.createrName = content.createrName;
                        proddir.creatorId = content.creatorId;
                        proddir.description = content.description;
                        proddir.specification = content.specification;
                        proddir.status = content.status;
                        proddir.isSelected = false;
                        backend.push(proddir);
                    }
                    let pageInfo = response.pageInfo;

                    this.tp = pageInfo.totalPage;

                    this.prodDirList = backend;

                } else {

                }
                this.layoutService.hide();
            }
        ).catch(
            err => {
                console.error('err');
                this.layoutService.hide();
            }
            );
    }
    //获取所有激活云平台
    getPlatformsActive() {

    }
    //获取产品目录
    ccf() {

    }

    nof() {

    }
    paging(page) {
        this.backend({
            "categoryId": this.queryProDirTypeId,
            "platformId": this.platformId,
            'page': page,
            size: this.pp
        });
    }

}
