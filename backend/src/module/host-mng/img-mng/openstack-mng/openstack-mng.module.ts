import { NgModule } from '@angular/core';
// Common Components
import { CommonComponentModule } from '../../../../architecture';

import { OpenstackMngComponent } from './component/openstack-mng.component';
import { OpenstackMngRouting } from './openstack-mng.routing'
import { OpenstackMngService } from './service/openstack-mng.service'
import { OpenstackImageSyncPublicComponent } from './component//openstack.image-sync-public.component'
import { OpenstackImageSyncEntComponent } from './component/openstack.image-sync-ent.component'
@NgModule({
    imports: [
        OpenstackMngRouting,
        CommonComponentModule
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
    providers: [OpenstackMngService]
})

export class OpenstackMngModule{
    
} 
