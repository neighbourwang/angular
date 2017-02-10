import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'

import * as _ from 'underscore';

@Component({
	selector: 'cost-pandect',
	templateUrl: '../template/cost-pandect.component.html',
	styleUrls: ['../style/cost-pandect.less'],
	providers: []
})
export class CostPandectComponent implements OnInit{
	//企业消费概览
    ent_dht:any=[{
                        data: [25,57,173,200],
                        borderWidth:[
                            0,0,0,0
                        ]
                    }];
    lineChartColors:Array<any> = [
        {
            backgroundColor: [
                "#FFCC33","#2BD2CA","#00CC99","#FF6666"
            ]
        }
    ];

    d_labels=[
                        '物理机：'+25,
                        '数据库：'+ 57,
                        '云硬盘：'+ 173,
                        '云主机：'+ 200,
                    ];
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

//消费趋势
	ent_bar:any=[{
                        type: "bar",
                        label: "总消费",
                        data: [65, 59, 80, 81, 56, 55, 40],
                         
                    },{   type: 'line',
                            label: "新增消费",
                            fill: false,
                            lineTension: 0.1,
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data:[65, 59, 80, 81, 56, 55, 40],
                            spanGaps: false,
                        }
                   ];//消费趋势
barColors = [
    {
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
    },{

        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
    }
];

bar_labels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"];
hbar_labels = ["IT部门", "财务部门", "应用部门", "营销部门", "人事部门"];
hbar_labels2 = ["IT部门", "财务部门", "应用部门", "营销部门", "人事部门"];
	ent_hbar:any=[{
                        label:'消费总额',
                        data: [65, 59, 80, 81, 56]
                         
                    }];
    //新增消费排名
	ent_hbar2:any=[{
                        label:'消费总额',
                        data: [65, 59, 80, 81, 56]
                         
                    }];//新增消费排名
hbarColors = [
    {
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
    }
]

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

	//显示详情
	download(orderItem:SubInstanceResp){
		this.layoutService.show();
        $('#downloadDialog').modal('show');
	}

	
}