import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent ,dictPipe} from "../../../../architecture";

@Component({
    selector: "email-template-list",
    templateUrl: "../template/email-template-list.html",
    styleUrls: [],
    providers: []
})
export class EmailTemplateListComponent implements OnInit {
    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private dictPipe: dictPipe,
    ) {
    }

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("notice")
    notice: ConfirmComponent;

    
    ngOnInit() {
    }

    //Menu: 查看Email模板的详细信息
    emailTemplateDetailsPage() {
        /*
        let pn = this.getSelected();
        if(pn){
            this.selectedphynet = pn;
            this.router.navigate([`phy-mng/phy-net/phy-net-details`, {"pn_id": this.selectedphynet.id}]);
        }
        */
        this.router.navigate([`sys-setup/email-mng/email-template-details`]);
    }

    //Menu: 返回Email设置页面
    emailMngPage() {
        this.router.navigate([`sys-setup/email-mng/email-list`]);
    }

    //选择行
    selectItem(index:number): void {
        //this.phynets.map(n=> {n.checked = false;});
        //this.phynets[index].checked = true;
        //console.log(this.phynets, "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        //this.phynets.map(n=> {n.checked = false;});
    }

    getSelected() {
        /*
        let item = this.phynets.find((n) => n.checked) as PhyNetListModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return null;
        }
        */
    }

}
