import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnMngCreService } from '../service/pf-conn-mng-cre.service';

import { LayoutService } from '../../../core/service/layout.service';

import { Platform } from '../model/platform.model';

@Component({
  // moduleId: module.id,
  selector: 'fc-pf-conn-mng-cre',
  templateUrl: '../template/pf-conn-mng-cre.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnMngCreComponent implements OnInit {
    platforms: Array<Platform> = new Array<Platform>();

  constructor(
    private service: PfConnMngCreService,
    private layoutService: LayoutService,
    private router: Router
  ) {
  }

  ngOnInit() {
      this.service.init().then(promise => {
          this.service.getPlatforms().then(
              response => {
                  if (!response) {
                      this.showError("Error", "API call failed");
                      return;
                  }

                  let resultCode = response["resultCode"];

                  if (100 == resultCode) {
                      let resultContent = response.resultContent;

                      if (!resultContent) {
                          this.showError("Error", "API call failed()");

                          return;
                      }

                      for (let content of resultContent) {
                          let platform = new Platform();

                          platform.id = content.id;
                          platform.name = content.name;
                          platform.platformType = content.platformType;
                          platform.platformTypeName = content.platformTypeName;
                          platform.uri = content.uri;
                          platform.userName = content.userName;
                          platform.passwd = content.passwd;
                          platform.description = content.description;
                          platform.version = content.version;

                          this.platforms.push(platform);
                      }
                  }
              }
          ).catch(this.onRejected);
      });
  }

  showError(title: string, msg: string) {
    alert(msg);
  }

  onRejected(reason: any) {
      alert(reason);
  }

  creation() {
      //this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-cre-step-01");
  }
}