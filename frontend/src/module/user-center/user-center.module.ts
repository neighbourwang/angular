import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';
import { PersonAccMngModule } from './person-acc-mng/person-acc-mng.module';
@NgModule({
    imports: [
        AccountMngModule,
        PersonAccMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        PersonAccMngModule
    ],
    providers: []
})

export class UserCenterModule { }