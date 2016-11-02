import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';
import { PersonAccMngModule } from './person-acc-mng/person-acc-mng.module';

import { RoleMngModule } from './role-mng/role-mng.module';  

@NgModule({
    imports: [
        AccountMngModule,
        RoleMngModule,
        PersonAccMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        RoleMngModule,
        PersonAccMngModule    
        ],
    providers: []
})

export class UserCenterModule { }
