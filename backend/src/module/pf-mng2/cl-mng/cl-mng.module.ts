/**
 * Created by junjie on 16/10/17.
 */
import { NgModule } from '@angular/core';

// Common Components
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//Components
import { ClMngListComponent } from './component/cl-mng-list.component';
import { PfDetailComponent } from './component/pf-mng-detail.component';
import { bootDiskMngComponent } from './component/pf-mng-bootDisk.component';
import { bootDiskCreEditComponent } from './component/pf-mng-bootDisk-creEdit.component';
import { CloudHostSpecComponent } from './component/pf-mng-cloudHostSpec.component';



import { ClMngCreStep1Component } from './component/cl-mng-cre-step-1.component';

import { ClMngCreStep2Component} from './component/cl-mng-cre-step-2.component';

import { ClMngCreStep3Component } from './component/cl-mng-cre-step-3.component';

import { ClMngCreStep4Component } from './component/cl-mng-cre-step-4.component';

import { ClMngCreStep5Component } from './component/cl-mng-cre-step-5.component';

import { ClMngCreStep6Component } from './component/cl-mng-cre-step-6.component';


// Routing
import { ClMngRouting } from './cl-mng.routing';

//Service
import { ClMngListService } from './service/cl-mgn-list.service';

import { ClMngCreStep1Service } from './service/cl-mng-cre-step-1.service';

import { ClMngIdService } from './service/cl-mng-id.service';

import { ClMngCreStep2Service } from './service/cl-mng-cre-step-2.service';

import { ZoneListService } from './service/cl-mng-cre-step-3.service'; 

import { StorageListService } from './service/cl-mng-cre-step-4.service'; 

import { ClMngCreStep5Service } from './service/cl-mng-cre-step-5.service'; 

import { ClMngCreStep6Service } from './service/cl-mng-cre-step-6.service'; 

import { ClMngCommonService } from './service/cl-mng-common.service';

import { PlatformDetailService } from './service/pf-mng-detail.service';


@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        ClMngRouting
    ],
    declarations: [
        ClMngListComponent,
        PfDetailComponent,
        ClMngCreStep1Component,
        ClMngCreStep2Component,
        ClMngCreStep3Component,
        ClMngCreStep4Component,
        ClMngCreStep5Component,
        ClMngCreStep6Component,
        bootDiskMngComponent,
        bootDiskCreEditComponent,
        CloudHostSpecComponent
    ],
    exports: [
    ],
    providers: [
        ClMngListService,
        ClMngCreStep1Service,
        ClMngIdService,
        ClMngCreStep2Service,
        ZoneListService,
        StorageListService,
        ClMngCreStep5Service,
        ClMngCreStep6Service,
        ClMngCommonService,
        PlatformDetailService
    ]

})
export class ClMnfModule { }
