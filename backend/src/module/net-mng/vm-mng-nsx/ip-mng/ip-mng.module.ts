import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule } from '../../../../architecture';

/*
//Components
import { IpMngListComponent } from './component/ip-mng-list.component';
import { IpUsageMngListComponent } from './component/ipusage-mng-list.component';

// Routing
import { IpMngRouting } from './ip-mng.routing';

//Service
import { IpMngListService } from './service/ip-mng-list.service';
import { IpUsageMngListService } from './service/ipusage-mng-list.service';
*/

@NgModule({
    imports: [
        CommonComponentModule,
        //IpMngRouting,
        PipeModule
    ],
    declarations: [
        //IpMngListComponent,
        //IpUsageMngListComponent
    ],
    exports: [
        //IpMngListComponent,
        //IpUsageMngListComponent
    ],
    providers: [
        //IpMngListService,
        //IpUsageMngListService
    ]

})
export class IpMngModule { }
