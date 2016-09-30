import { NgModule } from '@angular/core';

// cloud-host
import { CloudHostModule } from './cloud-host/cloud-host.module';

@NgModule({
    imports: [
        CloudHostModule
    ],
    declarations: [],
    exports: [
        CloudHostModule
    ],
    providers: []
})

export class ProdAndSvcModule { }