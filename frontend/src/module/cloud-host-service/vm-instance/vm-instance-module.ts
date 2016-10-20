import { NgModule } from '@angular/core';

// common
import { CommonComponentModule } from '../../../architecture';

//routing

import { VmInstanceRouting } from './vm-instance-routing';

//component
import { CrCloudHostComponent } from './component/cr-cloud-host.component';

import { IndexCloudHostComponent } from './component/index-cloud-host.component';

@NgModule({
    imports: [
        VmInstanceRouting,
        CommonComponentModule
    ],
    declarations: [
        CrCloudHostComponent,
        IndexCloudHostComponent
    ],
    exports: [
    ],
    providers: [
    ]

})
export class VmInstanceModule { }
