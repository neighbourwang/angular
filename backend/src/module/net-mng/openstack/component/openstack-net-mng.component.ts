import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';


import { Network } from '../model/network.model';
import { Network_mock } from '../model/network.mock.model';
import { OpenstackService } from '../service/openstack.service';
import { CriteriaQuery } from '../model/criteria-query.model';
import { Region } from '../model/region.model';
import { DataCenter } from '../model/dataCenter.model';
import { PlatformInfo } from '../model/platformInfo.model';

@Component({
    selector: "openstack-net-mng",
    templateUrl: "../template/OpenStack-net-mng.html",
    styleUrls: [],
    providers: []
}
)
export class OpenstackNetMngComponent implements OnInit {

    constructor(
        private dicService: SystemDictionaryService,
        private service: OpenstackService,
        private layoutService: LayoutService
    ) {
    }
    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    typeDic: Array<SystemDictionary>;//网络类型
    sharedDic: Array<SystemDictionary>;//是否共享
    stateDic: Array<SystemDictionary>;//运行状态
    statusDic: Array<SystemDictionary>;//状态

    queryOpt: CriteriaQuery = new CriteriaQuery();
    networks: Array<Network>;

    //地域列表
    regionList: Array<Region>;
    //数据中心列表
    dcList: Array<DataCenter>;
    //平台信息列表
    pfList: Array<PlatformInfo>;
    //当前选中的
    defaultRegion = new Region();
    selectedRegion: Region = this.defaultRegion;
    defaultDc = new DataCenter();
    selectedDc: DataCenter = this.defaultDc;
    defaultPlatform = new PlatformInfo();
    selectedPfi: PlatformInfo = this.defaultPlatform;


    ngOnInit() {
        this.dicService.getItems("NETWORK", "TYPE")
            .then(
            (dic) => {
                this.typeDic = dic;
                return this.dicService.getItems("NETWORK", "SHARED");
            })
            .then((dic) => {
                this.sharedDic = dic;
                return this.dicService.getItems("NETWORK", "STATE");
            })
            .then((dic) => {
                this.stateDic = dic;
                return this.dicService.getItems("NETWORK", "STATUS");
            })
            .then((dic) => {
                this.statusDic = dic;
                this.getNetworkList();
                this.getOptionInfo();
            });
    }

    getNetworkList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getNetworks(this.queryOpt, this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.networks = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");

                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    search() {

    }
   
    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        if (!$.isArray(dic)) {
            return value;
        }
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

    }


    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    getOptionInfo(): void {
        this.layoutService.show();
        this.service.getOptionInfo()
            .then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.regionList = response.resultContent;
                } else {
                    alert("Res sync error");

                }
            }
            )
    }
}