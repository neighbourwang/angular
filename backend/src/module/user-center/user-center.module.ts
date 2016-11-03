import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';
import { RoleMngModule } from './role-mng/role-mng.module';  
import { OrgMngModule } from './org-mng/org-mng.module'; 


import { PersonAccMngModule } from './person-acc-mng/person-acc-mng.module';
import { AttestMngModule } from './attest-mng/attest-mng.module';

@NgModule({
    imports: [
        AccountMngModule,
        RoleMngModule,
        PersonAccMngModule,
        OrgMngModule,
        AttestMngModule 
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        RoleMngModule,
        PersonAccMngModule ,  
        OrgMngModule,
        AttestMngModule 
    ],
    providers: []
})

export class UserCenterModule { }
