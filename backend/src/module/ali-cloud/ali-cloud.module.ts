import { NgModule } from '@angular/core';

import { AliCloudMainAccountModule } from './ali-cloud-mainAccount/ali-cloud-mainAccount.module';
import { AliCloudSubAccountModule } from './ali-cloud-subAccount/ali-cloud-subAccount.module';
@NgModule({
    imports: [
        AliCloudMainAccountModule,
        AliCloudSubAccountModule
    ],
    declarations: [],
    exports: [
        AliCloudMainAccountModule,
        AliCloudSubAccountModule
    ],
    providers: []
})

export class AliCloudModule{ }
