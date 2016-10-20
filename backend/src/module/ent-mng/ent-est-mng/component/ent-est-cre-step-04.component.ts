import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent } from '../../../../architecture';
import { EntEstBasicInfo } from '../model/ent-est-basic-info'
import { EntEstCreService } from '../service/ent-est-cre.service'
import { EntEstResourceQuota } from "../model/ent-est-resourcequota";


@Component({
	selector:'ent-est-cre-step-04'
	,templateUrl:'../template/ent-est-cre-step-04.component.html'
	,styleUrls:[]
	,providers:[EntEstCreService]
})
export class EntEstCreStep04Component implements OnInit{
	@ViewChild("notice")
	notice: NoticeComponent;

	private entEstBasicInfo:EntEstBasicInfo;
	private entEstResourceQuotas : EntEstResourceQuota[];

	constructor(
		private router: Router,
		private service: EntEstCreService){}
	ngOnInit(){
		this.entEstBasicInfo = this.service.getEntEst().BasicInfo;
	}

	prev(){
      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-03");
    }

	cancel(){
		this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}

	create(){
		this.service.createEnterpise(null).then(ret=>{
			console.log('企业创建成功', ret);

	
			this.service.enterpriseOpen(ret.resultContent.id).then(ret2=>{
				console.log('企业开通成功');
				
				this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
			})
			.catch(err2=>{
				console.log('企业开通 failure', err2);
				this.notice.open("企业开通", "企业开通失败");
			});
			
		})
		.catch(err=>{
			console.log('企业创建 failure', err);
			this.notice.open("企业创建", "企业创建失败");
		});
	}

}