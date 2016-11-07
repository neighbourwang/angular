import { NgModule } from '@angular/core';

import { VmInstanceModule } from './vm-instance/vm-instance-module';
import { CloudDriveModule } from './cloud-drive/cloud-drive-module';
import { ShopingCartModule } from './shoping-cart/shoping-cart-module';

@NgModule({
    imports: [
        VmInstanceModule,
        CloudDriveModule,
        ShopingCartModule
    ],
    declarations: [],
    exports: [
    ],
    providers: []
})

export class CloudHostService { }