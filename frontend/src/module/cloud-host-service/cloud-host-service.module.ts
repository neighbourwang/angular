import { NgModule } from '@angular/core';

import { VmInstanceModule } from './vm-instance/vm-instance-module';
import { DatabaseModule } from './database/databas-module';
import { MiddlewareModule } from './middleware/middleware-module';
import { PhysicalMachineModule } from './physical-machine/physical-machine-module';
import { ManagementServicesModule } from './management-services/management-services-module';
import { CloudDriveModule } from './cloud-drive/cloud-drive-module';
import { ShopingCartModule } from './shoping-cart/shoping-cart-module';

@NgModule({
    imports: [
        VmInstanceModule,
        DatabaseModule,
        MiddlewareModule,
        CloudDriveModule,
        ShopingCartModule,
        PhysicalMachineModule,
        ManagementServicesModule
    ],
    declarations: [],
    exports: [
    ],
    providers: []
})

export class CloudHostService { }