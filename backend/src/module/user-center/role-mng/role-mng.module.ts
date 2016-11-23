import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../../architecture';
import { RoleMngRouting } from './role-mng.routing';

//component
import { PipeModule } from '../../../architecture';
import { RoleMngListComponent } from './component/role-mng-list.component';
import { RoleMngDetailComponent } from './component/role-mng-detail.component';

//service
import { RoleMngService } from './service/role-mng.service';

import { TreeModule } from 'angular2-tree-component';


@NgModule({
    imports: [
        CommonComponentModule,
        RoleMngRouting,
        PipeModule,
        TreeModule
    ],
    declarations: [
        RoleMngListComponent,
        RoleMngDetailComponent
    ],
    exports: [
    ],
    providers: [
        RoleMngService
    ]

})
export class RoleMngModule { }