import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// component 
import { OrgMngListComponent } from './component/org-mng-list.component';
import { OrgMngCrComponent } from './component/org-mng-cr.component'; 

//service 
import { OrgMngService } from './service/org-mng.service';

//routing
import { OrgMngRouting } from './org-mng.routing';



@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        OrgMngRouting
    ],
    declarations: [
        OrgMngListComponent,
        OrgMngCrComponent
    ],
    exports: [
    ],
    providers: [
        OrgMngService
    ]

})
export class OrgMngModule { }
