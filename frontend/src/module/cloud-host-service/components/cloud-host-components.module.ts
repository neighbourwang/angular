import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';

import { CartButtonComponent } from '../components/cart-button/cart-button.component';
import { HostReconfigComponent } from '../components/host-reconfig/host-reconfig.component';
import { DiskReconfigComponent } from '../components/disk-reconfig/disk-reconfig.component';
import { PlatformZoneComponent } from '../components/platform-zone/platform-zone.component';

import { PlatformZoneServiceList } from '../components/platform-zone/platform-zone.service'; 
import { HostReconfigService } from '../components/host-reconfig/host-reconfig.service'; 
import { DiskReconfigService } from '../components/disk-reconfig/disk-reconfig.service'; 

@NgModule({
    imports: [
        CommonComponentModule
    ],
    declarations: [
        CartButtonComponent,
        HostReconfigComponent,
        DiskReconfigComponent,
        PlatformZoneComponent
    ],
    exports: [
        CartButtonComponent,
        HostReconfigComponent,
        DiskReconfigComponent,
        PlatformZoneComponent
    ],
    providers: [
        PlatformZoneServiceList,
        HostReconfigService,
        DiskReconfigService
    ]

})
export class CloudHostComponents { }
