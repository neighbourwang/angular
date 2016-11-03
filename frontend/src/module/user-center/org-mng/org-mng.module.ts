import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// component 
import { OrgMngListComponent } from './component/org-mng-list.component';

//service 
import { OrgMngService } from './service/org-mng.service';

//routing
import { OrgMngRouting } from './org-mng.routing';



@NgModule({
    imports: [
        CommonComponentModule,
        OrgMngRouting
    ],
    declarations: [
        OrgMngListComponent
    ],
    exports: [
    ],
    providers: [
        OrgMngService
    ]

})
export class OrgMngModule { }
