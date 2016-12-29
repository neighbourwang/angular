import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent ,dictPipe} from '../../../../architecture';

import { PlatformDetailService } from '../service/pf-mng-detail.service';

import { ClMngCommonService } from '../service/cl-mng-common.service';

//model
import { Platform } from '../model/platform.model';
import { ZoneListModel } from '../model/cre-step3.model';


@Component({
    templateUrl: '../template/pf-mng-detail.component.html',
    styleUrls: [
        '../style/cl-mng.less'
    ],
    providers: []
})
export class PfDetailComponent implements OnInit {
    constructor(private layoutService: LayoutService,
        private route: Router,
        private router: ActivatedRoute,
        private platformDetailService: PlatformDetailService,
        private commonService: ClMngCommonService,
        private location: Location,
        private dictPipe: dictPipe,
    ) {
    }
    @ViewChild('removeConfirm')
    removeConfirm: ConfirmComponent;

    @ViewChild('enableConfirm')
    enableConfirm: ConfirmComponent;

    @ViewChild('disableConfirm')
    disableConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";
    // 云平台状态
    platFormStatus: Array<any> = new Array<any>();


    Tabels = [
        { name: '基本信息', active: true },
        { name: '可用区与配额', active: false },
        { name: '存储区与配额', active: false }
    ]
    platformName: string;
    platformType: string;
    platformTypes: Array<any> = new Array<any>();
    platformVersion: Array<any> = new Array<any>();
    regions: Array<any> = new Array<any>();
    platform: Platform = new Platform();
    //可用区列表
    zoneList: Array<ZoneListModel>;
    //初始化
    ngOnInit() {
        let id: string;
        this.router.params.forEach((params: Params) => {
            id = params['id'];
            this.platformType = params['type'];
            this.platformName = params['name'];
            console.log(this.platformType);
        })
        //获取云平台类型列表
        this.layoutService.show();
        this.commonService.getPlatFormTypes()
            .then(
            res => {
                console.log(res);
                this.platformTypes = res;
            }
            ).then(() => {
                this.platformDetailService.getPlatform(id)
                    .then(
                    res => {
                        console.log('platform basic', res);
                        this.platform = res.resultContent;
                        this.platformTypes.forEach(ele => {
                            if (ele.value == this.platform.platformType) {
                                ele.isSelected = true;
                                this.getVersion(ele.code);
                            }
                        })

                    }
                    )
            })
            .then(() => {
                this.platformDetailService.getZoneList(id).then(
                    res => {
                        this.zoneList = res.resultContent;
                        this.zoneList.forEach(ele => {
                            if (ele.quotaPercentage) {
                                ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                            }
                        })
                        console.log(res);
                        this.layoutService.hide();
                    }
                )
            })
            .catch(
            err => {
                console.error('err');
                this.layoutService.hide();
                this.notice.open('错误', '获取信息错误');
            }
            )
        //获取区域列表
        this.commonService.getRegion()
            .then(

            res => {
                console.log('region', res);
                this.regions = res;
            }
            ).catch(
            err => {
                console.error('err');
                this.notice.open('错误', '获取区域信息错误');
            }
            )

    }

    //选择平台类型
    choosePlatFormType(item, index) {
        for (let i = 0; i < this.platformTypes.length; i++) {
            this.platformTypes[i].isSelected = false;
        }
        this.platformTypes[index].isSelected = true;
        this.platform.platformType = item.value;
        console.log(item);
        this.platform.version = '';
        this.getVersion(item.code);
    }
    //获取版本版本
    getVersion(code) {
        this.commonService.getVersion(code).then(
            res => {
                console.log(res);
                this.platformVersion = res
                // this.creStep1Model.version = this.platformVersion[0].value;
            }
        ).catch(
            err => {
                console.error('err');
                this.notice.open('错误', '获取版本错误');
            }
            )
    }
    //切换TAB
    changeTab(item, index) {
        this.Tabels.forEach((ele) => {
            ele.active = false;
        })
        item.active = true;

    }
    back() {
        this.location.back();
    }
    goList() {
        this.route.navigate(['pf-mng2/cl-mng/cl-mng'])
    }
    save() {
        console.log(this.platform);
        if (!this.platform.name) {
            return this.notice.open('操作错误', '请输入云平台名称');
        }
        if (!this.platform.dataCenter) {
            return this.notice.open('操作错误', '请输入所属数据中心');
        }
        if (!this.platform.uri) {
            return this.notice.open('操作错误', '请输入地址');
        }
        this.layoutService.show();
        this.platformDetailService.putPlatform(this.platform).then(res => {
            console.log(res);
            this.layoutService.hide();
            this.location.back();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }

}
