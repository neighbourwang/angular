import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../../src/common_components/common.module';

// cloud_host_ins_list
import { PfConnMngCreComponent } from './component/pf_conn_mng_cre.component';
import { PfConnMngCreService } from './service/pf_conn_mng_cre.service';

// Routing
import { PfConnMngCreRouting } from './pf_conn_mng_cre.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        PfConnMngCreRouting
    ],
    declarations: [
        PfConnMngCreComponent
    ],
    exports: [
        PfConnMngCreComponent
    ],
    providers: [
        PfConnMngCreService
    ]

})
export class PfConnMngCreModule { }
