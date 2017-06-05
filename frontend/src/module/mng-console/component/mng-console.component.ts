import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../architecture';
import { MngConsoleService } from '../service/mng-console.service';
import { EnterpriseQuotaDetailResp, OrganizationExtItem } from '../model/enterpriseQuotaDetailResp';



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

    eplist: any = {};
    epcpu: any = [{ data: [0, 10] }];
    epmem: any = [{ data: [0, 10] }];
    epdisk: any = [{ data: [0, 10] }];
    ephost: any = [{ data: [0, 10] }];
    epsnapshot: any = [{ data: [0, 10] }];
    epimage: any = [{ data: [0, 10] }];
    epfloatIp: any = [{ data: [0, 10] }];

    ci: OrganizationExtItem;
    diskTotal: number = 0;

    quotalist: any = {};

    userInfo: any = {};

    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: MngConsoleService
    ) { }

    ngOnInit() {
        window.scrollTo(0,0)

        this.userInfo = this.service.getUserInfo;
        this.setEntResoure();
        this.quotaEntResoure();
        this.setConsoleInfo();
        this.getMgmtGraph();
    }


    public cpuChartLabels: string[] = [];
    public cpuChartData: number[] = [];
    public cpuNum = 0;
    public memChartLabels: string[] = [];
    public memChartData: number[] = [];
    public memNum = 0;

    public cpuTop = []; 
    public diskTop = []; 
    public memTop = [];

    public quotaOptions = {
        legend: { display: false },
        tooltips: { enabled: false },
        cutoutPercentage: 82
    }
    public setEntResoure(): void {   //设置资源的利用率
        const bgc = ["#E7E9ED", "#00CC99"];
        const bgw = [0, 0];
        this.service.getQuotaResoure().then(res => {

            for (let l in res) res[l] = res[l] === null ? 0 : res[l];
            this.eplist = res;
            const list = this.eplist;

            this.epcpu = [{ data: [list.usedCpu, list.vcpu - list.usedCpu], backgroundColor: bgc, borderWidth: bgw }];
            this.epmem = [{ data: [list.usedMem, list.mem - list.usedMem], backgroundColor: bgc, borderWidth: bgw }];
            this.epdisk = [{ data: [list.usedStorage, list.storage - list.usedStorage], backgroundColor: bgc, borderWidth: bgw }];
            this.ephost = [{ data: [list.usedPhysical, list.physical - list.usedPhysical], backgroundColor: bgc, borderWidth: bgw }];
            this.epsnapshot = [{ data: [list.usedSnapshot, list.snapshot - list.usedSnapshot], backgroundColor: bgc, borderWidth: bgw }];
            this.epimage = [{ data: [list.usedImage, list.image - list.usedImage], backgroundColor: bgc, borderWidth: bgw }];
            this.epfloatIp = [{ data: [list.usedIpaddress, list.ipaddress - list.usedIpaddress], backgroundColor: bgc, borderWidth: bgw }];
        })
    }

    public quotaEntResoure(): void {
        this.service.getQuotaResoure().then(res => {
            for (let l in res) res[l] = res[l] === null ? 0 : res[l];
            this.quotalist = res;
        });
    }

    public setConsoleInfo(): void {
        this.service.getConsoleInfo().then(res => {
            console.log(res)
            this.ci = res;
        })
    }

    private getMgmtGraph() {
        this.service.getMgmtGraph().then(res => {
            let { cpu, cpuTop, diskTop, mem, memTop } = res
            let convertToArr = (obj) => {
                let arr = []
                for (let key in obj) {
                    if(obj[key]) arr.push(obj[key])
                }
                return arr
            }
            
            this.cpuChartLabels = ["<30%", "30%-70%", ">70%"];
            this.cpuChartData = [cpu.level1, cpu.level2, cpu.level3 ];
            this.cpuNum = cpu.num
            
            this.memChartLabels = ["<30%", "30%-70%", ">70%"];
            this.memChartData = [mem.level1, mem.level2, mem.level3 ];
            this.memNum = mem.num

            this.cpuTop = convertToArr(cpuTop);
            this.diskTop = convertToArr(diskTop) ; 
            this.memTop = convertToArr(memTop) ;
            console.log(this.cpuTop, this.diskTop)
        })
    }


}