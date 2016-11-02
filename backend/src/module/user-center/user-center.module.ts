import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';
import { RoleMngModule } from './role-mng/role-mng.module';  
import { OrgMngModule } from './org-mng/org-mng.module'; 


@NgModule({
    imports: [
        AccountMngModule,
        RoleMngModule,
        OrgMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        RoleMngModule,
        OrgMngModule
    ],
    providers: []
})

export class UserCenterModule { }
