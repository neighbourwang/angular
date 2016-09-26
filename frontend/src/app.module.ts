import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { CommonComponentModule } from './common_components/common.module';
import { MenuComponent } from './common_components/menu/component/menu.component';
import { SiteComponent } from './common_components/site/component/site.component';

// prod_and_svc
import { ProdAndSvcModule } from './prod_and_svc/prod_and_svc.module';

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    CommonComponentModule,
    ProdAndSvcModule,
    routing
  ],
  declarations: [ MenuComponent, SiteComponent ],
  providers: [],
  bootstrap: [ SiteComponent ]
})

export class AppModule { }
