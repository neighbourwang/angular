import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';
// import { ProdMngModule } from './prod-mng/prod-mng.module';


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
