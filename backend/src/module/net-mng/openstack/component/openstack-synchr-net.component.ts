import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';


import { OpenstackService } from '../service/openstack.service';
import { Network } from '../model/network.model';

@Component({
	selector: "openstack-synchr-net",
	templateUrl: "../template/OpenStack-synchr-net.html",
	styleUrls: [],
	providers: []	
}
	)
export class OpenstackSynchrNetComponent implements OnInit{
	constructor(
		private router: ActivatedRoute,
		private service: OpenstackService ,
		private layoutService: LayoutService,
		private dicService: SystemDictionaryService
	){

	}
	
	@ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

	platform_id:string;
	synNetworks:Array<Network>;

	typeDic: Array<SystemDictionary>;//网络类型
    sharedDic: Array<SystemDictionary>;//是否共享
    stateDic: Array<SystemDictionary>;//运行状态
    //statusDic: Array<SystemDictionary>;//状态
	ngOnInit(){
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
            });
		this.router.params.forEach((params: Params) => {
			this.platform_id = params['platform_id'];
			console.log("接收的platform_id:" + this.platform_id);
			this.getSynList(this.platform_id);
		});
		
	}

	getSynList(platform_id:string):void {
		this.layoutService.show();
        this.service.getSynNetworks(platform_id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
					this.synNetworks = response.resultContent;
                } else {
                    alert("Res sync error");

                }
            }
            )
            .catch((e) => this.onRejected(e));
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
}