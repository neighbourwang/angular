import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent } from '../../../../architecture';
import { EntEstItem } from '../model/ent-est-item';
import { EntEstCreService } from '../service/ent-est-cre.service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-mng.component.html',
  styleUrls: [],
  providers: [EntEstCreService]
}) 
export class EntEstMngComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;

  private entEstItems: EntEstItem[] = [];    
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService
  ) {}

  ngOnInit() {
    this.service.loadEntEstItems(this.entEstItems, this.showError, this);      
  }

  showError(msg:any) {
    this.notice.open(msg.title, msg.desc);
  }

  onRejected(reason: any) {
      alert(reason);
  }

  create() {
    this.service.clearCache();
    this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-01");
  }
}