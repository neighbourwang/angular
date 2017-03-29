import { NgModule } from '@angular/core';

import { CommonComponentModule, PipeModule } from '../../../architecture';

import { CartButtonComponent } from '../components/cart-button/cart-button.component';
import { HostReconfigComponent } from '../components/host-reconfig/host-reconfig.component';
import { DiskReconfigComponent } from '../components/disk-reconfig/disk-reconfig.component';
import { PlatformZoneComponent } from '../components/platform-zone/platform-zone.component';
import { orderCompleteComponent } from '../components/order-complete/order-complete.component';
import { cartCompleteComponent } from '../components/cart-complete/cart-complete.component';
import { UnsubscribeComponent } from '../components/unsubscribe/unsubscribe.component';
import { OpenConsoleComponent } from '../components/open-console/open-console.component';

import { PlatformZoneServiceList } from '../components/platform-zone/platform-zone.service'; 
import { HostReconfigService } from '../components/host-reconfig/host-reconfig.service'; 
import { DiskReconfigService } from '../components/disk-reconfig/disk-reconfig.service'; 
import { orderCompleteService } from '../components/order-complete/order-complete.service'; 
import { cartCompleteService } from '../components/cart-complete/cart-complete.service'; 
import { UnsubscribeService } from '../components/unsubscribe/unsubscribe.service'; 
import { OpenConsoleService } from '../components/open-console/open-console.service'; 

import { formatInfo } from '../components/order-complete/formatInfo'; 

// import { OrderMngCancelComponent } from '../../op-center/order-mng/component/order-mng-cancel.component';


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        CartButtonComponent,
        HostReconfigComponent,
        DiskReconfigComponent,
        PlatformZoneComponent,
        orderCompleteComponent,
        cartCompleteComponent,
        UnsubscribeComponent,
        OpenConsoleComponent,
        formatInfo,
        // OrderMngCancelComponent
    ],
    exports: [
        CartButtonComponent,
        HostReconfigComponent,
        DiskReconfigComponent,
        PlatformZoneComponent,
        orderCompleteComponent,
        cartCompleteComponent,
        OpenConsoleComponent,
        UnsubscribeComponent
    ],
    providers: [
        PlatformZoneServiceList,
        HostReconfigService,
        DiskReconfigService,
        orderCompleteService,
        cartCompleteService,
        UnsubscribeService,
        OpenConsoleService
    ]

})
export class CloudHostComponents { }
