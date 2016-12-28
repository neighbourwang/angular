import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

import { OrgMngService } from '../service/org-mng.service';

//model
import { Org } from '../model/org';
@Component({
    selector: 'org-mng-list',
    templateUrl: '../template/org-mng-list.component.html',
    styleUrls: [],
    providers: []
})
export class OrgMngListComponent implements OnInit {
    constructor(
        private router: Router,
        private service: OrgMngService,
        private layoutService:LayoutService
    ) { }

    @ViewChild('confirm')
    private confirm: ConfirmComponent;
    @ViewChild('notice')
    private notice: NoticeComponent;

    // 机构列表
    orgs: Array<Org> = new Array<Org>();
    // 被选中的当前机构
    org: Org = new Org();
    // 平台数据总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;

    // confirm 的头部 
    confirmTitle: string;
    // confirm 的内容
    confirmMessage: string;
    // confirm 的类型 判断是 禁用 启用 删除
    confirmType: number;

    ngOnInit() {
        this.getOrg(0, this.pp);
    }



    create() {
        this.router.navigateByUrl('user-center/org-mng/org-mng-cr');
    }

    getOrg(page: number, size: number) {
        this.org=new Org();
        this.layoutService.show();
        this.service.getOrg(page, size).then(
            res => {
                this.orgs = res.resultContent;
                let pageInfo = res.pageInfo;
                this.tp = pageInfo.totalPage;
                console.log(this.orgs);
                this.layoutService.hide();
            }
        ).catch(
            err => {
                console.error(err);
                this.layoutService.hide();
            }
            )
    }
    curPage:number=0;
    paging(page) {
        this.curPage=page;
        this.getOrg(this.curPage, 10);
    }
    chooseItem(index: number) {        
        if(this.orgs[index].isDefault){
            this.orgs[index].selected=false;
            this.notice.open('操作错误','禁止操作系统默认机构');            
            return
        };
        console.log(index);
        this.orgs.forEach((ele)=>{
            ele.selected=false;
        })
        this.orgs[index].selected=true;
        this.org = this.orgs[index];
    }

    delete() {
        console.log(this.org);
        if (this.org.id) {
            if(this.org.status == 0){
                this.deleteOrg();
                return;
            }
            if (this.org.status == 1) {
                this.notice.open('操作错误', '禁止删除启用状态下的机构');
                return;
            }
            if(this.org.headCount>0){
                this.notice.open('操作错误', '禁止删除机构下成员不为0的机构');
                return;
            }            
            this.confirmTitle = "删除机构";
            this.confirmMessage = "您选择删除" + this.org.name + "，请确认。如果确认，机构将被删除且该机构中的用户将被移除";
            this.confirmType = 3;
            this.confirm.open(this.confirmTitle, this.confirmMessage);
        } else {
            this.notice.open('操作错误', '请选择一个机构');            
        }
    }
    enable() {
        console.log(this.org);
        if (this.org.id) {
            if (this.org.status == 1) {
                this.notice.open('操作错误', '不能启用已启用状态下的机构')
                return;
            }
            this.confirmTitle = "启用机构";
            this.confirmMessage = "您选择启用" + this.org.name + "，请确认";
            this.confirmType = 1;
            this.confirm.open(this.confirmTitle, this.confirmMessage);

        } else {
            this.notice.open('操作错误', '请选择一个机构');
        }
    }

    disable() {
        if (this.org.status == 5) {
                this.notice.open('操作错误', '机构状态已禁用')
                return;
            }
        if (this.org.id) {
            this.confirmTitle = "禁用机构";
            this.confirmMessage = "您选择禁用 '" + this.org.name + "'，请确认。如果确认，机构内成员将无法操作相关资源";
            this.confirmType = 2;
            this.confirm.open(this.confirmTitle, this.confirmMessage);
        } else {
            this.notice.open('操作错误', '请选择一个机构');
        }
    }

    edit() {
        if(this.org.id){
            this.router.navigateByUrl("user-center/org-mng/org-mng-cr/" + this.org.id);
        }else{
            this.notice.open('操作错误', '请选择一个机构');
        }        
    }
    of() {
        switch (this.confirmType) {
            case 3:
                this.deleteOrg();
                break;
            case 1:
                this.enableOrg();
                break;
            case 2:
                this.disableOrg();
        }
    }

    cf() {

    }

    deleteOrg() {
        this.service.deleteOrg(this.org.id).then(
            res => {
                console.log(res);
                this.getOrg(this.curPage, 10);
            }
        ).catch(
            err => {
                console.error(err);
            }
            )
    }

    enableOrg() {

        this.service.enableOrg(this.org.id).then(
            res => {
                console.log(res);
                this.getOrg(this.curPage, 10);
            }
        ).catch(
            err => {
                console.error(err);
            }
            )
    }

    disableOrg() {
        this.service.disableOrg(this.org.id).then(
            res => {
                console.log(res);
                this.getOrg(this.curPage, 10);
            }
        ).catch(
            err => {
                console.error(err);
            }
            )
    }
    nof(){}

    ccf(){}


} 