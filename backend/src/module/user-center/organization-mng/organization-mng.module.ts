import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../architecture';
import { OrganizationMngRouting } from './organization-mng.routing';
//component

@NgModule({
    imports: [
        CommonComponentModule,
        OrganizationMngRouting
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
    ]

})
export class OrganizationMngModule { }