
import { NgModule } from "@angular/core";

// Common Components
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from "../../../architecture";

//Components
import { PhysicalEditComponent } from "./component/physical-edit.component";
import { PhysicalListComponent } from "./component/physical-list.component";
import { PhysicalIpmiComponent} from "./component/physical-ipmi.component";

// Routing
import { PhysicalMngRouting } from "./physical-mng.routing";


//Service
import { PhysicalEditService} from "./service/physical-edit.service";
import { PhysicalListService} from "./service/physical-list.service";

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        PhysicalMngRouting
    ],
    declarations: [
        PhysicalEditComponent,
        PhysicalListComponent,
        PhysicalIpmiComponent      
    ],
    exports: [
        PhysicalEditComponent,
        PhysicalListComponent,
        PhysicalIpmiComponent       
    ],
    providers: [
        PhysicalEditService,
        PhysicalListService        
    ]

})
export class PhysicalMngModule {
}