import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../architecture/components/common.module';

import { AccountMngModule } from './account-mng/account-mng.module';
import { PersonAccMngModule } from './person-acc-mng/person-acc-mng.module';
import { OrgMngModule } from './org-mng/org-mng.module';
import { CaseMngModule } from './case-mng/case-mng.module';
import { MsgMngModule } from './msg-mng/msg-mng.module';
import { AliMngModule } from './ali-cloud/ali-mng.module';

@NgModule({
    imports: [
        AccountMngModule,
        PersonAccMngModule,
        OrgMngModule,
        CommonComponentModule,
        CaseMngModule,
        MsgMngModule,
        AliMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        PersonAccMngModule,
        OrgMngModule,
        CaseMngModule,
        MsgMngModule,
        AliMngModule
    ],
    providers: []
})

export class UserCenterModule { }
