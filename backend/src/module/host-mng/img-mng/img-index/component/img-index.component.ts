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

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    platforms: Array<platform>;

    typeDic: Array<SystemDictionary>;

    
    ngOnInit() {
       
        //this.dicservice.getitems("platform", "type")
        //    .then(
        //    dic => {
        //        this.typedic = dic;
        //        this.getPlatforms();
        //    });
        this.getPlatforms();
    }

    getPlatforms(pageIndex?) {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getPlatforms(this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.platforms = response["resultContent"];
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    choosePage(plf:platform) {
        const openstack = ['0', '1'];
        const vmware = ['2'];

        if (openstack.indexOf(plf.type) >-1) {
            this.router.navigate([
                `host-mng/img-mng/openstack-mng`,
                {
                    "platformId": plf.id,
                    "platformName":plf.name

                }
            ]
            );
        } else {
            this.router.navigate([
                `host-mng/img-mng/vmware-img-list/${plf.id}`]);

        }
    }

    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

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