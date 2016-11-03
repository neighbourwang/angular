import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';
import { PersonAccMngModule } from './person-acc-mng/person-acc-mng.module';
import { OrgMngModule } from './org-mng/org-mng.module';

@NgModule({
    imports: [
        AccountMngModule,
        PersonAccMngModule,
        OrgMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        PersonAccMngModule,
        OrgMngModule
    ],
    providers: []
})

export class UserCenterModule { }