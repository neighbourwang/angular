import { NgModule } from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// Common Components
import { CommonComponentModule } from '../../../architecture';

// pf-conn-mng
import { EntAdminCreComponent } from './component/ent-admin-cre.component';
import { EntAdminCreADComponent } from './component/ent-admin-cre-ad.component';
import { EntAdminMngComponent } from './component/ent-admin-mng.component';

import { EntAdminCreService } from './service/ent-admin-cre.service';
import { EntAdminCreADService } from './service/ent-admin-cre-ad.service';
import { EntAdminMngService} from './service/ent-admin-mng.service';

// Routing
import { EntAdminMngRouting } from './ent-admin-mng.routing';

@NgModule({
    imports: [
        Ng2Bs3ModalModule,
        CommonComponentModule,
        EntAdminMngRouting
    ],
    declarations: [
        EntAdminCreComponent,
        EntAdminCreADComponent,
        EntAdminMngComponent
    ],
    exports: [
        EntAdminCreComponent,
        EntAdminCreADComponent,
        EntAdminMngComponent
    ],
    providers: [
        EntAdminCreService,
        EntAdminCreADService,
        EntAdminMngService
    ]

})
export class EntAdminMngModule { }
