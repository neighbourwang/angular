import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../architecture';
import { RoleMngRouting } from './role-mng.routing';

//component
import { RoleMngListComponent } from './component/role-mng-list.component';


@NgModule({
    imports: [
        CommonComponentModule,
        RoleMngRouting
    ],
    declarations: [
        RoleMngListComponent
    ],
    exports: [
    ],
    providers: [
    ]

})
export class RoleMngModule { }