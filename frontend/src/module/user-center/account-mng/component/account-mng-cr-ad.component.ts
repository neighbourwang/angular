import { Component,OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

@Component({
  selector: 'account-mng-cr-ad',
  templateUrl: '../template/account-mng-cr-ad.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngCrAdComponent implements OnInit {
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  @Input()
  isEdit : boolean;

  save () : Promise<any>{
    console.log(this.isEdit);
    if(this.isEdit){
      console.log('edit');
      return Promise.resolve('edit');
    }else{
      console.log('create')
      return Promise.resolve('create');
    }
  }


  
}
