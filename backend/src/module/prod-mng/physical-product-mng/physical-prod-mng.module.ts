import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule } from '../../../architecture';
import { PipeModule } from '../../../architecture';

//Components
import { PhsicalProdDirCreComponent } from "./component/prod-dirPhsical-cre.component";
import { PhysicalProdCreStep1Component} from './component/physical-prod-cre-step1.component';
import { PhysicalProdCreStep2Component} from './component/physical-prod-cre-step2.component';
import { PhysicalProdCreStep3Component} from './component/physical-prod-cre-step3.component';
import { PhysicalProdCreStep4Component} from './component/physical-prod-cre-step4.component';

//service
import { PhysicalServiceService } from './service/physical-prod-service.service';
import { PhysicalProductService } from './service/physical-prod-cre.service';
// Routing
import { PhysicalProdMngRouting } from './physical-prod-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        PhysicalProdMngRouting,
        PipeModule
    ],
    declarations: [        
        PhysicalProdCreStep1Component,
        PhysicalProdCreStep2Component,
        PhysicalProdCreStep3Component,
        PhysicalProdCreStep4Component,
        PhsicalProdDirCreComponent
    ],
    exports: [
    ],
    providers: [
        PhysicalServiceService,
        PhysicalProductService
    ]

})
export class PhysicalProdMngModule { }
