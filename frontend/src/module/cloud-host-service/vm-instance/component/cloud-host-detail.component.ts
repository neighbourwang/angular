import { Component,ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { cloudHostDetailService } from '../service/cloud-host-detail.service'



@Component({
	selector: 'cloud-host-detail',
	templateUrl: '../template/cloud-host-detail.component.html',
	styleUrls: ['../style/cloud-host-detail.less'],
})

export class cloudHostDetailComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	vm:any;
	diff:number = 0;
	postData: any = {};

    isEditState:boolean = false;

	a_labels = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];
	a_datasets = [
		{
			label: "CUP使用率 %",
			fill: false,
			lineTension: 0.2,
			backgroundColor: "#ffffff",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 1,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [30, 45, 80, 41, 56, 55, 20],
			spanGaps: false,
		}
	];
	a_options = {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true,
					max: 100
				}
			}],
		},
		legend: {
			position: 'bottom',
			display: true,
			labels: {
				boxWidth: 24
			}
		}
	}

	b_labels= ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];
	b_datasets= [
		{
			label: "内存使用率 %",
			fill: false,
			lineTension: 0.2,
			backgroundColor: "#ffffff",
			borderColor: "#FF6633",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "#FF6633",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "#FF6633",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 1,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [10, 73, 37, 42, 52, 30, 40],
			spanGaps: false,
		}
	];
	b_options= {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true,
					max: 100
				}
			}],
		},
		legend: {
			position: 'bottom',
			display: true,
			labels: {
				boxWidth: 24
			}
		}
	}

	c_labels= ["2", "4", "6", "8", "16", "32", "64", "128"];
	c_datasets= [
		{
			label: "读取",
			fill: false,
			lineTension: 0,
			backgroundColor: "#ffffff",
			borderColor: "#66CC99",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "#66CC99",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "#66CC99",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 1,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [3200, 6200, 5500, 3329, 2200, 3200, 3790, 5902],
			spanGaps: false,
		},
		{
			label: "读入",
			fill: false,
			lineTension: 0,
			backgroundColor: "#ffffff",
			borderColor: "#FFCC33",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "#FFCC33",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "#FFCC33",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 1,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [1200, 7200, 4500, 5329, 2700, 3700, 2790, 4902],
			spanGaps: false,
		},
	]
	c_options= {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true,
					max: 10000
				}
			}],
		},
		legend: {
			position: 'bottom',
			display: true,
			labels: {
				boxWidth: 24,
				padding: 20
			}
		}
	}

	d_labels= ["2", "4", "6", "8", "16", "32", "64", "128"];
	d_datasets= [
		{
			label: "读取",
			fill: false,
			lineTension: 0,
			backgroundColor: "#ffffff",
			borderColor: "#FF9966",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "#FF9966",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "#FF9966",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 1,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [3200, 6200, 5500, 3329, 2200, 3200, 3790, 5902],
			spanGaps: false,
		},
		{
			label: "读入",
			fill: false,
			lineTension: 0,
			backgroundColor: "#ffffff",
			borderColor: "#9966FF",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "#9966FF",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "#9966FF",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 1,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [1200, 7200, 4500, 5329, 2700, 3700, 2790, 4902],
			spanGaps: false,
		},
	];
	d_options= {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true,
					max: 10000
				}
			}],
		},
		legend: {
			position: 'bottom',
			display: true,
			labels: {
				boxWidth: 24,
				padding: 20
			}
		}
	}

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private route: ActivatedRoute,
		private service: cloudHostDetailService
	) {

	}

	get convertTimeDiff() {
		var msec = this.diff;
		var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
		msec -= dd * 1000 * 60 * 60 * 24;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		var mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
		var ss = Math.floor(msec / 1000);
		msec -= ss * 1000;

		return `${dd}天${hh}小时${mm}分钟`
	}

	ngOnInit() {
		this.fetchDetailAndFill();
	}

	private labelDatasChange(datas){
		console.log(datas)
		this.postData.labelIds = datas;
	}

	fetchDetailAndFill(callbackFn?) {
        this.layoutService.show();

		this.route.params.subscribe(params => {
			this.service.getHostInfo(params["itemId"]).then(res => {
				this.vm = res;
				this.diff = res.runningMillionMeters;
				this.postData = {
					useType      : res.useType.toString(),
					serviceLevel : res.serviceLevel.toString(),
					description  : res.description,
					labelIds: [],
                    instanceDisplayName : res.instanceName
				};
                this.layoutService.hide();
                
                callbackFn && callbackFn();
			}).catch(error => {
                this.layoutService.hide();
            })
		});
	}
    saveEditToServer() {  //保存编辑的数据到服务器
        this.layoutService.show();

        this.service.postVmInfo(this.vm.itemId, this.postData).then(res => {
            console.log(res);
            this.layoutService.hide();

            this.fetchDetailAndFill(() => {
                this.isEditState = false;
            });
           
        }).catch(error => {
            this.layoutService.hide();
        })
    }


    goToUrl(url : string) {
        this.router.navigateByUrl(url);
    }
}