/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { AttestMngComponent } from './component/attest-mng.component';
import { AttestSourceCreComponent } from './component/attest-source-cre.component';

// Routing
import { AttestMngRouting } from './attest-mng.routing';


//Service

@NgModule({
    imports: [
        CommonComponentModule,
        AttestMngRouting
    ],
    declarations: [
        AttestMngComponent,
        AttestSourceCreComponent
    ],
    exports: [
        AttestMngComponent,
        AttestSourceCreComponent
    ],
    providers: [
       
    ]

})
export class AttestMngModule { }
