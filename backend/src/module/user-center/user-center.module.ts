import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';
import { RoleMngModule } from './role-mng/role-mng.module';  
import { OrganizationMngModule } from './organization-mng/organization-mng.module'; 


@NgModule({
    imports: [
        AccountMngModule,
        RoleMngModule,
        OrganizationMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        RoleMngModule,
        OrganizationMngModule
    ],
    providers: []
})

export class UserCenterModule { }
