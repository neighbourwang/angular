import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule ,PipeModule} from '../../../../architecture';
import { DlrMngComponent } from './component/dlr-mng.component';
import { DlrMngService } from'./service/dlr-mng.service';
import { DlrMngRouting } from './dlr-mng.routing';
import { DlrMngSetComponent } from './component/dlr-mng-set.component';
@NgModule({
    imports:[
        CommonComponentModule,
        PipeModule,
        DlrMngRouting
    ],
    declarations:[
        DlrMngComponent,
        DlrMngSetComponent
    ],
    exports:[
        DlrMngComponent,
        DlrMngSetComponent
    ],
    providers:[
        DlrMngService
    ]
})
export class DlrMngModule {}