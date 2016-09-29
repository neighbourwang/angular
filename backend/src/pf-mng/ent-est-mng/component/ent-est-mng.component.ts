import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../core/service/layout.service';



@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-mng.component.html',
  styleUrls: [],
  providers: []
}) 
export class EntEstMngComponent implements OnInit {
    
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
      
  }

  showError(title: string, msg: string) {
    alert(msg);
  }

  onRejected(reason: any) {
      alert(reason);
  }

  create() {
      this.router.navigateByUrl("pf-mng/ent-est-mng/ent-est-cre-step-01");
  }
}