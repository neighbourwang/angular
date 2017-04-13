import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule } from '../../../architecture';

//Components
import { PhysicalProdCreStep1Component} from './component/physical-prod-cre-step1.component';
import { PhysicalProdCreStep2Component} from './component/physical-prod-cre-step2.component';
import { PhysicalProdCreStep3Component} from './component/physical-prod-cre-step3.component';
import { PhysicalProdCreStep4Component} from './component/physical-prod-cre-step4.component';

// Routing
import { PhysicalProdMngRouting } from './physical-prod-mng.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        PhysicalProdMngRouting,
    ],
    declarations: [        
        PhysicalProdCreStep1Component,
        PhysicalProdCreStep2Component,
        PhysicalProdCreStep3Component,
        PhysicalProdCreStep4Component,
    ],
    exports: [
    ],
    providers: [
       
    ]

})
export class PhysicalProdMngModule { }
