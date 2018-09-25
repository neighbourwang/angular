import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { SpinnerComponent } from './spinner/component/spinner.component';
import { PaginationComponent } from './pagination/component/pagination.component';
import { NoticeComponent } from './dialog/component/notice.component';
import { ConfirmComponent } from './dialog/component/confirm.component';
import { PopupComponent } from './dialog/component/popup.component';
import { CountBarComponent} from './countBar/component/count-bar.component'
import { PopoverModule } from './popover/index';
import { SelectboxComponent } from './selectbox/component/selectbox.component';
import { StaticTooltipComponent } from './staticTooltip/staticTooltip.component';
import { tagInputComponent } from './tagInput/tagInput.component';

import { MyDatePickerModule } from './date-picker/my-date-picker.module';
import { BootstrapPopoverDirective } from './popover/bootstrap-popover.directive';

import { ClickOutsideModule } from 'ng2-click-outside';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { HttpModule } from '@angular/http';
import { DialogTranslate } from './dialog/service/dialog-translate.service';

import { Validation } from './validators';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2Bs3ModalModule,
        FormsModule,
        HttpModule,
        SharedModule,
    ],
    declarations: [
        SpinnerComponent,
        PaginationComponent,
        NoticeComponent,
        ConfirmComponent,
        PopupComponent,
        CountBarComponent,
        BootstrapPopoverDirective,
        SelectboxComponent,
        StaticTooltipComponent,
        tagInputComponent
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
        MyDatePickerModule,
        BootstrapPopoverDirective,
        ClickOutsideModule,
        PopoverModule,
        HttpModule,
        ChartsModule,
		SelectboxComponent,
        StaticTooltipComponent,
        SharedModule,
        tagInputComponent
    ],
    providers : [
        DialogTranslate,
        Validation
    ]
})
export class CommonComponentModule { }
