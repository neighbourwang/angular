import { NgModule } from '@angular/core';

import { CommonComponentModule } from '../../../architecture';

import { CartButtonComponent } from '../components/cart-button/cart-button.component';
import { PlatformZoneComponent } from '../components/platform-zone/platform-zone.component';
import { PlatformZoneServiceList } from '../components/platform-zone/platform-zone.service'; 

@NgModule({
    imports: [
        CommonComponentModule
    ],
    declarations: [
        CartButtonComponent,
        PlatformZoneComponent
    ],
    exports: [
        CartButtonComponent,
        PlatformZoneComponent
    ],
    providers: [
        PlatformZoneServiceList
    ]

})
export class CloudHostComponents { }
