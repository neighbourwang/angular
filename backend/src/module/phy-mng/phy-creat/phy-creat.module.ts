import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule, PipeModule} from '../../../architecture';

//Components
import { PhyCreatComponent } from './component/phy-creat.component.ts';

// Routing
import { PhyCreatRouting } from './phy-creat.routing.ts';

//service
import { PhyCreatMngService} from './service/phy-creat-mng.service.ts'


@NgModule({
    imports: [
        CommonComponentModule,
        PhyCreatRouting,
        PipeModule
    ],
    declarations: [
        PhyCreatComponent
    ],
    exports: [
        PhyCreatComponent
    ],
    providers: [
        PhyCreatMngService
    ]

})
export class PhyCreatModule { }
