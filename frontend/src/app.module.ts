import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './architecture/core/core.module';
import { CommonComponentModule } from './architecture/components/common.module';
import { PipeModule } from './architecture/pipe/pipe.module';

import { MenuComponent } from './architecture/components/menu/component/menu.component';
import { SiteComponent } from './architecture/components/site/component/site.component';

//vm-instance
import { CloudHostService } from './module/cloud-host-service/cloud-host-service.module';
//用户中心
import { UserCenterModule } from './module/user-center/user-center.module';
//费用中心
import { OrderMngModule } from './module/op-center/order-mng/order-mng.module';
//镜像管理
import { ImgMngModule } from './module/image-mng/image-mng.module';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        CommonComponentModule,
        CloudHostService,
        UserCenterModule,
        OrderMngModule,
        ImgMngModule,
        routing,
        //PipeModule
    ],
    declarations: [MenuComponent, SiteComponent],
    providers: [],
    bootstrap: [SiteComponent]
})

export class AppModule { }
