import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//Components
import { AccountMngComponent } from './component/account-mng-list.component';
import { AccountMngCrLocal } from './component/account-mng-cr-local.component';
import { AccountMngCrAd } from './component/account-mng-cr-ad.component';

// Routing
import { AccountMngRouting } from './account-mng.routing';

//Service
import { AccountMngService } from './service/account-mng-list.service';

@NgModule({
    imports: [
        CommonComponentModule,
        AccountMngRouting,
        PipeModule
    ],
    declarations: [
        AccountMngComponent,
        AccountMngCrLocal,
        AccountMngCrAd
    ],
    exports: [
    ],
    providers: [
        AccountMngService
    ]

})
export class AccountMngModule { }