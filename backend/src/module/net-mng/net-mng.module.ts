import { NgModule } from '@angular/core';

import { OpenstackModule } from'./openstack/openstack.module'; 

@NgModule({
    imports: [
        OpenstackModule
    ],
    declarations: [],
    exports: [
        OpenstackModule
    ],
    providers: []
})

export class NetMngModule { }