import { NgModule } from '@angular/core';
// Common Components
import { CommonComponentModule ,PipeModule} from '../../../../architecture';

import { OpenstackMngComponent } from './component/openstack-mng.component';
import { OpenstackMngRouting } from './openstack-mng.routing';
import { OpenstackMngService } from './service/openstack-mng.service';
import { OpenstackImageSyncPublicComponent } from './component//openstack.image-sync-public.component';
import { OpenstackImageSyncEntComponent } from './component/openstack.image-sync-ent.component';
import { SelectedTenantListService } from './service/selected-tenant-list.service';
@NgModule({
    imports: [
        OpenstackMngRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        OpenstackMngComponent,
        OpenstackImageSyncPublicComponent,
        OpenstackImageSyncEntComponent
    ],
    exports: [
        OpenstackMngComponent,
        OpenstackImageSyncPublicComponent,
        OpenstackImageSyncEntComponent
    ],
    providers: [OpenstackMngService,SelectedTenantListService]
})

export class OpenstackMngModule{
    
} 
