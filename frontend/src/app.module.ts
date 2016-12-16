import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './architecture/core/core.module';
import { CommonComponentModule } from './architecture/components/common.module';
import { MenuComponent } from './architecture/components/menu/component/menu.component';
import { SiteComponent } from './architecture/components/site/component/site.component';
import { SiteService } from './architecture/components/site/service/site.service';

//mng-console
import {MngConsoleModule} from './module/mng-console/mng-console.module';
//vm-instance
import { CloudHostService } from './module/cloud-host-service/cloud-host-service.module';
//用户中心
import { UserCenterModule } from './module/user-center/user-center.module';
//费用中心
import { OrderMngModule } from './module/op-center/order-mng/order-mng.module';
//镜像管理
import { ImgMngModule } from './module/image-mng/image-mng.module';

//审批中心
import { CheckCenterModule } from './module/check-center/check-center.module';


import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        CommonComponentModule,
        CloudHostService,
        UserCenterModule,
        OrderMngModule,
        CheckCenterModule,
        ImgMngModule,
        MngConsoleModule,
        routing
    ],
    declarations: [MenuComponent, SiteComponent],
    providers: [ SiteService ],
    bootstrap: [SiteComponent]
})

export class AppModule { }
