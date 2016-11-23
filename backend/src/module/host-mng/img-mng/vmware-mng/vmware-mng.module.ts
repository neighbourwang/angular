import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../../architecture';

// Routing
import { VmwareMngRouting } from './vmware-mng.routing';

//Components
import { VmwareImgListComponent } from './component/vmware-img-list.component';
import { VmwareImgSyncComponent } from './component/vmware-img-sync.component';

//Service
import { VmwareImgListService } from './service/vmware-img-list.service';
import { VmwareEntListService } from './service/enterprise-list.service';

@NgModule({
    imports: [
        CommonComponentModule,
        VmwareMngRouting
    ],
    declarations: [
        VmwareImgListComponent,
        VmwareImgSyncComponent
    ],
    exports: [
        VmwareImgListComponent,
        VmwareImgSyncComponent
    ],
    providers: [
        VmwareImgListService,
        VmwareEntListService
    ]

})
export class VmareMngModule { }
