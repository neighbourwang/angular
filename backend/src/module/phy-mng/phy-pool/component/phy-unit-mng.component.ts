import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary  } from '../../../../architecture';

//model
import { PhyPartsList } from '../model/phy-parts-list.model';
import { PartsModel } from '../model/parts.model';
import { Spec } from "../model/spec.model";

//service
import { PhyUnitMngService } from '../service/phy-unit-mng.service';


@Component({
    selector: 'phy-unit-mng',
    templateUrl: '../template/phy-unit-mng.html',
    styleUrls: [],
    providers: []
})

export class PhyUnitMngComponent implements OnInit{

    constructor(
        private router : Router,
        private service : PhyUnitMngService,
        private layoutService : LayoutService
    ) {

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;
    @ViewChild("creUnit")
    creUnit: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 1;
    pageSize= 10;
    totalPage= 1;

    statusDic: Array<SystemDictionary>;

    data: Array<PhyPartsList>;
    criteria: PhyPartsList= new PhyPartsList();
    defaultParts: PartsModel= new PartsModel();
    defaultSpec: Spec= new Spec();
    selectedParts= this.defaultParts;
    selectedSpec= this.defaultSpec;
    partslist: Array<PartsModel>;
    isEdit: boolean;
    noReapeat: boolean;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();
        this.getData();
    }

    getData(pageIndex?): void {
        this.pageIndex= pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getData(this.pageIndex, this.pageSize)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.data = response["resultContent"];
                        this.totalPage= response.pageInfo.totalPage;
                        console.log(this.data,"this.data");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    getPartsList(): void {
        this.layoutService.show();
        this.service.getPartsList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        console.log(response.resultContent, "partslist");
                        this.partslist = response["resultContent"];
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    selected(item: PhyPartsList){
        this.data.forEach((p) =>{
            p.selected= false;
        });
        item.selected= true;
    }

    crePage(){
        this.isEdit= false;
        this.criteria= new PhyPartsList();
        this.selectedParts= this.defaultParts;
        this.selectedSpec= this.defaultSpec;
        this.getPartsList();
        this.creUnit.open("新建部件");
    }

    editPage(){
        const selectedP = this.data.find((p) => {
            return p.selected;
        });
        if(!selectedP){
            this.showAlert("请选择部件")
        }else if(selectedP.usedPMCount == 0){
            this.isEdit= true;
            let editParts= new PhyPartsList();
            editParts.partsId= selectedP.partsId;
            editParts.partsName= selectedP.partsName;
            editParts.specId= selectedP.specId;
            editParts.specName= selectedP.specName;
            editParts.specValue= selectedP.specValue;
            editParts.referencePrice= selectedP.referencePrice;
            editParts.id= selectedP.id;
            this.criteria= editParts;
            this.selectedParts= this.partslist.find((p)=>{
                return p.partsId== selectedP.partsId;
            });
            if(!this.selectedParts){
                this.selectedParts= this.defaultParts;
            }
            this.selectedSpec= this.selectedParts.specList.find((p)=>{
                return p.specId== selectedP.specId;
            });
            if(!this.selectedSpec){
                this.selectedSpec= this.defaultSpec;
            }
            this.creUnit.open("编辑部件");
        }else{
            this.showAlert("被物理机引用的部件不能编辑");
        }
    }

    creOredit(){
        this.criteria.partsId= this.selectedParts.partsId;
        this.criteria.specId= this.selectedSpec.specId;
        this.criteria.partsName= this.selectedParts.partsName || this.criteria.partsName;
        this.criteria.specName= this.selectedSpec.specName || this.criteria.specName;

        if(!this.selectedParts.partsName ){
            let repartsName= this.partslist.find((p)=>{
                return p.partsName== this.criteria.partsName
            });
            if(repartsName){
                this.noReapeat= false;
            }else {
                this.noReapeat= true;
            }
        }else if(!this.selectedSpec.specName && this.selectedParts.partsName){
            let respecName= this.selectedParts.specList.find((p)=>{
                return p.specName== this.criteria.specName;
            });
            if(respecName) {
                this.noReapeat= false;
            }else {
                this.noReapeat= true;
            }
        }else{
            this.noReapeat= true;
        }

        if(!this.isEdit && this.noReapeat){
            this.layoutService.show();
            this.service.create(this.criteria)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                            this.creUnit.close();
                            console.log(response.resultContent, "create");
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }else if(this.isEdit && this.noReapeat){
            this.layoutService.show();
            this.service.edit(this.criteria)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                            this.creUnit.close();
                            console.log(response.resultContent, "edit");
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }else{
            this.creUnit.close();
            this.showAlert("部件名称或规格已存在");
        }
    }

    delete(){
        const selectedP = this.data.find((p) => {
            return p.selected;
        });
        if(!selectedP){
            this.showAlert("PHY_MNG_DEPART.PLEASE_CHOOSE_DEPART")
        }else if(selectedP.usedPMCount == 0){
            this.confirm.open("PHY_MNG_DEPART.DELETE_DEPART","PHY_MNG_DEPART.DELETE_DEPART_WARNING^^^"+selectedP.partsName);
            this.confirm.cof =() =>{
                this.layoutService.show();
                this.service.delete(selectedP.id)
                    .then(
                        response => {
                            this.layoutService.hide();
                            if (response && 100 == response["resultCode"]) {
                                this.pageIndex= 1;
                                this.pager.render(1);
                                this.getData();
                            } else {
                                this.showAlert("COMMON.OPERATION_ERROR");
                            }
                        }
                    )
                    .catch((e) => this.onRejected(e));
            }
        }else{
            this.showAlert("被物理机引用的部件不能删除");
        }
    }


    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

}
