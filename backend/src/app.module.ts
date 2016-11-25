import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {CoreModule} from './architecture/core/core.module';
import {CommonComponentModule} from './architecture/components/common.module';
import {MenuComponent} from './architecture/components/menu/component/menu.component';
import {SiteComponent} from './architecture/components/site/component/site.component';


// pf-mng
import {PfMngModule} from './module/pf-mng/pf-mng.module';

// ent-mng
import {EntMngModule} from './module/ent-mng/ent-mng.module';

//pf-mng2

import {PfMngModule2} from './module/pf-mng2/pf-mng2.module';
//prod-mng
import {MainProdMngModule} from './module/prod-mng/main-prod-mng.module';

import {EntProdMngModule} from './module/ent-mng/ent-prod-mng/ent-prod-mng.module';
//user-center
import {UserCenterModule } from './module/user-center/user-center.module';

//op-center
import {OrderMngModule } from './module/op-center/order-mng/order-mng.module';

//check center
import {CheckCenterModule } from './module/check-center/check-center.module';

//net-mng
import { NetMngModule } from './module/net-mng/net-mng.module';

//host-mng
import { HostMngModule } from './module/host-mng/host-mng.module';

import {routing} from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        CommonComponentModule,
        PfMngModule,
        EntMngModule,
        PfMngModule2,
        MainProdMngModule,
        UserCenterModule,
        EntProdMngModule,
        FormsModule,
        OrderMngModule,
        CheckCenterModule,
        NetMngModule,
        HostMngModule,
        routing
    ],
    declarations: [MenuComponent, SiteComponent],
    providers: [],
    bootstrap: [SiteComponent]
})

export class AppModule {
}
