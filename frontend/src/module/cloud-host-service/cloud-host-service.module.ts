import { NgModule } from '@angular/core';

import { VmInstanceModule } from './vm-instance/vm-instance-module';
import { CloudDriveModule } from './cloud-drive/cloud-drive-module';

@NgModule({
    imports: [
        VmInstanceModule,
        CloudDriveModule
    ],
    declarations: [],
    exports: [
    ],
    providers: []
})

export class CloudHostService { }