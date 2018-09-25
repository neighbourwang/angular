/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from "@angular/core";

// Common Components
import { CommonComponentModule, PipeModule} from "../../../architecture";

//Components
import { AttestMngComponent } from "./component/attest-mng.component";
import { AttestSourceCreComponent } from "./component/attest-source-cre.component";

// Routing
import { AttestMngRouting } from "./attest-mng.routing";


//Service
import { AttMngService} from "./service/attest-mng.service";
import { AttMngCreService } from "./service/attest-source-cre.service";

@NgModule({
    imports: [
        CommonComponentModule,
        AttestMngRouting,
        PipeModule
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
        AttMngService,
        AttMngCreService
    ]

})
export class AttestMngModule {
}