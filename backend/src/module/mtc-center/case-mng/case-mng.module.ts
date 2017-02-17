
import { NgModule } from "@angular/core";

// Common Components
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from "../../../architecture";

//Components
import { CaseMngComponent } from "./component/case-mng.component";
import { CaseDetailComponent } from "./component/case-detail.component";
import { CaseClosedComponent } from "./component/case-closed.component";
import { CaseOperatedComponent } from "./component/case-operated.component";

// Routing
import { CaseMngRouting } from "./case-mng.routing";


//Service
import { CaseMngService} from "./service/case-mng.service";
import { CaseDetailService} from "./service/case-detail.service";
import { CaseClosedService} from "./service/case-closed.service";
import { CaseOperatedService} from "./service/case-operated.service";

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        CaseMngRouting
    ],
    declarations: [
        CaseMngComponent,
        CaseDetailComponent,
        CaseClosedComponent,
        CaseOperatedComponent
    ],
    exports: [
        CaseMngComponent,
        CaseDetailComponent, 
        CaseClosedComponent,
        CaseOperatedComponent   
    ],
    providers: [
        CaseMngService,  
        CaseDetailService, 
        CaseClosedService,
        CaseOperatedService  
    ]

})
export class CaseMngModule {
}