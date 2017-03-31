import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent,dictPipe,PopupComponent} from "../../../../architecture";

import { PhysicalEditService } from "../service/physical-edit.service";

import { PhysicalModel,Part,Space,PartList,PartHardwareInfo,PartsEntitys} from "../model/physical.model";
import { ServerType } from "../model/serverType.model";
import { Brand, Model } from "../model/brand.model";
//import { IpmiInfo } from "../model/physical-ipmi.model";

@Component({
    selector: "physical-edit",
    templateUrl: "../template/physical-edit.html",
    styleUrls: [],
    providers: []
})
export class PhysicalEditComponent implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        private service: PhysicalEditService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private dictPipe : dictPipe
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("addParts")
    addParts: PopupComponent;


    physical: PhysicalModel = new PhysicalModel(); //物理机实力
 
    eidtMode: string = "create"; //页面显示状态 create / eidt / view
    read = false;
    title: string; //编辑或添加的title
    serverTypes: ServerType[]; // 服务器类型列表
    brands: Brand[]; //品牌列表
    defaultBrand = new Brand(); //空品牌
    selectedBrand: Brand = this.defaultBrand;
    poolId:string;
    diskValue:boolean;
    parts:Array<Part>= new Array<Part>();
    part:Part;
    defaultPart = new Part(); //
    selectedPart:Part=this.defaultPart;
   
    partsEntityList:Array<PartsEntitys>=new Array<PartsEntitys>();
    partsEntity:PartsEntitys=new PartsEntitys();
    isEdit: boolean;
  
    ngOnInit() {
        this.activeRoute.params.forEach((params: Params) => {
            const id = params["id"];
            this.physical.pmId = id;
            this.eidtMode = params["type"]||"create";
            this.poolId = params["pmPoolId"];
            
            if (!this.poolId) {
                alert("缺少参数");
                return;
            }
            console.log(this.eidtMode);
            switch (this.eidtMode) {
                case "edit":
                    this.title = "PHYSICAL_MNG.EDIT_PHYSICAL";
                    break;
                case "view":
                    this.title = "PHYSICAL_MNG.VIEW_PHYSICAL";
                    break;
                case "create":
                    this.title = "PHYSICAL_MNG.CREATE_PHYSICAL";
                    break;
                case "editParts":
                    this.title="编辑物理机部件";
            }

        });
        this.getServerInfo()
            .then(() => {
                if (this.physical.pmId) {
                    this.getPhysicalById(this.physical.pmId);
                } else {
                    this.physical=new PhysicalModel();
                }
            });
        this.getPartList();   //获取部件清单
        //this.getPartsList();  //获取物理机部件列表
    }

    //获取物理机信息
    getPhysicalById(id: string): void {
        this.layoutService.show();
        this.service.getPhysical(id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        var physical: PhysicalModel = response["resultContent"];
                        this.selectedBrand = this.brands.find((brand) => { return brand.id == physical.brandId });
                        this.physical = physical;
                       // console.log("编辑物理机", this.physical.pmHardwareCPU,this.physical.iloIPAddress);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            );
    }

    //获取物理机服务器的品牌、型号、类型
    getServerInfo(): Promise<any> {
        this.layoutService.show();
        return this.service.getServer()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                   // this.serverTypes = response["resultContent"].serverTypeList;
                    this.brands = response["resultContent"];
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            );
    }

    //获取物理机部件清单
    getPartList(){
        this.layoutService.show();
        this.service.getPartList()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.parts= response["resultContent"];
                    console.log("部件清单",this.parts)
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));

    }

    

    //编辑物理机
    editPhysical() {
        this.layoutService.show();
        this.service.editPhysical(this.physical)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    //this.showAlert("保存成功！");
                    this.gotoList();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    // //判断磁盘规格值是否为空
    // notNull(disk:Disk) {
    //    if(!disk.value){
    //        this.diskValue=false;
    //        this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_DISK_VALUE");
    //    }
    //    else{
    //        this.diskValue=true;
    //    }
    // }

    //添加物理机
    createPhysical() {

        if (!this.physical.pmName) {
            this.physical.pmName=this.physical.model;
            //this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_PHYSICAL_NAME");
            //return false;
        }

        if (!this.physical.iloIPAddress) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_IPMI_IP");
            return false;
        }

        if (!this.physical.iloUserName) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_IPMI_USERNAME");
            return false;
        }
        if (!this.physical.iloPwd) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_IPMI_PASSWORD");
            return false;
        }
        if (!this.physical.macAddress) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_MAC");
            return false;
        }
        if (!this.physical.sererTypeId) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_SERVER_TYPE");
            return false;
        }
       
              
        this.physical.brandId = this.selectedBrand.id;
        this.physical.pmPoolId=this.poolId;
        if (!this.physical.brandId) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_SERVER_BRAND");
            return false;
        }
        if (!this.physical.modleId) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_SERVER_MODEL");
            return false;
        }
        if(!this.read){
            this.showAlert("PHYSICAL_MNG.PLEASE_READ_ILO_INFO");
           return false;
        }
      
         
        this.dictPipe.transform(this.physical.sererTypeId,this.service.dictServerType)
            .then(
                res=> {
                    this.physical.serverTypeName=res;
                }
            ) 
            .then(
                ()=>{
                    this.layoutService.show();
                    this.service.createPhysical(this.physical)
                        .then(
                        response => {
                            this.layoutService.hide();
                            if (response && 100 == response["resultCode"]) {
                                this.layoutService.hide();
                                console.log(this.physical);
                                //this.showAlert("添加物理机成功");
                                this.gotoList();
                            } else {
                                this.showAlert("COMMON.OPERATION_ERROR");
                            }
                        }
                        )
                        .catch((e) => this.onRejected(e));
                            }
                        );        
    }

    //读取物理机硬件信息
    readHardwareInfo() {
        
       if(this.physical.iloIPAddress && this.physical.iloPwd && this.physical.iloUserName){
            this.layoutService.show();
             this.service.getPhysicalHardwareInfo(this.physical)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                   this.physical.model=response["resultContent"].model;
                   this.physical.sn=response["resultContent"].sn;
                   this.physical.partsList=response["resultContent"].partsList;
                     console.log( this.physical.model,this.physical.sn);
                      this.read = true;
                } else {
                     this.read = false;
                }
            }
            )
       }
       else{
           this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_ILO_INFO");
       }      
    }

    //新增物理机部件
     addPart() {

         this.isEdit=false;
         this.partsEntity=new PartsEntitys();
         this.selectedPart=this.defaultPart;
        this.addParts.open("新建部件");
    }
    //确认部件
    addPartConfirm(){
        if(this.isEdit){//编辑
             const partSelect = this.partsEntityList.find((e) => { return e.isSelect });
             for (var i = this.partsEntityList.length - 1; i >= 0; i--) {
                if (this.partsEntityList[i].isSelect) {
                    this.partsEntity.partsName=this.selectedPart.partsName;
                    this.partsEntityList[i]=this.partsEntity;
                }
             }  
              this.addParts.close();          
        }
        else{//添加
            this.partsEntity.partsName=this.selectedPart.partsName;
            this.partsEntity.partsId=this.selectedPart.partsId;
            this.partsEntityList.push(this.partsEntity);
            this.addParts.close();
        }
        
    }

    //编辑物理机部件
    editPart(){
        this.isEdit=true;
        const partSelect = this.partsEntityList.find((e) => { return e.isSelect });
        console.log("选中的需要编辑的物理机部件",partSelect);
         if(!partSelect){
            this.showAlert("请选择需要编辑的物理机部件！");
            return;
        }
        this.selectedPart = this.parts.find((part) => { return  part.partsName== partSelect.partsName });
        
        let editPart= new PartsEntitys();
            editPart= partSelect;
            this.partsEntity= editPart; 
            this.partsEntity.specName=partSelect.specName;                 
            this.addParts.open("编辑部件");
    }

    //删除物理机部件
    deletePart(){       
        const part = this.partsEntityList.find((e) => { return e.isSelect });
          if(!part){
            this.showAlert("请选择需要删除的物理机部件！");
            return;
        }
         for (var i = this.partsEntityList.length - 1; i >= 0; i--) {
            if (this.partsEntityList[i].isSelect) {
                 this.partsEntityList.splice(i, 1);
            }
        }
    }

    //选择物理机部件
     getSelectPart(part: PartList) {
        this.partsEntityList.forEach((part) => {
            part.isSelect = false;
        });
        part.isSelect= true;
    }
  
    cancel() {
        this.gotoList();
    }

    gotoList() {
        this.route.navigate(["phy-mng/physical-mng/physical-list",{pmpoolId: this.poolId}]);

    }

    myDatePickerOptions = {   //如果自定义的话传入下方表格相应的属性   这个是可选的
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '404px',
        inline: false,
        disableUntil: {year: 2016, month: 8, day: 10},
        selectionTxtFontSize: '16px'
    };
    
    //维保起始时间
     startTimeChange($event){
		this.physical.mainStartDate = $event.formatted;
	}
    
    //维保结束时间
	endTimeChange($event){
		this.physical.mainEndDate = $event.formatted;
	}
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "PHYSICAL_MNG.NOTICE";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHYSICAL_MNG.ERROR");
    }
}