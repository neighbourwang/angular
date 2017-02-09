import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'


@Component({
	selector: 'cost-pandect',
	templateUrl: '../template/cost-pandect.component.html',
	styleUrls: ['../style/cost-pandect.less'],
	providers: []
})
export class CostPandectComponent implements OnInit{

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
	}
	ngOnInit(){
	
	}

	//图表的数据
public quotaDtasets = [{ data: [ 30, 70 ], backgroundColor: [ "#00CC99","#E7E9ED" ], borderWidth:[  0,0  ] }];

public quotaOptions = {
            legend: { display: false },
            tooltips: {  enabled: false },
            cutoutPercentage: 82
        };

public useDatasets = [{
                    data: [25,57,173],
                    backgroundColor: [ "#FFCC33","#FF6666","#00CC99"],
                    borderWidth:[ 0,0,0]
                }];

//图表的事件
public chartClicked(e:any):void {
    console.log(e);
}

public chartHovered(e:any):void {
    console.log(e);
}
	
}