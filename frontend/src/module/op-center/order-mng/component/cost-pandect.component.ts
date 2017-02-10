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
	ent_dht:any=[{
                        data: [25,57,173,200],
                        backgroundColor: [
                            "#FFCC33","#2BD2CA","#00CC99","#2BD2CA"
                        ],
                        borderWidth:[
                            0,0,0,0
                        ]
                    }];//企业消费概览


  d_labels=[
                        '物理机：'+25,
                        '数据库：'+ 57,
                        '云硬盘：'+ 173,
                        '云主机：'+ 200,
                    ];
	ent_bar:any=[{
                        type: "bar",
                        label: "总消费",
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                         borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ]
                         
                    }
                   ];//消费趋势
	ent_hbar:any=[{
                        label:'消费总额',
                        data: [65, 59, 80, 81, 56],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                         borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ]
                         
                    }];//消费总额排名
	ent_hbar2:any=[{
                        label:'消费总额',
                        data: [65, 59, 80, 81, 56],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                         borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ]
                         
                    }];//新增消费排名

d_options={
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            boxWidth: 12
                        }
                    },
                    tooltips: {
                        enabled: false,
                    },
                    cutoutPercentage: 82,
                }
bar_options={
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        stacked: true

                    }]
                }
            };
h_options={
                    scales: {
                        xAxes: [{
                             stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                };
	
	h_options2={
                    scales: {
                        xAxes: [{
                             stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                };
	
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
	}
	ngOnInit(){
	
	}

//图表的事件
public chartClicked(e:any):void {
    console.log(e);
}

public chartHovered(e:any):void {
    console.log(e);
}
	
}