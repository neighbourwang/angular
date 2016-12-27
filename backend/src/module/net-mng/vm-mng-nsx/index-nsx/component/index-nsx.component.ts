import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {
    RestApi, RestApiCfg, LayoutService, NoticeComponent, dictPipe,
    ConfirmComponent, PaginationComponent, ValidationService, PopupComponent, SystemDictionaryService, SystemDictionary
} from '../../../../../architecture';

//import { DCModel } from "../model/dc.model";
//import { switchMode} from "../model/switch.model"
//import { port } from '../model/port.model';
//import { port_mock } from '../model/port.mock.model';
import { VmNSXIndexService } from '../service/index-nsx.service';

@Component({
    selector: "index",
    templateUrl: "../template/index-nsx.html",
    styleUrls: [],
    providers: []
}
)

export class VmNSXIndexComponent implements OnInit {

    constructor(
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private service: VmNSXIndexService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
        if (activatedRouter.snapshot.params["pid"]) {
            this.platformId = activatedRouter.snapshot.params["pid"] || "";
        } else {
            this.platformId = "88";
        }
    }

    platformId: string;

    ngOnInit() {
        
    }
}