import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/service/layout.service';
import { SystemDictionaryService, RestApi } from '../../../../architecture';
import { Router } from '@angular/router';
import { SiteService } from '../service/site.service';

import { TranslateService } from 'ng2-translate';

@Component({
	selector: 'fc-root',
	templateUrl: '../template/site.component.html',
	styleUrls: ['../style/site.component.less']
})
export class SiteComponent implements OnInit {
	title: string = 'Fox Cloud Portal!';
	left_content_script: string;
	username: string;
	showCssload: boolean = true;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApi: RestApi,
		private service: SiteService,
		private translate: TranslateService,
		private dictService: SystemDictionaryService,
	) {

	}

	ngOnInit() {
		this.layoutService.hide();
		this.preLoad();
		this.setName();
	}
	setName() {
		this.username = this.restApi.getLoginInfo().userInfo.loginName;
	}
	preLoad() {
		this.dictService.get();  //初始化获取所有的数据字典
	}
	onActivate(e) {
		if (this.showCssload) this.showCssload = false;
	}

	navClock(url) {
		this.showCssload = true;
	}
	logOut() {
		this.service.logOut().then();

		setTimeout(() => {
			window.sessionStorage["token"] = "";
			window.sessionStorage["userInfo"] = "";
			window.location.href = "/login.html";
		}, 200)
	}
	translateCodeChange(code) {
		window.localStorage["languageCode"] = code.toLocaleLowerCase();
		window.location.reload();
	}
}
