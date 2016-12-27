import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../architecture';
import { MngConsoleService } from '../service/mng-console.service';



@Component({
    selector: 'cloud-host-detail',
    templateUrl: '../template/mng-console.html',
    styleUrls: ['../style/mng-console.less'],
})

export class MngConsoleComponent implements OnInit {

    @ViewChild('confirm')
    private confirmDialog: ConfirmComponent;

    @ViewChild('notice')
    private noticeDialog: NoticeComponent;

    @ViewChild('platformZone') platformZone;

    eplist : any = {};
    epcpu: any = [{ data: [0,10]}];
    epmem: any = [{ data: [0,10]}];
    epdisk: any = [{ data: [0,10]}];
    ephost: any = [{ data: [0,10]}];
    epsnapshot: any = [{ data: [0,10]}];
    epimage: any = [{ data: [0,10]}];
    epfloatIp: any = [{ data: [0,10]}];

    vmTotal : number = 0;
    diskTotal : number = 0;

    quotalist : any = {};

    userInfo : any = {};

    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: MngConsoleService 
    ) {}

    ngOnInit() {
        this.userInfo = this.service.getUserInfo;
        this.setEntResoure();
        this.quotaEntResoure();
        this.setHostLength();
        this.setDiskLength();
    }

    public quotaOptions = {
                legend: { display: false },
                tooltips: {  enabled: false },
                cutoutPercentage: 82
            }
    public setEntResoure():void {   //设置资源的利用率
        const bgc = [ "#E7E9ED", "#00CC99" ];
        const bgw = [  0,0  ];
        this.service.getQuotaResoure().then(res => {
            console.log(res,123123123)
            if(!res.length) return;
            this.eplist = res[0];
            const list = this.eplist;

            this.epcpu = [{ data: [ list.usedCpu, list.vcpu - list.usedCpu ], backgroundColor: bgc, borderWidth:bgw }];
            this.epmem = [{ data: [ list.usedMem, list.mem - list.usedMem ], backgroundColor: bgc, borderWidth:bgw }];
            this.epdisk = [{ data: [ list.usedStorage, list.storage - list.usedStorage ], backgroundColor: bgc, borderWidth:bgw }];
            this.ephost = [{ data: [ list.usedPhysical, list.physical - list.usedPhysical ], backgroundColor: bgc, borderWidth:bgw }];
            this.epsnapshot = [{ data: [ list.usedSnapshot, list.snapshot - list.usedSnapshot ], backgroundColor: bgc, borderWidth:bgw }];
            this.epimage = [{ data: [ list.usedImage, list.image - list.usedImage ], backgroundColor: bgc, borderWidth:bgw }];
            this.epfloatIp = [{ data: [ list.usedIpaddress, list.ipaddress - list.usedIpaddress ], backgroundColor: bgc, borderWidth:bgw }];
        })
    }

    public quotaEntResoure():void {
        this.service.getQuotaResoure().then(res => { 
            if(!res.length) return;
            this.quotalist = res[0];
        });
    }

    public setHostLength():void {
        this.service.getHostList({}).then(res => {
            this.vmTotal = res.length
        })
    }
    public setDiskLength():void {
        this.service.getHostList({}).then(res => {
            this.diskTotal = res.length
        })
    }

}