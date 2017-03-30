import { Component, OnInit, Input , Output, EventEmitter,ViewChild } from '@angular/core';
import { LayoutService, NoticeComponent, PopupComponent} from '../../../../architecture';
import { CustomOsService } from './custom-os.service';

import { Validation, ValidationRegs } from '../../../../architecture';

@Component({
	selector: 'custom-os',
	templateUrl: './custom-os.component.html',
    styleUrls: ['./custom-os.less']
})
export class CustomOsComponent implements OnInit {

    @Input() platformid: string = "";
    @Input() uuid: string = "";



    @ViewChild('dialogPopup') private dialogPopup: PopupComponent;
    @ViewChild('notice') private noticeDialog: NoticeComponent;

    modalTitle: string = '';
    modalMessage: string = '';
    modalOKTitle: string = '';

    name: string = '';
    description: string = '';

    constructor(
        private layoutService: LayoutService,
        private service : CustomOsService,
        private v: Validation
    ) { 
        this.v.result = {};   
    }

    ngOnInit() {
       // this.dialogPopup.open();
    }

	open() {
        console.log(6666, this.dialogPopup)
        this.dialogPopup.open();
    }

    checkForm(key?:string) {
        let regs:ValidationRegs = {  //regs是定义规则的对象
            name: [this.name, [this.v.isUnBlank, this.v.isBase, this.v.isInstanceName], "自定义镜像名称格式不正确"], 
            description: [this.description, [this.v.isBase, this.v.lengthRange(2, 256), this.v.notStartAtValue("http://"), this.v.notStartAtValue("https://")], "自定义镜像描述不正确"],
        }

        return this.v.check(key, regs);
    }

    confirm(){
       let errorMessage = this.checkForm();
       if(errorMessage) return this.showNotice("提示框", errorMessage);

       this.layoutService.show();
       this.service.creatImage(this.name, this.uuid, this.platformid)
           .then(res => {
               this.layoutService.hide();
               this.dialogPopup.close();
               this.showNotice("提示框", "创建镜像成功！");
           })
           .catch(e => {
               this.layoutService.hide();
               this.showNotice("提示框", "创建镜像失败！");
           })
    }

    cancel(){}

    modalAction() {}
    showNotice(title: string, msg: string) {
        this.modalTitle = title;
        this.modalMessage = msg;

        this.noticeDialog.open();
    }
}
