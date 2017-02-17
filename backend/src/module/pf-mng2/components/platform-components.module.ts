import { NgModule } from '@angular/core';

import { CommonComponentModule, PipeModule } from '../../../architecture';

import { ZoneSyncComponent} from '../components/zone-sync/zone-sync.component';

import { ZoneSyncService } from '../components/zone-sync/zone-sync.service'; 

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        ZoneSyncComponent,
        
    ],
    exports: [
        ZoneSyncComponent,
    ],
    providers: [
        ZoneSyncService
    ]

})
export class PlatformComponents { }
