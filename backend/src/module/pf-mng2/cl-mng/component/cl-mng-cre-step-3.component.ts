/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,Params ,ActivatedRoute} from '@angular/router';

import { ZoneListModel }  from '../model/cre-step3.model';




import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

import { ZoneListService } from '../service/cl-mng-cre-step-3.service'; 

import { ClMngIdService } from '../service/cl-mng-id.service';

@Component({
    selector: 'cl-mng-cre-step-3',
    templateUrl: '../template/cl-mng-cre-step-03.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep3Component implements OnInit{

    creStep3Model : Array<ZoneListModel> = new Array<ZoneListModel>();

    constructor(
        private route:ActivatedRoute,
        private router : Router,
        private service : ZoneListService,
        private layoutService : LayoutService,
        private idService : ClMngIdService
    ) {}

    platformType:string;
    ngOnInit (){
        //获取平台类型
        this.route.params.forEach((params: Params)=>{
             this.platformType=params['type'];
             console.log(this.platformType);
        })

        let platFormId : String = this.idService.getPlatformId();
        
        this.service.getZone(platFormId).then(
            res => {
                console.log(res);
                this.creStep3Model = res.resultContent;
                this.creStep3Model.forEach(ele => {
                    ele.quotaPercentage=
                            ele.quotaPercentage?ele.quotaPercentage:0;
                    ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                })
            }
        ).catch(
            error => {
                console.error('error');
            }
        )
    }

    next (){

        let platFormId : String = this.idService.getPlatformId();

        // this.router.navigateByUrl("pf-mng2/cl-mng/cre-step4");
        this.creStep3Model.forEach(ele => {
            ele.quotaPercentage = ele.quotaPercentDisplay * 0.01
        }
        );

        //等待接口
        this.service.putZone( platFormId , this.creStep3Model).then(
            res => {
                console.log(res);
                this.router.navigate(["pf-mng2/cl-mng/cre-step4",{type:this.platformType}]);
            }
        ).catch(
            error => {
                console.error('error');
            }
        )

        
    }

    previous (){
        this.router.navigate(["pf-mng2/cl-mng/cre-step2",{type:this.platformType}]);
    }
    cancel (){
        this.router.navigate(["pf-mng2/cl-mng/cl-mng",{type:this.platformType}]);
    }

    outputValue(event , index){
        this.creStep3Model[index].usageQuota = event;
    }
}
