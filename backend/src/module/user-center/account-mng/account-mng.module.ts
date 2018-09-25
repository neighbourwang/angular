import { NgModule } from '@angular/core';
// Common Components ../../../architecture
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//Components
import { AccountMngComponent } from './component/account-mng-list.component';
import { AccountMngCrLocal } from './component/account-mng-cr-local.component';
import { AccountMngCrAd } from './component/account-mng-cr-ad.component';
import { AccountMngEditAd } from './component/account-mng-edit-ad.component';

// Routing
import { AccountMngRouting } from './account-mng.routing';

//Service
import { AccountMngService } from './service/account-mng-list.service';
import { AccountMngCreAdService } from './service/account-mng-cr-ad.service';

@NgModule({
    imports: [
        CommonComponentModule,
        AccountMngRouting,
        PipeModule
    ],
    declarations: [
        AccountMngComponent,
        AccountMngCrLocal,
        AccountMngCrAd,
        AccountMngEditAd
    ],
    exports: [
    ],
    providers: [
        AccountMngService,
        AccountMngCreAdService
    ]

})
export class AccountMngModule { }