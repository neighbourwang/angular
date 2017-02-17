import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../architecture/components/common.module';

import { AccountMngModule } from './account-mng/account-mng.module';
import { PersonAccMngModule } from './person-acc-mng/person-acc-mng.module';
import { OrgMngModule } from './org-mng/org-mng.module';
import { CaseMngModule } from './case-mng/case-mng.module';

@NgModule({
    imports: [
        AccountMngModule,
        PersonAccMngModule,
        OrgMngModule,
        CommonComponentModule,
        CaseMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        PersonAccMngModule,
        OrgMngModule,
        CaseMngModule
    ],
    providers: []
})

export class UserCenterModule { }
