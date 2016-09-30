import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { CommonComponentModule } from './common_components/common.module';
import { MenuComponent } from './common_components/menu/component/menu.component';
import { SiteComponent } from './common_components/site/component/site.component';

// pf-mng
import { PfMngModule } from './pf-mng/pf-mng.module';

// ent-mng
import { EntMngModule } from './ent-mng/ent-mng.module';

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    CommonComponentModule,
    PfMngModule,
    EntMngModule,
    routing
  ],
  declarations: [ MenuComponent, SiteComponent ],
  providers: [],
  bootstrap: [ SiteComponent ]
})

export class AppModule { }
