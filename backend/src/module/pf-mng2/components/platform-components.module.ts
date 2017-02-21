import { NgModule } from '@angular/core';

import { CommonComponentModule, PipeModule } from '../../../architecture';

import { ZoneSyncComponent} from '../components/zone-sync/zone-sync.component';
import { HostSyncComponent} from '../components/host-sync/host-sync.component';

import { ZoneSyncService } from '../components/zone-sync/zone-sync.service'; 
import { HostSyncService } from '../components/host-sync/host-sync.service'; 

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        ZoneSyncComponent,
        HostSyncComponent
        
    ],
    exports: [
        ZoneSyncComponent,
    ],
    providers: [
        ZoneSyncService,
        HostSyncService
    ]

})
export class PlatformComponents { }
