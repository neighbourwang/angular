import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { CommonComponentModule } from '../../../architecture';

//Components
import { AccountMngComponent } from './component/account-mng-list.component';
import { AccountMngCrLocal } from './component/account-mng-cr-local.component';

// Routing
import { AccountMngRouting } from './account-mng.routing';

//Service
import { AccountMngService } from './service/account-mng-list.service';

@NgModule({
    imports: [
        CommonComponentModule,
        AccountMngRouting
    ],
    declarations: [
        AccountMngComponent,
        AccountMngCrLocal
    ],
    exports: [
    ],
    providers: [
        AccountMngService
    ]

})
export class AccountMngModule { }