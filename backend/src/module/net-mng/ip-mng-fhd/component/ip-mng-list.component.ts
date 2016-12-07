import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model 
import { IpMngModel } from '../model/ip-mng.model';

//service
import { IpMngListService } from '../service/ip-mng-list.service';

@Component({
    selector: 'ip-mng-list',
    templateUrl: '../template/ip_addr_mng.html',
    styleUrls: [],
    providers: []
})

export class IpMngListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : IpMngListService,
        private layoutService : LayoutService
    ) {}


    @ViewChild('notice')
    notice:ConfirmComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();


    }

}
