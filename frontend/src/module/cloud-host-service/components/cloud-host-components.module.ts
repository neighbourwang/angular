import { NgModule } from '@angular/core';

import { CommonComponentModule, PipeModule } from '../../../architecture';

import { CartButtonComponent } from '../components/cart-button/cart-button.component';
import { HostReconfigComponent } from '../components/host-reconfig/host-reconfig.component';
import { DiskReconfigComponent } from '../components/disk-reconfig/disk-reconfig.component';
import { PlatformZoneComponent } from '../components/platform-zone/platform-zone.component';
import { orderCompleteComponent } from '../components/order-complete/order-complete.component';
import { UnsubscribeComponent } from '../components/unsubscribe/unsubscribe.component';
import { OpenConsoleComponent } from '../components/open-console/open-console.component';

import { PlatformZoneServiceList } from '../components/platform-zone/platform-zone.service'; 
import { HostReconfigService } from '../components/host-reconfig/host-reconfig.service'; 
import { DiskReconfigService } from '../components/disk-reconfig/disk-reconfig.service'; 
import { orderCompleteService } from '../components/order-complete/order-complete.service'; 
import { UnsubscribeService } from '../components/unsubscribe/unsubscribe.service'; 
import { OpenConsoleService } from '../components/open-console/open-console.service'; 

import { formatInfo } from '../components/order-complete/formatInfo'; 


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
        UnsubscribeComponent,
        OpenConsoleComponent,
        formatInfo
    ],
    exports: [
        CartButtonComponent,
        HostReconfigComponent,
        DiskReconfigComponent,
        PlatformZoneComponent,
        orderCompleteComponent,
        OpenConsoleComponent,
        UnsubscribeComponent
    ],
    providers: [
        PlatformZoneServiceList,
        HostReconfigService,
        DiskReconfigService,
        orderCompleteService,
        UnsubscribeService,
        OpenConsoleService
    ]

})
export class CloudHostComponents { }
