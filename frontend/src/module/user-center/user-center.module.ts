import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';

@NgModule({
    imports: [
        AccountMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule
    ],
    providers: []
})

export class UserCenterModule { }