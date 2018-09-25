import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../architecture/components/common.module';

import { AliCloudVmModule } from './cloud-vm/cloud-vm.module';
import { AliCloudDiskModule } from './cloud-disk/cloud-disk.module';

@NgModule({
    imports: [
        AliCloudVmModule,
        AliCloudDiskModule,
        CommonComponentModule,
    ],
    declarations: [],
    exports: [
        AliCloudVmModule,
        AliCloudDiskModule,
    ],
    providers: []
})

export class AliCloudModule { }