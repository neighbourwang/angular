import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// component 
import { MsgAlertComponent } from './component/msg-alert.component';
import { MsgListComponent } from './component/msg-list.component';

//service 
import { MsgMngService } from './service/msg-mng.service';

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
        MsgListComponent
    ],
    exports: [
        MsgAlertComponent,
        MsgListComponent
    ],
    providers: [
        MsgMngService
    ]

})
export class MsgMngModule { }
