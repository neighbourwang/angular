import { Component,ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { DatabaseDetailService } from '../service/database-detail.service'



@Component({
	selector: 'database-detail',
	templateUrl: '../template/database-detail.component.html',
	styleUrls: ['../style/database-detail.less'],
})

export class DatabaseDetailComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	vm:any;
	diff:number = 0;
	postData: any = {};

    isEditState:boolean = false;


	
	hours = 24;

	a_labels;
	a_datasets;
	a_options;
	cpuLabels = [];
	cpuData = [];

	b_labels;
	b_datasets;
	b_options;
	memLabels = [];
	memData = [];

	c_labels;
	c_datasets;
	c_options;
	diskIOPSRead  = []; 
	diskIOPSWrite  = []; 
	diskIOPSLabels  = []; 

	d_labels;
	d_datasets;
	d_options;
	diskIORead  = []; 
	diskIOWrite  = []; 
	diskIOLabels  = []; 

	e_labels;
	e_datasets;
	e_options;
	networkIn  = []; 
	networkOut  = []; 
	networkLables  = []; 

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private route: ActivatedRoute,
		private service: DatabaseDetailService
	) {
		this.setGraph()
	}

    setCpuGraph() {
		let length = this.cpuLabels.length - this.hours
		let labels = this.cpuLabels.filter((label, i) => i >= length)
		let datas = this.cpuData.filter((cpu, i) => i >= length)

		let datasets = [
				{
					label: "CPU使用率 %",
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
					data: datas,
					spanGaps: false,
				}
			],
			options = {
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
		
		this.a_labels = labels
		this.a_datasets = datasets
		this.a_options = options
    }

    setMemGraph() {
		let length = this.memLabels.length - this.hours
		let labels = this.memLabels.filter((label, i) => i >= length)
		let datas = this.memData.filter((mem, i) => i >= length)

		let datasets = [
				{
					label: "内存使用率 %",
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
					data: datas,
					spanGaps: false,
				}
			],
			options = {
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
		
		this.b_labels = labels
		this.b_datasets = datasets
		this.b_options = options
    }

    diskIOPS() {
		let length = this.diskIOPSLabels.length - this.hours
		let labels = this.diskIOPSLabels.filter((label, i) => i >= length)
		let data1 = this.diskIOPSRead.filter((disk, i) => i >= length)
		let data2 = this.diskIOPSWrite.filter((disk, i) => i >= length)

		let datasets= [
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
				data: data1,
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
				data: data2,
				spanGaps: false,
			},
		]
		let options= {
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
					boxWidth: 24,
					padding: 20
				}
			}
		}
		
		this.c_labels = labels
		this.c_datasets = datasets
		this.c_options = options
    }

    diskIO() {
		let length = this.diskIOLabels.length - this.hours
		let labels = this.diskIOLabels.filter((label, i) => i >= length)
		let data1 = this.diskIORead.filter((disk, i) => i >= length)
		let data2 = this.diskIOWrite.filter((disk, i) => i >= length)

		let datasets= [
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
				data: data1,
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
				data: data2,
				spanGaps: false,
			},
		]
		let options= {
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
					boxWidth: 24,
					padding: 20
				}
			}
		}
		
		this.d_labels = labels
		this.d_datasets = datasets
		this.d_options = options
    }

    network() {

		let length = this.networkLables.length - this.hours
		let labels = this.networkLables.filter((label, i) => i >= length)
		let data1 = this.networkOut.filter((disk, i) => i >= length)
		let data2 = this.networkIn.filter((disk, i) => i >= length)

		let datasets= [
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
				data: data1,
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
				data: data2,
				spanGaps: false,
			},
		]
		let options= {
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
					boxWidth: 24,
					padding: 20
				}
			}
		}
		
		this.e_labels = labels
		this.e_datasets = datasets
		this.e_options = options
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
		this.fetchGraphData();
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

    fetchGraphData() {
		this.layoutService.show();

		this.route.params.subscribe(params => {
			this.service.getVmCpuMemGraph(params["itemId"]).then(res => {
				this.layoutService.hide();
				let {cpu, memory, diskIOPSRead, diskIOPSWrite, diskIORead, diskIOWrite, networkIn, networkOut } = res


				this.cpuLabels = cpu.map(c => c.time)
				this.cpuData = cpu.map(c => c.value)
				this.memLabels = memory.map(c => c.time)
				this.memData = memory.map(c => c.value)

				this.diskIOPSRead = diskIOPSRead.map( c => c.value)
				this.diskIOPSWrite = diskIOPSWrite.map( c => c.value)
				this.diskIOPSLabels = diskIOPSWrite.map( c => c.time)

				this.diskIORead = diskIORead.map( c => c.value)
				this.diskIOWrite = diskIOWrite.map( c => c.value)
				this.diskIOLabels = diskIOWrite.map( c => c.time)

				this.networkIn = networkIn.map( c => c.value)
				this.networkOut = networkOut.map( c => c.value)
				this.networkLables = networkIn.map( c => c.time)

				this.setGraph()
			}).catch(error => {
	            this.layoutService.hide();
	        })
		})
    }

    setGraph() {
		this.setCpuGraph()
		this.setMemGraph()
		this.diskIOPS()
		this.diskIO()
		this.network()
    }


    goToUrl(url : string) {
        this.router.navigateByUrl(url);
    }
}