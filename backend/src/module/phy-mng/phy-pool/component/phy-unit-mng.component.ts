import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary, ValidationService  } from '../../../../architecture';

//model
import { PhyPartsList } from '../model/phy-parts-list.model';
import { PartsModel } from '../model/parts.model';
import { Spec } from "../model/spec.model";

//service
import { PhyUnitMngService } from '../service/phy-unit-mng.service';


@Component({
    selector: 'phy-unit-mng',
    templateUrl: '../template/phy-unit-mng.html',
    styleUrls: ['../style/phy-unit-mng.style.less'],
    providers: []
})

export class PhyUnitMngComponent implements OnInit{

    constructor(
        private router : Router,
        private service : PhyUnitMngService,
        private layoutService : LayoutService,
        private validationService: ValidationService
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

    @ViewChild("partsName")
    partsName: ElementRef;

    @ViewChild("specName")
    specName: ElementRef;

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
    respecName: Spec= new Spec();
    respecof: Spec= new Spec();

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();
        this.defaultParts.partsName= "PHY_MNG_DEPART.OTHERS";
        this.defaultSpec.specName= "PHY_MNG_DEPART.OTHERS";
        this.getData();
        this.getPartsList();
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
        //this.getPartsList();
        this.creUnit.open("PHY_MNG_DEPART.CREATE_DEPART");
    }

    editPage(){
        const selectedP = this.data.find((p) => {
            return p.selected;
        });
        if(!selectedP){
            this.showAlert("PHY_MNG_DEPART.PLEASE_CHOOSE_DEPART")
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
            if(this.partsName){
                this.partsName.nativeElement.value = this.criteria.partsName;
            }
            if(this.specName){
                this.specName.nativeElement.value = this.criteria.specName;
            }
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
            this.creUnit.open("PHY_MNG_DEPART.EDIT_DEPART");
        }else{
            this.showAlert("PHY_MNG_DEPART.USED_CANNOT_EDIT");
        }
    }

    creOredit(){
        this.criteria.partsId= this.selectedParts.partsId;
        this.criteria.specId= this.selectedSpec.specId;

        if(!this.partsName){
            this.criteria.partsName= (this.selectedParts.partsName != this.defaultParts.partsName)? this.selectedParts.partsName : this.criteria.partsName;
        }else{
            //this.criteria.partsName= (this.partsName.nativeElement.value != this.defaultParts.partsName) ? this.partsName.nativeElement.value : this.criteria.partsName;
            this.criteria.partsName= this.partsName.nativeElement.value;
        }

        if(!this.specName){
            this.criteria.specName= (this.selectedSpec.specName != this.defaultSpec.specName)? this.selectedSpec.specName : this.criteria.specName;
        }else{
            //this.criteria.specName= (this.specName.nativeElement.value != this.defaultSpec.specName ) ? this.specName.nativeElement.value : this.criteria.specName;
            this.criteria.specName= this.specName.nativeElement.value;
        }

        if (this.validationService.isBlank(this.criteria.partsName)) {
            this.showAlert("PHY_MNG_DEPART.DEPART_NAME_CANNOT_NULL");
            return;
        }
        if (this.validationService.isBlank(this.criteria.specName)) {
            this.showAlert("PHY_MNG_DEPART.SPEC_NAME_CANNOT_NULL");
            return;
        }
        if (this.validationService.isBlank(this.criteria.specValue)) {
            this.showAlert("PHY_MNG_DEPART.SPEC_VALUE_CANNOT_NULL");
            return;
        }
        if (this.validationService.isBlank(this.criteria.referencePrice)) {
            this.showAlert("PHY_MNG_DEPART.REFERENCE_CANNOT_NULL");
            return;
        }

        if((this.selectedParts.partsName == '磁盘' || this.selectedParts.partsName == '内存') && !this.validationService.isNumber(this.criteria.specValue)){
            this.showAlert("PHY_MNG_DEPART.PARTSNAME_ONLY_CANBE_NUMBER");
            return;
        }

        if(!this.validationService.isNumber(this.criteria.referencePrice)){
            this.showAlert("PHY_MNG_DEPART.REFERENCENAME_ONLY_CANBE_NUMBER");
            return;
        }

        //部件名称重复
        let repartsName= this.partslist.find((p)=>{
            return p.partsName== this.criteria.partsName
        });
        //部件名称与规格重复
        let respartsof= this.partslist.find((p)=>{
            return p.partsName== this.criteria.specName
        });
        //规格名称重复 规格名称与部件名称重复
        this.partslist.find((p)=>{
            this.respecName = p.specList.find((r)=>{
                return r.specName== this.criteria.specName;
            });
            this.respecof = p.specList.find((r)=>{
                return r.specName== this.criteria.partsName;
            });
            if(this.respecName || this.respecof){
                return true;
            }else{
                return false;
            }
        });
        if(this.selectedParts.partsName == this.defaultParts.partsName){
            if(repartsName || this.respecName || respartsof || this.respecof){
                this.noReapeat= false;
            }else {
                this.noReapeat= true;
            }
        }else if((this.selectedSpec.specName == this.defaultSpec.specName) && (this.selectedParts.partsName != this.defaultParts.partsName)){
            if(this.respecName || respartsof) {
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
                            this.getPartsList();
                            this.creUnit.close();
                            console.log(response.resultContent, "create");
                        }else if(response && 10008001 == response["resultCode"]){
                            this.showAlert("PHY_MNG_DEPART.CREATE_CANNOT_REPEATE");
                        }else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }else if(this.isEdit){
            this.layoutService.show();
            this.service.edit(this.criteria)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                            this.getPartsList();
                            this.creUnit.close();
                            console.log(response.resultContent, "edit");
                        }else if(response && 10051001 == response["resultCode"]){
                            this.showAlert("PHY_MNG_DEPART.ALREADY_EXIST");
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }else{
            this.creUnit.close();
            this.showAlert("PHY_MNG_DEPART.ALREADY_EXIST");
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
            this.showAlert("PHY_MNG_DEPART.USED_CANNOT_DELETE");
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
