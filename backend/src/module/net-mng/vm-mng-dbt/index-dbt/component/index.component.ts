import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent, ValidationService, PopupComponent, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

import { DCModel } from "../model/dc.model";
import { switchMode} from "../model/switch.model"
import { port } from '../model/port.model';
import { port_mock } from '../model/port.mock.model';
import { VmDisIndexService } from '../service/index.service';

@Component({
    selector: "index",
    templateUrl: "../template/vmware-distributed.html",
    styleUrls: [],
    providers: []
}
)
export class VmDisIndexComponent implements OnInit {

    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private service: VmDisIndexService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    

    noticeTitle = "";
    noticeMsg = "";

    defaultDc: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDc; //��ǰѡ�е�DC
    defaultSwitch: switchMode = new switchMode();
    selectSwitch = this.defaultSwitch;//��ǰѡ�еĿ�����

    

    dcList: Array<DCModel>;

    allports: Array<port>;
    filterports: Array<port>;


    statusDic: Array<SystemDictionary>;//״̬

   

    ngOnInit() {
        this.getDcList();
       this.getData();
        //this.dicService.getItems("PORTGROUP", "STATUS")
        //    .then(
        //    dic => {
        //       this.statusDic = dic;
        //        this.getData();
        //    });
    }



    getDcList() {
        this.layoutService.show();
        this.service.getDCList()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.dcList = response["resultContent"];
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getData() {
        this.layoutService.show();
        this.service.getData()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.allports = response["resultContent"];
                    //this.filter();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //filter() {
    //    this.filterports = this.allports.filter((p) => {
    //        return (this.selectedDC == this.defaultDc || this.selectedDC.dcId === p.dcId) &&
    //            (this.selectport === this.defaultport || this.selectport.portId === p.portId);
    //    });
    //}

 

    //���ñ�׼����
    //netEnable() {
    //    const selectedPort = this.filterports.find((port) => { return port.selected });
    //    if (!selectedPort) {
    //        this.showAlert(`����ѡ����Ҫ���õı�׼���磡`);
    //        return;
    //    }
    //    this.noticeTitle = "��������";

    //    if (selectedPort.status == "1") {
    //        this.showAlert("�������Ѵ�������״̬");
    //        return;
    //    }
    //    this.noticeMsg = `��ѡ������ '${selectedPort.portDisplayName}'�˿��飬��˿�������Ϊ${selectedPort.portGroupName}' �� 
    //                    ��ȷ�ϣ����ȷ�ϣ��û����ܹ��ڶ�����ѡ������硣`;
    //    this.confirm.ccf = () => { };
    //    this.confirm.cof = () => {
    //        this.layoutService.show();
    //        this.service.netEnable(selectedPort.id)
    //            .then(
    //            response => {
    //                this.layoutService.hide();
    //                if (response && 100 == response["resultCode"]) {
    //                    this.showAlert("���óɹ�");
    //                    this.getData();
    //                } else {
    //                    alert("Res sync error");
    //                }
    //            }
    //            )
    //            .catch((e) => this.onRejected(e));

    //    };
    //    this.confirm.open();
    //}


    //��������
    //netDisable() {
    //    const selectedPort = this.filterports.find((port) => { return port.selected });
    //    if (!selectedPort) {
    //        this.showAlert(`����ѡ����Ҫ���õı�׼���磡`);
    //        return;
    //    }
    //    this.noticeTitle = "��������";

    //    if (selectedPort.status == "2") {
    //        this.showAlert("�������Ѵ��ڽ���״̬");
    //        return;
    //    }
    //    this.noticeMsg = `��ѡ����� '${selectedPort.portDisplayName}'�˿��飬��˿�������Ϊ${selectedPort.portGroupName}' �� 
    //                    ��ȷ�ϣ����ȷ�ϣ��û������ܹ��ڶ�����ѡ������硣`;
    //    this.confirm.ccf = () => { };
    //    this.confirm.cof = () => {
    //        this.layoutService.show();
    //        this.service.netDisable(selectedPort.id)
    //            .then(
    //            response => {
    //                this.layoutService.hide();
    //                if (response && 100 == response["resultCode"]) {
    //                    this.showAlert("���óɹ�");
    //                    this.getData();
    //                } else {
    //                    alert("Res sync error");
    //                }
    //            }
    //            )
    //            .catch((e) => this.onRejected(e));

    //    };
    //    this.confirm.open();
    //}

 

    //����value��ȡ�ֵ��txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        if (!$.isArray(dic)) {
            return value;
        }
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

    }

    //gotoPortMng() {
    //    this.router.navigate([`net-mng/vm-mng/port-mng`]);
    //}

    //gotoIpMng() {
    //    const selectedPort = this.filterports.find((port) => { return port.selected });
    //    if (selectedPort) {
    //        this.router.navigate([
    //                `net-mng/vm-mng/ip-mng-list`,
    //                {
    //                    "dc_name": selectedPort.dcName,
    //                    "cls_name": selectedPort.portName
    //                }
    //            ]
    //        );
    //    } else {
    //        this.router.navigate([
    //            `net-mng/vm-mng/ip-mng-list`]
    //        );
    //    }
    //}

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("��ȡ����ʧ�ܣ�");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "��ʾ";
        this.noticeMsg = msg;
        this.notice.open();
    }
}