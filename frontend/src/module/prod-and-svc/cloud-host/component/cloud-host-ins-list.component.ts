import { Component, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Instance, InstanceAction } from '../model/instance';
import { InstanceListService } from '../service/cloud-host-ins-list.service';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

@Component({
  // moduleId: module.id,
  selector: 'fc-cloud-host-ins-list',
  templateUrl: '../template/cloud-host-ins-list.component.html',
  styleUrls: [
    '../style/cloud-host-ins-list.component.css'
  ],
  providers: []
})
export class InstanceListComponent implements OnInit {
  
  @ViewChild('confirm')
  private confirmDialog: ConfirmComponent;

  @ViewChild('notice')
  private noticeDialog: NoticeComponent;
  
  pageSize: number;
  totalPages: number;
  currPage: number;

  instances: Instance[];
  allChecked: boolean = false;
  filterText: string = '';
  
  modalTitle: string = '';
  modalMessage: string = '';
  modalOKTitle: string = '';

  constructor(
    private instanceService: InstanceListService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageSize = 10;
    this.totalPages = 0;
    this.currPage = 1;

    this.allChecked = false;
    this.layoutService.hide();

    this.instances = new Array<Instance>();

    this.getInstances(this.currPage, this.pageSize);
  }
  getInstances(page: number, size: number) {
      this.layoutService.show();

      this.instanceService
          .getInstances(page, size)
          .then(ret => {
              if (!ret) {
                  this.showNotice('数据获取失败', '实例数据获取失败。');
              } else {
                  this.fmtInstancesData(ret);
              }
              this.layoutService.hide();
          })
          .catch(error => {
              this.showNotice('数据获取失败', '实例数据获取失败。');
              this.layoutService.hide();
          });
  }

  fmtInstancesData(ret: any) {
    if (ret && ret.resultContent) {
      this.totalPages = ret.pageInfo.totalPage;
      this.instances = ret.resultContent;

      this.instances.forEach((element, index) => {
        this.instances[index].checked = false;
      });
    }
  }

  changePage(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.totalPages ? this.totalPages : page;

    if (this.currPage == page) {
      return;
    }

    this.currPage = page;
    this.getInstances(this.currPage, this.pageSize);
  }

  check(event: any) { 
    event.stopPropagation();
  }

  checkAll() {
    this.allChecked = !this.allChecked;
    this.instances.forEach((element, index) => {
      this.instances[index].checked = this.allChecked;
    });
  }

  getAllSelectedData(): Instance[] {
    let ids = [];

    this.instances.forEach((element, index) => {
      if (element.checked == true) {
        ids.push(element);
      }
    });

    return ids;
  }

  updateInstanceStatus(instance: Instance, type: string, event: any) {
    event.stopPropagation();

    let actionType = '';
    let instanceAction = new InstanceAction();

    switch (type) {
      case 'pause':
        // 暂停
        actionType = 'pause';
        break;
      case 'suspend':
        // 挂起
        actionType = 'suspend';
        break;
      case 'resume':
        // 恢复
        actionType = 'resume';
        break;
      case 'softReboot':
        // 软重启
        actionType = 'softReboot';
        break;
      case 'hardReboot':
        // 硬重启
        actionType = 'hardReboot';
        break;
      default:
        // 直接返回
        return;
    }

    if (!instance) {
      let selectedData = this.getAllSelectedData();
      if (selectedData.length < 1) {
        this.showNotice('警告', '请选择一个服务目录');
        return;
      } else if (selectedData.length > 1) {
        this.showNotice('警告', '请只选择一个服务目录');
        return;
      } else {
        instance = selectedData[0];
      }
    }

    instanceAction.actions = actionType;
    instanceAction.id = instance.itemId;
    instanceAction.uid = instance.uuid;
    
    this.layoutService.show();

    this.instanceService
        .updateInstanceStatus(instanceAction)
        .then(ret => {
            if (!ret) {
                this.showNotice('更新失败', '实例状态更新失败。');
            } else {
                this.getInstances(this.currPage, this.pageSize);
            }
            this.layoutService.hide();
        })
        .catch(error => {
            this.showNotice('更新失败', '实例状态更新失败');
            this.layoutService.hide();
        });
    
  }


  showNotice(title: string, msg: string) {
    this.modalTitle = title;
    this.modalMessage = msg;
    this.modalOKTitle = 'OK';

    this.noticeDialog.open();
  }

  modalAction(btnType: number) {
    if (btnType == 0) {
      this.noticeDialog.close();
      return;
    }
    
    this.noticeDialog.close()
    this.confirmDialog.close();
  }

  showDetail(instance: Instance) {
    // let params = {
    //    uuid: instance.uuid
    // };
    let link = ['/prod-and-svc/cloud-host/cloud-host-ins-detail', instance.uuid];

    this.router.navigate(link)
  }
}
