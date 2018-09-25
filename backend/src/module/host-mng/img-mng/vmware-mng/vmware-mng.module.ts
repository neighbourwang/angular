import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule,PipeModule } from '../../../../architecture';

// Routing
import { VmwareMngRouting } from './vmware-mng.routing';

//Components
import { VmwareImgListComponent } from './component/vmware-img-list.component';
import { VmwareImgSyncComponent } from './component/vmware-img-sync.component';
import { VmwareImgEntSetupComponent } from './component/vmware-img-ent-setup.component';

//Service
import { VmwareImgListService } from './service/vmware-img-list.service';
import { VmwareImgEntSetupService } from './service/vmware-img-ent-setup.service';
import { VmwareImgSyncService } from './service/vmware-img-sync.service';
import { VmwareImgDictService } from './service/vmware-img-dict.service';



@NgModule({
    imports: [
        CommonComponentModule,
        VmwareMngRouting,
        PipeModule
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
        VmwareImgEntSetupService,
        VmwareImgSyncService,
        VmwareImgDictService
    ]

})
export class VmareMngModule { }
