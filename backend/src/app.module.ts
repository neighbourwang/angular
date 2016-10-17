import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './architecture/core/core.module';
import { CommonComponentModule } from './architecture/components/common.module';
import { MenuComponent } from './architecture/components/menu/component/menu.component';
import { SiteComponent } from './architecture/components/site/component/site.component';


// pf-mng
import { PfMngModule } from './module/pf-mng/pf-mng.module';

// ent-mng
import { EntMngModule } from './module/ent-mng/ent-mng.module';

//pf-mng2

import { PfMngModule2 } from './module/pf-mng2/pf-mng2.module';

import { EntProdMngModule } from './module/ent-mng/ent-prod-mng/ent-prod-mng.module';

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    CommonComponentModule,
    PfMngModule,
    EntMngModule,
    PfMngModule2,
    EntProdMngModule,
    routing
  ],
  declarations: [ MenuComponent, SiteComponent ],
  providers: [],
  bootstrap: [ SiteComponent ]
})

export class AppModule { }
