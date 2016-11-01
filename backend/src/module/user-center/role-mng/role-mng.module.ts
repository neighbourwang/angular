import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../architecture';
import { RoleMngRouting } from './role-mng.routing';

//component
import { RoleMngListComponent } from './component/role-mng-list.component';
import { RoleMngDetailComponent } from './component/role-mng-detail.component';

import { TreeModule } from 'angular2-tree-component';


@NgModule({
    imports: [
        CommonComponentModule,
        RoleMngRouting,
        TreeModule
    ],
    declarations: [
        RoleMngListComponent,
        RoleMngDetailComponent
    ],
    exports: [
    ],
    providers: [
    ]

})
export class RoleMngModule { }