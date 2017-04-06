import { NgModule } from '@angular/core';

import { CommonComponentModule, PipeModule } from '../../../architecture';

import { CartButtonComponent } from '../components/cart-button/cart-button.component';
import { HostReconfigComponent } from '../components/host-reconfig/host-reconfig.component';
import { DiskReconfigComponent } from '../components/disk-reconfig/disk-reconfig.component';
// import { PlatformZoneComponent } from '../components/platform-zone/platform-zone.component';
// import { orderCompleteComponent } from '../components/order-complete/order-complete.component';
import { cartCompleteComponent } from '../components/cart-complete/cart-complete.component';
// import { UnsubscribeComponent } from '../components/unsubscribe/unsubscribe.component';
import { OpenConsoleComponent } from '../components/open-console/open-console.component';
import { CustomOsComponent } from '../components/custom-os/custom-os.component';

// import { PlatformZoneServiceList } from '../components/platform-zone/platform-zone.service'; 
import { HostReconfigService } from '../components/host-reconfig/host-reconfig.service'; 
import { DiskReconfigService } from '../components/disk-reconfig/disk-reconfig.service'; 
// import { orderCompleteService } from '../components/order-complete/order-complete.service'; 
import { cartCompleteService } from '../components/cart-complete/cart-complete.service'; 
// import { UnsubscribeService } from '../components/unsubscribe/unsubscribe.service'; 
import { OpenConsoleService } from '../components/open-console/open-console.service'; 
import { CustomOsService } from '../components/custom-os/custom-os.service'; 

// import { formatInfo } from '../components/order-complete/formatInfo'; 

// import { OrderMngCancelComponent, VmViewComponent, DiskViewComponent } from '../../op-center/order-mng/component/';
import { OrderCancleModule } from '../../op-center/components/order-cancel/order-cancel.module';
import { OrderCompleteModule } from './order-complete/order-complete.module';
import { UnsubscribeModule } from './unsubscribe/unsubscribe.module';
import { PlatformZoneModule } from './platform-zone/platform-zone.module';



@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        OrderCancleModule,
        OrderCompleteModule,
    ],
    declarations: [
        CartButtonComponent,
        HostReconfigComponent,
        DiskReconfigComponent,
        // PlatformZoneComponent,
        // orderCompleteComponent,
        cartCompleteComponent,
        // UnsubscribeComponent,
        OpenConsoleComponent,
        // VmViewComponent,
        // DiskViewComponent,
        // formatInfo,
        CustomOsComponent
        // OrderMngCancelComponent
    ],
    exports: [
        CartButtonComponent,
        HostReconfigComponent,
        DiskReconfigComponent,
        // PlatformZoneComponent,
        // orderCompleteComponent,
        cartCompleteComponent,
        OpenConsoleComponent,
        // UnsubscribeComponent,
        CustomOsComponent,
        UnsubscribeModule,
        OrderCompleteModule,
        PlatformZoneModule
    ],
    providers: [
        // PlatformZoneServiceList,
        HostReconfigService,
        DiskReconfigService,
        // orderCompleteService,
        cartCompleteService,
        // UnsubscribeService,
        OpenConsoleService,
        CustomOsService
    ]

})
export class CloudHostComponents { }
