import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { CommonComponentModule } from './common_components/common.module';

import { SiteComponent } from './common_components/site/component/site.component';
import { FrontendModule } from './frontend/frontend.module';
// import { FrontendRouting } from './frontend/frontend.routing';

import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    CommonComponentModule,

    FrontendModule,
    // CloudHostModule,

    // FrontendRouting,

    routing
  ],
  declarations: [ SiteComponent ],
  providers: [],
  bootstrap: [ SiteComponent ]
})
export class AppModule { }
