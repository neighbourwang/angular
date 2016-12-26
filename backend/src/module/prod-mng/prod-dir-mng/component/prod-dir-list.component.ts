/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent , SystemDictionary,
    dictPipe} from '../../../../architecture';
//service
import { ProdDirListService } from '../service/prod-dir-list.service';
import { ProdSeriesService } from '../service/prod.series.service';
import { PlatformsActiveService } from '../service/platform.service';
import { ProdDirPublishService } from '../service/prod-dir-publish.service';
import { CcProdDirPublishService } from '../service/prod-dir-ccPublish.service';
import { ProdDirDeleteService } from '../service/prod-dir-delete.service';

//model
import { Proddir } from '../model/prodDirList.model';
import { specification } from '../model/prodDir.model';
// import {ProdDirModule} from '../prod-dir-mng.routing'
@Component({
    selector: 'prod-dir-list',
    templateUrl: '../template/prod-dir-list.component.html',
    styleUrls: [
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
        private router: Router
    ) { }

    // 产品目录数组
    prodDirList: Array<Proddir> = new Array<Proddir>();

    // 产品目录总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;

    prodDirTypeList = new Array();
    platformsList = new Array();
    platformId: string;
    prodDirTypeId: string;;
    queryProDirTypeId: string;

    //mokup



    ngOnInit() {
        console.log(this.pp);
        //获得激活云平台数据
        this.PlatformsActiveService.getPlatformsActive().then(response => {
            console.log('激活云平台数据', response);
            if (response && 100 == response.resultCode) {
                this.platformsList = response.resultContent;
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
        //获取产品目录类别
        this.ProdSeriesService.getProdSeries().then(response => {
            if (response && 100 == response.resultCode) {
                this.prodDirTypeList = response.resultContent;
                this.prodDirTypeId = this.prodDirTypeList[0].id
                // this.queryProdDirTypeId =this.prodDirTypeList[0].id                
                console.log('产品目录类别', this.prodDirTypeList)
                // this.prodDirTypeList.push({
                //     code: "VITRUALDISK_SERVICE",
                //     id: "2",
                //     name: "云硬盘服务"
                // })
            } else {

            }
        }).catch(err => {
            console.error(err);
        })

        // this.prodDirTypeList=[
        //     {
        //         "id": "1",
        //         "code": "VITRUALMACHINE_SERVICE",
        //         "name": "云主机服务"
        //     },
        //     {
        //         "id": "2",
        //         "code": "VITRUALMACHINE_SERVICE",
        //         "name": "云硬盘服务"
        //     },
        // ]

        this.backend({
            "categoryId": '',
            "page": 1,
            "platformId": '',
            "size": this.pp,
        });
    }
    data: any = {
        "categoryId": "string",
        "page": 1,
        "platformId": "string",
        "size": 0,
    };
    onQuery() {
        // console.log(this.platformId);
        // console.log(this.queryProDirTypeId);
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
            this.notice.open('操作错误', '请选择产品目录');
        } else {
            let message: string = '';
            for (let dir of prodDirList) {
                message += dir.serviceName + ",";
            }
            console.log(message);
            message = message.substring(0, message.length - 1);
            switch (order) {
                case 'delete': this.deleteConfirm.open('删除产品目录', '您选择删除 ' + "'" + message + "'" + '产品,请确认；如果确认，此产品目录的数据将不能恢复。')
                    break;
                case 'publish':
                    if (prodDirList[0].status == '1') {
                        this.notice.open('操作错误', '不可以再次发布已发布状态的产品目录')
                    } else {
                        this.publishConfirm.open('发布产品目录', '您选择发布 ' + "'" + message + "'" + '产品,请确认。')
                    }
                    break;
                case 'ccPublish':
                    if (prodDirList[0].status == '3') {
                        this.notice.open('操作错误', '不可以再次取消发布未发布状态的产品目录')
                    } else {
                        this.ccPublishConfirm.open('取消发布产品目录', '您选择取消发布' + "'" + message + "'" + '产品,请确认。如果确认，此产品目录将不能用来创建产品。')
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
        this.router.navigateByUrl("prod-mng/prod-dir-mng/prod-dir-cre", { skipLocationChange: true });
    }
    //创建按钮
    creation() {
        //跳转
        console.log('create');
        this.createProdDir.open('创建产品目录');
    }
    //选择产品目录类型
    showSpec: boolean = true;
    selectProDirType(e) {
        console.log(e);
        this.showSpec =
            e == '33f23ade-a0f8-11e6-a18b-0050568a49fd' ? true : false;
    }
    otcreate() {
        let id = this.prodDirTypeId;
        console.log(this.spec);
        if (this.prodDirTypeId == '33f23ade-a0f8-11e6-a18b-0050568a49fd') {
            if (this.spec.vcpu == 0) {
                this.vcpuValueError = true;
                return
            }
            if (this.spec.mem == 0) {
                this.memValueError = true;
                return
            }
            if (this.spec.mem > 0 && this.spec.vcpu > 0) {
                this.router.navigate(["prod-mng/prod-dir-mng/prod-dir-cre", { vcpu: this.spec.vcpu, mem: this.spec.mem, startupDisk: this.spec.startupDisk }]);
            } else {
                this.notice.open('操作错误', '云主机产品目录规格输入错误')
            }
        } else {
            this.router.navigate(["prod-mng/prod-dir-mng/prod-dirDisk-cre"]);
        }

    }
    //去编辑详情
    goDetail(item) {
        console.log(item);
        // let id = item.serviceId;
        // let type ="detail"
        // this.router.navigate(["prod-mng/prod-dir-mng/prod-dir-cre", id,type]);
    }

    //获取列表数据
    backend(data) {
        // this.layoutService.show();
        this.tp = 0;
        this.service.getProdDirList(data).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;
                    let backend = new Array<Proddir>();
                    for (let content of resultContent) {
                        let proddir = new Proddir();
                        proddir.serviceId = content.serviceId;
                        proddir.serviceName = content.serviceName;
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
    //
    spec: specification = new specification();
    vcpuValueError: boolean = false;
    memValueError: boolean = false;
    outputValue(e, arg) {
        console.log(e, arg);
        if (arg == 'vcpu') {
            (e != 0) && (this.vcpuValueError = false)
        }
        if (arg == 'mem') {
            (e != 0) && (this.memValueError = false)
        }
        this.spec[arg] = e;
    }
}
