import { NgModule } from '@angular/core';

import { CommonComponentModule, PipeModule } from '../../../architecture';

import { ZoneSyncComponent} from '../components/zone-sync/zone-sync.component';
import { MemSyncComponent} from '../components/mem-sync/mem-sync.component';
import { StorageSyncComponent} from '../components/storage-sync/storage-sync.component';
import { VtSyncComponent} from '../components/volumeType-sync/vt-sync.component';
import { HostSyncComponent} from '../components/host-sync/host-sync.component';
import { ProgressBarComponent } from '../components/progress-bar/progress.component'; 


import { ZoneSyncService } from '../components/zone-sync/zone-sync.service'; 
import { HostSyncService } from '../components/host-sync/host-sync.service'; 
import { StorageSyncService } from '../components/storage-sync/storage-sync.service'; 
import { MemSyncService } from '../components/mem-sync/mem-sync.service'; 
import { VtSyncService } from '../components/volumeType-sync/vt-sync.service'; 

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        ZoneSyncComponent,
        HostSyncComponent,
        StorageSyncComponent,
        MemSyncComponent,
        VtSyncComponent, 
        ProgressBarComponent       
    ],
    exports: [
        ZoneSyncComponent,
        HostSyncComponent,
        StorageSyncComponent,
        MemSyncComponent,
        VtSyncComponent,
        ProgressBarComponent    
       
    ],
    providers: [
        ZoneSyncService,
        HostSyncService,
        StorageSyncService,
        MemSyncService,
        VtSyncService 
    ]

})
export class PlatformComponents { }
