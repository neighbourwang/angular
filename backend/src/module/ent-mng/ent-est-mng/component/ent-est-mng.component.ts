import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';



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
      this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-01");
  }
}