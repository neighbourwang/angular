import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { IpMngListComponent } from './component/ip-mng-list.component';

// Routing
import { IpMngRouting } from './ip-mng.routing';

//Service
import { IpMngListService } from './service/ip-mng-list.service';


@NgModule({
    imports: [
        CommonComponentModule,
        IpMngRouting
    ],
    declarations: [
        IpMngListComponent
    ],
    exports: [
    ],
    providers: [
        IpMngListService
    ]

})
export class IpMngModule { }
