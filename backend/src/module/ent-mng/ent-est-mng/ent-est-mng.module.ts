import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// ent-est-mng
import { EntEstMngComponent,  EntEstCreComponent,EntEstManagePlatformComponent} from './component';
// Routing
import { EntEstMngRouting } from './ent-est-mng.routing';
import { EntEstSetProdComponent } from './component/ent-est-setProd.component';
import { EntEstCheckComponent } from './component/ent-est-check.component';
@NgModule({
    imports: [
        CommonComponentModule,
        EntEstMngRouting
    ],
    declarations: [
        EntEstMngComponent
        ,EntEstCreComponent,
        EntEstSetProdComponent,
        EntEstCheckComponent
        ,EntEstManagePlatformComponent
    ],
    exports: [EntEstMngComponent],
    providers: []

})
export class EntEstMngModule { }