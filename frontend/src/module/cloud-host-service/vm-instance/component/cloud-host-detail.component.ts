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


	
	hours = "1";

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

	defaultOption = {                
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    maxTicksLimit:20
                    //userCallback: function (dataLabel, index) {
                    //    return index % Math.ceil(chart.SourceData.length/10) === 0 ? dataLabel : '';
                    //}
                }
            }],
            yAxes: [{
                display: true,
                 ticks: {
                    min: 0,
                    suggestedMax: 50
                },
                beginAtZero: true
            }]
        }
    } 

	constructor(
		public layoutService: LayoutService,
		public router: Router,
		public route: ActivatedRoute,
		public service: cloudHostDetailService
	) {
		this.setGraph()
	}

    setCpuGraph() {
		let labels = this.cpuLabels
		let datas = this.cpuData
		// let datas = this.cpuData.map(data =>  Math.floor(Math.random()*100))

		let datasets = [
				{
					label: "CPU使用率 %",
					data: datas,
				}
			]

		this.a_labels = labels
		this.a_datasets = datasets
    }

    setMemGraph() {
		let labels = this.memLabels
		let datas = this.memData

		let datasets = [
				{
					label: "内存使用率 %",
					data: datas,
				}
			]
		
		this.b_labels = labels
		this.b_datasets = datasets
    }

    diskIOPS() {
		let labels = this.diskIOPSLabels
		let data1 = this.diskIOPSRead
		let data2 = this.diskIOPSWrite

		let datasets= [
			{
				label: "读取",
				data: data1,
			},
			{
				label: "读入",
				data: data2,
			},
		]
		
		this.c_labels = labels
		this.c_datasets = datasets
    }

    diskIO() {
		let labels = this.diskIOLabels
		let data1 = this.diskIORead
		let data2 = this.diskIOWrite

		let datasets= [
			{
				label: "读取",
				data: data1,
			},
			{
				label: "读入",
				data: data2,
			},
		]
		
		this.d_labels = labels
		this.d_datasets = datasets
    }

    network() {

		let labels = this.networkLables
		let data1 = this.networkOut
		let data2 = this.networkIn

		let datasets= [
			{
				label: "读取",
				data: data1,
			},
			{
				label: "读入",
				data: data2,
			},
		]
		
		this.e_labels = labels
		this.e_datasets = datasets
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
			this.service.getVmCpuMemGraph(params["itemId"], this.hours).then(res => {
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