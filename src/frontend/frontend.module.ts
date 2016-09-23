import { NgModule } from '@angular/core';

// cloud_host_ins_list
import { CloudHostModule } from './prod_and_svc/cloud_host/cloud_host.module';

// Routing
import { CloudHostRouting } from './prod_and_svc/cloud_host/cloud_host.routing';


@NgModule({
    imports: [
        CloudHostModule,
        CloudHostRouting
    ],
    declarations: [
    ],
    exports: [
        CloudHostModule
    ],
    providers: [
    ]

})
export class FrontendModule { }
