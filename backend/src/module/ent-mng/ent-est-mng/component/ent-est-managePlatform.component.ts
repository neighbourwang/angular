import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent, SystemDictionaryService, SystemDictionary  } from '../../../../architecture';
import { EntProdItem, EntEst} from '../model';

import { EntEstCreService, Paging } from '../service/ent-est-cre.service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-managePlatform',
  templateUrl: '../template/ent-est-managePlatform.component.html',
  styleUrls: ['../style/ent-est-managePlatform.less'],
  providers: [EntEstCreService]
}) 
export class EntEstManagePlatformComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: EntEstCreService,
    private sysDicService: SystemDictionaryService
  ) {}

  ngOnInit() {

  }
return(){
    this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
  }


}