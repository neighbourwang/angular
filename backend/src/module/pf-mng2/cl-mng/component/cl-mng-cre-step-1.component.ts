/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 
import { CreStep1Model } from '../model/Cre-step1.model';

import { ClMngCreStep1Service } from '../service/cl-mng-cre-step-1.service';

import { ClMngCommonService } from '../service/cl-mng-common.service';

import { ClMngIdService } from '../service/cl-mng-id.service';


@Component({
    selector: 'cl-mng-cre-step-1',
    templateUrl: '../template/cl-mng-cre-step-01.component.html',
    styleUrls: [
        '../style/cl-mng.less'
    ],
    providers: []
})

export class ClMngCreStep1Component implements OnInit {

    creStep1Model: CreStep1Model = new CreStep1Model();
    title: String;
    msg: String;
    platformTypes: Array<any> = new Array<any>();
    platformVersion: Array<any> = new Array<any>();
    regions: Array<any> = new Array<any>();
    platFormRegionList: Array<any> = new Array<any>();

    constructor(
        private router: Router,
        private service: ClMngCreStep1Service,
        private layoutService: LayoutService,
        private idService: ClMngIdService,
        private commonService: ClMngCommonService
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('regionSelect')
    regionSelect: PopupComponent;

    ngOnInit() {
        console.log('init');
        //this.layoutService.show();

        //获取云平台类型列表
        this.commonService.getPlatFormTypes()
            .then(
            res => {
                this.platformTypes = res;
                for (let i = 0; i < this.platformTypes.length; i++) {
                    this.platformTypes[i].isSelected = false;
                }
            }

            )
            .catch(
            err => {
                console.error('err');
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_INFO_ERROR');
            }
            )
        this.commonService.getRegion()
            .then(
            res => {
                console.log('region', res);
                this.regions = res;
                this.creStep1Model.regionId=this.regions[0].id;
            }
            ).catch(
            err => {
                console.error('err');
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_INFO_ERROR');
            }
            )
        // this.layoutService.hide();

    }
    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;
    getPlatformRegionList() {
        let data = {
            "admin": this.creStep1Model.userName,
            "domain": null,
            "endpoint": this.creStep1Model.uri,
            "password": this.creStep1Model.passwd,
            "version": this.creStep1Model.version
        }
        console.log(data);
        return this.service.getPlatformRegionList(data)
    }
    //
    otcreate() {
        this.layoutService.show();
        this.service.crPlatForm(this.creStep1Model).then(
            res => {
                this.idService.setPlatformId(res.resultContent);
                this.layoutService.hide();
                this.router.navigate(["pf-mng2/cl-mng/cre-step2", { type: this.creStep1Model.platformType }]);
            }
        ).catch(
            err => {
                this.layoutService.hide();
                console.error('error');
                this.notice.open('COMMON.ERROR', 'PF_MNG2.CREATE_PLATFORM_ERROR');
            }
            )
    }
    next() {
        let message: String = this.checkValue();
        if (this.checkValue()) {
            this.notice.open('COMMON.ERROR', message);
        } else if (this.creStep1Model.platformType == '0') {
            this.layoutService.show();
            this.getPlatformRegionList()
                .then(
                res => {
                    console.log('platFormRegions', res);
                    this.platFormRegionList = res.resultContent;
                    this.creStep1Model.region=this.platFormRegionList[0].id;
                    this.layoutService.hide();
                    this.regionSelect.open('创建云平台：选取Region')
                }
                ).catch(
                err => {
                    console.error('err');
                    this.layoutService.hide();
                    this.notice.open('COMMON.ERROR', '获取Region信息错误');
                }
                )           
        } else {
            this.layoutService.show();
            this.service.crPlatForm(this.creStep1Model).then(
                res => {
                    this.idService.setPlatformId(res.resultContent);
                    this.layoutService.hide();
                    this.router.navigate(["pf-mng2/cl-mng/cre-step2", { type: this.creStep1Model.platformType }]);
                }
            ).catch(
                err => {
                    this.layoutService.hide();
                    console.error('error');
                    this.notice.open('COMMON.ERROR', 'PF_MNG2.CREATE_PLATFORM_ERROR');
                }
                )
        }
    }
    //取消
    cancel() {
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
    // 选择平台类型
    choosePlatFormType(item, index) {
        for (let i = 0; i < this.platformTypes.length; i++) {
            this.platformTypes[i].isSelected = false;
        }
        this.platformTypes[index].isSelected = true;
        this.creStep1Model.platformType = item.value;
        console.log(item);
        this.creStep1Model.version = '';
        this.commonService.getVersion(item.code).then(
            res => {
                console.log(res);
                this.platformVersion = res
                this.creStep1Model.version = this.platformVersion[0].value;
            }
        ).catch(
            err => {
                console.error('err');
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_VERSION_ERROR');
            }
            )
    }

    // 验证字段
    checkValue(): String {
        console.log(this.creStep1Model);
        if (!this.creStep1Model.name) {
            return 'PF_MNG2.PLATFORM_NAME_REQUIRED';
        }
        if (!this.creStep1Model.dataCenter) {
            return 'PF_MNG2.DATA_CENTER_REQUIRED';
        }
        if (!this.creStep1Model.regionId) {
            return 'PF_MNG2.REGION_REQUIRED';
        }
        if (!this.creStep1Model.platformType) {
            return 'PF_MNG2.PLATFORM_TYPE_REQUIRED';
        }
        if (!this.creStep1Model.uri) {
            return 'PF_MNG2.ADDRESS_REQUIRED';
        }
        if (!this.creStep1Model.version) {
            return 'PF_MNG2.VERSION_REQUIRED';
        }
        if (!this.creStep1Model.userName) {
            return 'PF_MNG2.USERNAME_REQUIRED';
        }
        if (!this.creStep1Model.passwd) {
            return 'PF_MNG2.PASSWORD_REQUIRED';
        }
        return '';
    }
}
