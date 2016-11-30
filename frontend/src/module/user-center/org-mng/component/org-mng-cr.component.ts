import { Component,OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent,CountBarComponent} from '../../../../architecture';
//service
import { OrgMngService } from '../service/org-mng.service';
//model
import { Org ,Member ,Resource} from '../model/org-mng.org.model';

@Component({
  selector: 'org-mng-cr',
  templateUrl: '../template/org-mng-cr.component.html',
  styleUrls: [],
  providers: []
})
export class OrgMngCrComponent implements OnInit {
  
  constructor(
    private layoutService : LayoutService,
    private router : Router,
    private service : OrgMngService
  ) {}

  @Input() isEdit: boolean;

  org:Org;
  members:Array<Member>;
  ngOnInit() {
    //获取机构成员
    this.service.getNoMngUser(1,9999).then(
                    res => {
                        console.log('getNoMngUser',res); 
                        this.members=res.resultContent;                      
                    }
                ).catch(
                    err => {
                        console.error(err);
                    }
                )
    if(this.isEdit){
      console.log('edit 读取接口')
    }else{
      console.log('创建');
    }
  }
  //选择机构成员
  selectMember(member){
    console.log(member)
  }
  //保存 给父组件调用
  save (){
    console.log('save');
  }

   //同步countBar数据
    outputValue(e, arg) {
        console.log(arg);
        // this.prodDir.specification[arg] = e;
        // arg=e;
        console.log(e);
        // console.log(this.prodDir.specification.mem);
        // console.log(this.prodDir.specification.vcpu);          

    }
  
}
