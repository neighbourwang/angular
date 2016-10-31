import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule, CommonComponentModule } from './architecture';
import { MenuComponent } from './architecture/components/menu/component/menu.component';
import { SiteComponent } from './architecture/components/site/component/site.component';

//vm-instance
import { CloudHostService } from'./module/cloud-host-service/cloud-host-service.module';


import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    CommonComponentModule,
    CloudHostService,
    routing
  ],
  declarations: [ MenuComponent, SiteComponent ],
  providers: [],
  bootstrap: [ SiteComponent ]
})

export class AppModule { }
