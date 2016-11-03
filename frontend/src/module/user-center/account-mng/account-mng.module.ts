import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// routing
import { AccountMngRouting } from './account-mng.routing';

//component 
import { AccountMngListComponent } from './component/account-mng-list.component'; 

//service
import { AccountMngService } from './service/account-mng.service';


@NgModule({
    imports: [
        CommonComponentModule,
        AccountMngRouting
    ],
    declarations: [
        AccountMngListComponent
    ],
    exports: [
    ],
    providers: [
        AccountMngService
    ]

})
export class AccountMngModule { }
