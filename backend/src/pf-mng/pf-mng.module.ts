import { NgModule } from '@angular/core';

// pf_conn_mng
import { PfConnMngCreModule } from './pf-conn-mng/pf-conn-mng.module';

@NgModule({
    imports: [
        PfConnMngCreModule,
    ],
    declarations: [],
    exports: [
        PfConnMngCreModule,
    ],
    providers: []
})

export class PfMngModule { }