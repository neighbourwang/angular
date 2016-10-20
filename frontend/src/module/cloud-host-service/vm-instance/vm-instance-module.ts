import { NgModule } from '@angular/core';

// common
import { CommonComponentModule } from '../../../architecture';

//routing

import { VmInstanceRouting } from './vm-instance-routing';

//component
import { CrCloudHostComponent } from './component/cr-cloud-host.component';

import { IndexCloudHostComponent } from './component/index-cloud-host.component';

//service
import { IndexCloudHostService } from './service/index-cloud-host.service'; 


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
        IndexCloudHostService
    ]

})
export class VmInstanceModule { }
