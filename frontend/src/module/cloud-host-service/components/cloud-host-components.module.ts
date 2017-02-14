import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';

import { CartButtonComponent } from '../components/cart-button/cart-button.component';
import { HostReconfigComponent } from '../components/host-reconfig/host-reconfig.component';
import { PlatformZoneComponent } from '../components/platform-zone/platform-zone.component';
import { PlatformZoneServiceList } from '../components/platform-zone/platform-zone.service'; 

@NgModule({
    imports: [
        CommonComponentModule
    ],
    declarations: [
        CartButtonComponent,
        HostReconfigComponent,
        PlatformZoneComponent
    ],
    exports: [
        CartButtonComponent,
        HostReconfigComponent,
        PlatformZoneComponent
    ],
    providers: [
        PlatformZoneServiceList
    ]

})
export class CloudHostComponents { }
