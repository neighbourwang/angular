import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';
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
  private entEstItems: EntEstItem[] = [];    
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService
  ) {}

  ngOnInit() {
    this.service.loadEntEstItems(this.entEstItems, null);      
  }

  showError(title: string, msg: string) {
    alert(msg);
  }

  onRejected(reason: any) {
      alert(reason);
  }

  create() {
    this.service.clearCache();
      this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-01");
  }
}