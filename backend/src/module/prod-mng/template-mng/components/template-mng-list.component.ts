import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent ,PaginationComponent} from '../../../../architecture';

import { DatabaseModel } from '../model/template-mng-database.model'
import { TemplateListService } from '../service/template-mng-list.service';


@Component({
    templateUrl: "../template/template-mng-list.component.html",
    styles: [
        `.btn-active{
            background-color: #00a982;
            color : #fff
        }`
    ],
})
export class TemplateMngListComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: TemplateListService,
        private layoutService: LayoutService
    ) {
        this.templateType='0';
    }

    @ViewChild('createTemplatePop')
    createTemplatePop: PopupComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('pagination')
    pagination:PaginationComponent;

    tp: number//页数
    currPage:number=0;
    templateType: string = '0';
    templateList: Array<DatabaseModel> = new Array<DatabaseModel>();
    templateTypeList = [
        {
            type: '数据库模板',
            value: '0',
            selected: true
        },
        {
            type: '中间件模板',
            value: '1',
            selected: false
        }
    ];

    ngOnInit() {               
        this.route.params.forEach((params: Params) => {
            this.templateType =
                 params['type']?params['type']:'0';
        });
        console.log(this.templateType);
        this.pageInfo(1);
    }
    createTemplate() {
        this.createTemplatePop.open('PROD_MNG.CREATE_TEMPLATE')
    }

    //选择模板类型
    chooseTemplateType(item, idx) {
        this.templateTypeList.forEach(tem => tem.selected = false);
        item.selected = true;
    }
    // onQuery() {
    //     // (this.templateType=='0')&&(this.getDatabaseTemplateList(1));
    //     // (this.templateType=='1')&&(this.getMiddlewareTemplateList(1));
    //     if (this.templateType == '1') {
    //         this.getMiddlewareTemplateList(1);
    //     } else {
    //         this.templateType = '0';
    //         this.getDatabaseTemplateList(1);
    //     }
    // }
    //名称模糊查询
    keyup: string = null;
    search() {
        console.log(this.keyup);
        this.currPage=1;
        if (this.templateType == '1') {
            this.pagination.paging(1);
        } else {
            this.templateType = '0';
            this.pagination.paging(1);
        }
    }
    otcreate() {
        console.log(this.templateType);
        this.templateType == '0' && this.router.navigate(['prod-mng/template-mng/template-database', { type: 'new' }])
        this.templateType == '1' && this.router.navigate(['prod-mng/template-mng/template-middleware', { type: 'new' }])
    }
    ccf() {
        console.log(this.service.databaseTypeDic);
    }
    //查询数据库模板列表
    getDatabaseTemplateList() {
        let param = {
            name: this.keyup||null,
            status: "1",
            pageParameter: {
                "currentPage": this.currPage,
                "offset": 0,
                "size": 10,
                "sort": {},
                "totalPage": 0
            }
        }
        this.layoutService.show()
        this.service.getDatabaseTemplateList(param).then(res => {
            console.log(res);
            this.templateList = res.resultContent;
            this.tp = res.pageInfo.totalPage;
            this.currPage=res.pageInfo.currentPage;            
            this.layoutService.hide();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    //查询中间模板列表
    getMiddlewareTemplateList() {
        let param = {
            name: this.keyup||null,
            status: "1",
            pageParameter: {
                "currentPage": this.currPage,
                "offset": 0,
                "size": 10,
                "sort": {},
                "totalPage": 0
            }
        }
        this.layoutService.show()
        this.service.getMiddlewareTemplateList(param).then(res => {
            console.log(res);
            this.templateList = res.resultContent;
            this.tp = res.pageInfo.totalPage;
            this.currPage=res.pageInfo.currentPage;
            this.layoutService.hide();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    //去详情
    goDetail(tem) {
        console.log(tem);
        if (tem.templateType == 'database') {
            this.router.navigate(['prod-mng/template-mng/template-database', { type: 'edit', id: tem.id }]);
        } else {
            this.router.navigate(['prod-mng/template-mng/template-middleware', { type: 'edit', id: tem.id }]);
        }
    }
    pageInfo(page) {
        console.log(page);
        page = page < 1 ? 1 : page > this.tp ? this.tp : page;   //判断分页是否非法
        // if (this.currPage == page) return;   //如果点击的是当前的page 则不再执行
        this.currPage = page;
        if (this.templateType == '1') {
            this.getMiddlewareTemplateList();
        } else {
            this.getDatabaseTemplateList();
        }
    }

    //选择的模板ID
    selectedId: string = '';
    deleteTemplate(item) {
        this.selectedId = item.id;
        this.deleteConfirm.open('删除模板', "你选择删除 '" + item.name + "' 模板")
    }
    ccd() {
        this.selectedId = '';
    }
    deleteCof() {
        if (this.selectedId == '') {
            this.notice.open('请选择模板');
            return;
        }
        let pageParameter = {
            "currentPage": 1,
            "offset": 0,
            "size": 10,
            "sort": {},
            "totalPage": 0
        }
        if (this.templateType == '1') {
            this.layoutService.show();
            this.service.getMiddlewareTemplatedetail({ id: this.selectedId, pageParameter }).then(res => {
                res.resultContent[0].status = 0;
                res.resultContent[0].diskProfileList = JSON.parse(JSON.stringify(res.resultContent[0].diskInfoList));
                this.selectedId == '';
                this.layoutService.hide();
                return this.service.updateMiddlewareTemplate(res.resultContent[0]);
            }).then(() => {
                this.getMiddlewareTemplateList();
            }).catch(err => {
                console.error(err);
                this.layoutService.hide();
            })
        } else {
            this.layoutService.show();
            this.service.getDatabseTemplatedetail({ id: this.selectedId, pageParameter }).then(res => {
                res.resultContent[0].status = 0;
                res.resultContent[0].diskProfileList = JSON.parse(JSON.stringify(res.resultContent[0].diskInfoList));
                this.selectedId == '';
                this.layoutService.hide();
                return this.service.putDatabaseTemplate(res.resultContent[0]);
            }).then(() => {
                this.getDatabaseTemplateList();
            }).catch(err => {
                console.error(err);
                this.layoutService.hide();
            })
        }

    }

}