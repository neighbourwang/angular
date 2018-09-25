import { NgModule } from '@angular/core';

import { CommonComponentModule, PipeModule } from '../../../architecture';

import { PlatformEditComponent } from './platform-edit/platform-edit.component';
import { PlatformEditService } from './platform-edit/platform-edit.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
        PlatformEditComponent,        
    ],
    exports: [
        PlatformEditComponent
    ],
    providers: [
       PlatformEditService
    ]

})
export class ProductMngComponents { }
