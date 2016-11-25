import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../../architecture';

// Routing
import { VmwareMngRouting } from './vmware-mng.routing';

//Components
import { VmwareImgListComponent } from './component/vmware-img-list.component';
import { VmwareImgSyncComponent } from './component/vmware-img-sync.component';
import { VmwareImgEntSetupComponent } from './component/vmware-img-ent-setup.component';

//Service
import { VmwareImgListService } from './service/vmware-img-list.service';
import { VmwareEntListService } from './service/enterprise-list.service';
import { VmwareImgEntSetupService } from './service/vmware-img-ent-setup.service';


@NgModule({
    imports: [
        CommonComponentModule,
        VmwareMngRouting
    ],
    declarations: [
        VmwareImgListComponent,
        VmwareImgSyncComponent,
        VmwareImgEntSetupComponent
    ],
    exports: [
        VmwareImgListComponent,
        VmwareImgSyncComponent,
        VmwareImgEntSetupComponent
    ],
    providers: [
        VmwareImgListService,
        VmwareEntListService,
        VmwareImgEntSetupService
    ]

})
export class VmareMngModule { }
