/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../../architecture';

//Components
import { PortMngComponent } from './component/port-mng.component';
import { PortMngSetComponent } from './component/port-mng-set.component';

// Routing
import { VMPortMngRouting } from './port-mng.routing';


//Service
import { PortMngService} from "./service/port-mng.service";
import { PortMngSetService } from "./service/port-mng-set.service";

@NgModule({
    imports: [
        CommonComponentModule,
        VMPortMngRouting
    ],
    declarations: [
        PortMngComponent,
        PortMngSetComponent
    ],
    exports: [
        PortMngComponent,
        PortMngSetComponent
    ],
    providers: [
        PortMngService,
        PortMngSetService
    ]

})
export class VMPortMngModule { }
