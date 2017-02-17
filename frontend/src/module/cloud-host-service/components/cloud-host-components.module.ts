import { NgModule } from '@angular/core';

import { CommonComponentModule, PipeModule } from '../../../architecture';

import { CartButtonComponent } from '../components/cart-button/cart-button.component';
import { HostReconfigComponent } from '../components/host-reconfig/host-reconfig.component';
import { DiskReconfigComponent } from '../components/disk-reconfig/disk-reconfig.component';
import { PlatformZoneComponent } from '../components/platform-zone/platform-zone.component';
import { orderCompleteComponent } from '../components/order-complete/order-complete.component';

import { PlatformZoneServiceList } from '../components/platform-zone/platform-zone.service'; 
import { HostReconfigService } from '../components/host-reconfig/host-reconfig.service'; 
import { DiskReconfigService } from '../components/disk-reconfig/disk-reconfig.service'; 
import { orderCompleteService } from '../components/order-complete/order-complete.service'; 

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
        formatInfo
    ],
    exports: [
        CartButtonComponent,
        HostReconfigComponent,
        DiskReconfigComponent,
        PlatformZoneComponent,
        orderCompleteComponent,
    ],
    providers: [
        PlatformZoneServiceList,
        HostReconfigService,
        DiskReconfigService,
        orderCompleteService,
    ]

})
export class CloudHostComponents { }
