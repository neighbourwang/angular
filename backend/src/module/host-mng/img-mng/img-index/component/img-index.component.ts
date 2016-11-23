import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, PaginationComponent, NoticeComponent,ValidationService, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

import { platform } from '../model/platform.model';
import { platforms_mock } from '../model/platform.mock.model';
import { ImgIndexService } from '../service/img-index.service';

@Component({
    selector: "img-index",
    templateUrl: "../template/img-index.html",
    styleUrls: [],
    providers: [ImgIndexService]
}
)

export class ImgIndexComponent implements OnInit {

    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private service: ImgIndexService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    noticeTitle = "";
    noticeMsg = "";

    platforms: Array<platform>;

    typeDic: Array<SystemDictionary>;

    ngOnInit() {
       
        this.dicService.getItems("PLATFORM", "TYPE")
            .then(
            dic => {
                this.typeDic = dic;
                this.getPlatforms();
            });
    }

    getPlatforms() {
        this.layoutService.show();
        this.service.getPlatforms()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.platforms = response["resultContent"];
                    
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }
    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }
}