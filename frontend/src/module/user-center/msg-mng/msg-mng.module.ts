import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// component 
import { MsgAlertComponent } from './component/msg-alert.component';

//service 
import { MsgAlertService } from './service/msg-alert.service';

//routing
import { MsgMngRouting } from './msg-mng.routing';



@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        MsgMngRouting
    ],
    declarations: [
        MsgAlertComponent,
    ],
    exports: [
        MsgAlertComponent,
    ],
    providers: [
        MsgAlertService
    ]

})
export class MsgMngModule { }
