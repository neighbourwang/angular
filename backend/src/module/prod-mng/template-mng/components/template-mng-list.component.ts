import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

import { DatabaseModel, DatabaseOptions } from '../model/template-mng-database.model'
import { TemplateListService } from '../service/template-mng-list.service';


@Component({
    templateUrl: "../template/template-mng-list.component.html",
})
export class TemplateMngListComponent implements OnInit {
    constructor(
        private router: Router,
        private service: TemplateListService,
        private layoutService: LayoutService
    ) {

    }

    @ViewChild('createTemplatePop')
    createTemplatePop: PopupComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm:ConfirmComponent;

    @ViewChild('notice')
    notice:NoticeComponent;

    templateType: string = '0';

    templateList: Array<DatabaseModel> = new Array<DatabaseModel>();

    ngOnInit() {
        this.getDatabaseTemplateList(1);
    }
    createTemplate() {
        this.createTemplatePop.open('PROD_MNG.CREATE_TEMPLATE')
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
    getDatabaseTemplateList(page) {
        let pageParameter = {
            "currentPage": page,
            "offset": 0,
            "size": 10,
            "sort": {},
            "totalPage": 0
        }
        this.layoutService.show()
        this.service.getDatabaseTemplateList(pageParameter).then(res => {
            console.log(res);
            this.templateList = res.resultContent;
            this.layoutService.hide();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    //去详情
    goDetail(tem) {
        console.log(tem);
        this.router.navigate(['prod-mng/template-mng/template-database', { type: 'edit', id: tem.id }]);
    }
    pageInfo(page) {
        console.log(page);
        this.getDatabaseTemplateList(page);
    }

    //选择的模板ID
    selectedId:string='';
    deleteTemplate(item){
        this.selectedId=item.id;
        this.deleteConfirm.open('删除模板',"你选择删除 '"+item.name+"' 模板")
    }
    ccd(){
        this.selectedId='';
    }
    deleteCof(id) {
        if(this.selectedId==''){
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
        this.service.getTemplatedetail({id:id, pageParameter}).then(res => {
            res.resultContent[0].status = 0;
            res.resultContent[0].diskProfileList=JSON.parse(JSON.stringify(res.resultContent[0].diskInfoList));
            this.service.putDatabaseTemplate(res.resultContent[0]);
        }).then(() => {
            this.getDatabaseTemplateList(1);
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    
}