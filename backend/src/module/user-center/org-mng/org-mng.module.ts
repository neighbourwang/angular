import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../architecture';
import { OrgMngRouting } from './org-mng.routing';
//component

@NgModule({
    imports: [
        CommonComponentModule,
        OrgMngRouting
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]

})
export class OrgMngModule { }