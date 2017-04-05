import { NgModule } from '@angular/core';

import { AliCloudMajorModule } from './ali-cloud-major/ali-cloud-major.module';

@NgModule({
    imports: [
        AliCloudMajorModule
    ],
    declarations: [],
    exports: [
        AliCloudMajorModule
    ],
    providers: []
})

export class AliCloudModule{ }
