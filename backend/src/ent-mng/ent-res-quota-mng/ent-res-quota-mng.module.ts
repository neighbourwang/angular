import { NgModule } from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// Common Components
import { CommonComponentModule } from '../../common_components/common.module';

// pf-conn-mng
import { EntResQuotaMngComponent } from './component/ent-res-quota-mng.component';
import { EntResQuotaMngService } from './service/ent-res-quota-mng.service';

import { EntResQuotaCreComponent } from './component/ent-res-quota-cre.component';
import { EntResQuotaCreService } from './service/ent-res-quota-cre.service';

// Routing
import { EntResQuotaMngRouting } from './ent-res-quota-mng.routing';

@NgModule({
    imports: [
        Ng2Bs3ModalModule,
        CommonComponentModule,
        EntResQuotaMngRouting
    ],
    declarations: [
        EntResQuotaMngComponent,
        EntResQuotaCreComponent,
    ],
    exports: [
        EntResQuotaMngComponent,
        EntResQuotaCreComponent
    ],
    providers: [
        EntResQuotaMngService,
        EntResQuotaCreService,
    ]

})
export class EntResQuotaMngModule { }
