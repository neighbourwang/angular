import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
// import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SpinnerComponent } from './spinner/component/spinner.component';
import { PaginationComponent } from './pagination/component/pagination.component';
import { NoticeComponent } from './dialog/component/notice.component';
import { ConfirmComponent } from './dialog/component/confirm.component';
import { PopupComponent } from './dialog/component/popup.component';
import { CountBarComponent } from './countBar/component/count-bar.component';

// import { DonutChart } from './donutChart/component/chart.component';
// import { LineChart } from './lineChart/component/chart.component';

import { OrderByPipe } from '../pipe/orderby';

@NgModule({
    imports: [
        CommonModule,
        Ng2Bs3ModalModule,
        FormsModule
        // ChartsModule
    ],
    declarations: [
        SpinnerComponent,
        PaginationComponent,
        NoticeComponent,
        ConfirmComponent,
        PopupComponent,
        CountBarComponent,
        OrderByPipe
        // DonutChart,
        // LineChart
    ],
    exports: [
        CommonModule,
        FormsModule,
        SpinnerComponent,
        PaginationComponent,
        NoticeComponent,
        ConfirmComponent,
        PopupComponent,
        CountBarComponent,
        FormsModule,
        OrderByPipe
        // DonutChart,
        // LineChart
    ]
})
export class CommonComponentModule { }
