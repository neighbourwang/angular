import { NgModule } from '@angular/core';
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';
import { OrgMngRouting } from './org-mng.routing';
//component
import { OrgMngListComponent } from './component/org-mng-list.component'; 
import { OrgMngCrComponent } from './component/org-mng-cr.component'

//service
import { OrgMngService } from './service/org-mng.service';

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