/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//Components
import { PersonAccMngComponent } from './component/person-acc-mng.component';

// Routing
import { PersonAccMngRouting } from './person-acc-mng.routing';


//Service
import { GetPersonAccService } from './service/person-acc-get.service';
import { PutPersonAccService } from './service/person-acc-put.service';
import { EditPersonAccPwdService } from './service/person-acc-pwd.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PersonAccMngRouting,
        PipeModule
    ],
    declarations: [
        PersonAccMngComponent,
    ],
    exports: [
        PersonAccMngComponent,
    ],
    providers: [
        GetPersonAccService,
        PutPersonAccService,
        EditPersonAccPwdService 
    ]

})
export class PersonAccMngModule { }
