import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {CoreModule} from './architecture/core/core.module';
import {CommonComponentModule} from './architecture/components/common.module';
import {MenuComponent} from './architecture/components/menu/component/menu.component';
import {SiteComponent} from './architecture/components/site/component/site.component';
import { SiteService } from './architecture/components/site/service/site.service';
import { MenuService } from './architecture/components/menu/service/menu.service';


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

//cost-set
import {CostSetModule } from './module/op-center/cost-set/cost-set.module';

//check center
import {CheckCenterModule } from './module/check-center/check-center.module';

//net-mng
import { NetMngModule } from './module/net-mng/net-mng.module';

//phy-pool
import { PhyMngModule } from './module/phy-mng/phy-mng.module';

//host-mng
import { HostMngModule } from './module/host-mng/host-mng.module';

//mtc-center
import { MtcCenterModule } from './module/mtc-center/mtc-center.module';

//sys-setup
import { SysSetupModule } from './module/sys-setup/sys-setup.module';

import {routing} from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        CommonComponentModule,
        EntMngModule,
        PfMngModule2,
        MainProdMngModule,
        UserCenterModule,
        EntProdMngModule,
        FormsModule,
        OrderMngModule,
        CostSetModule,
        CheckCenterModule,
        NetMngModule,
        HostMngModule,
        PhyMngModule,
        MtcCenterModule,
        SysSetupModule,
        routing
    ],
    declarations: [MenuComponent, SiteComponent],
    providers: [SiteService, MenuService],
    bootstrap: [SiteComponent]
})

export class AppModule {
}
