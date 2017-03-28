import { Injectable } from '@angular/core';
import { RestApiCfg, RestApi } from '../../../../architecture';
import { RestApiModel } from '../../../../architecture/core/model/rest';
import { Chart1 } from '../model';
import { LayoutService, ValidationService, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

@Injectable()
export class CreatChartService{

    private sumchart = new Chart1();
    private historychart = new Chart1();
    private topchart = new Chart1();
    private topIncreasechart = new Chart1();
	constructor(
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private layoutService : LayoutService,
		){}

	initCache(){
		
	}
    creatSumChart(){
        let sumchart = new Chart1();
        let type = 'doughnut';
        let datasets = [{
                        data: [100,200,400,500,250],
                        borderWidth:[
                            0,0,0,0
                        ]
                    }];
        let colors = [
            {
                backgroundColor:["#08C895","#82B6B2","#6F7DC8","#2BD2C8"]
            }
        ];

        sumchart.creatChart(type,datasets,null,colors);
        return sumchart;
    }

    createHstoryBar(){ 
        // let historychart = new Chart1();
        let type ='bar'; 
        let colors = [
                        {
                            backgroundColor: [
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                            ],
                            borderColor: [
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8',
                                '#2BD2C8'
                            ]
                        },{

                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            pointBorderColor: "rgba(255, 99, 132, 1)",
                            pointBackgroundColor: "#fff",
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                        }
                    ];
        let options = {
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true

                            }]
                        }
                    };


        let datasets=[{
                                type: "bar",
                                label: "总消费",
                                data: [100,200,400,500,250]
                                
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
                                    data: [100,200,400,500,250],
                                    spanGaps: false
                                }
                        ];
        let labels =['1月','2月','3月','4月','5月'];
        this.historychart.creatChart(type,datasets,labels,colors,options);
        return this.historychart;
    }

    createTopBar(){
        // let topchart = new Chart1();
        let type ='horizontalBar'; 
        let datasets=[{
            label:'消费总额',
            data: [100,200,400,250]
                            
        }];
        let colors  = [
                    {
                        backgroundColor: [
                            '#2BD2C8',
                            '#2BD2C8',
                            '#2BD2C8',
                            '#2BD2C8'
                        ],
                        borderColor: [
                            '#2BD2C8',
                            '#2BD2C8',
                            '#2BD2C8',
                            '#2BD2C8'
                        ]
                    }
                ];
        let options={
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        stacked: true
                                    }]
                                }
                };
            let labels =['1月','2月','3月','4月'];
            this.topchart.creatChart(type,datasets,labels,colors,options);
            return this.topchart;
            
}
    createTopIncreaseBar(){
         let type ='horizontalBar'; 
        let datasets=[{
            label:'消费总额',
            data: [100,200,400,250]
                            
        }];
        let colors  = [
                    {
                        backgroundColor: [
                            '#2BD2C8',
                            '#2BD2C8',
                            '#2BD2C8',
                            '#2BD2C8'
                        ],
                        borderColor: [
                            '#2BD2C8',
                            '#2BD2C8',
                            '#2BD2C8',
                            '#2BD2C8'
                        ]
                    }
                ];
        let options={
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        stacked: true
                                    }]
                                }
                };
            let labels =['1月','2月','3月','4月'];
            this.topIncreasechart.creatChart(type,datasets,labels,colors,options);
            return this.topIncreasechart;
            
}



    toSumDatas(source:any,target:Chart1){
        let datas:Array<number>=[];
        let labels:Array<string>=[];
        if(source){
                datas.push(source.physicalMachineOrderPriceSum);
                datas.push(source.dbOrderPriceSum);
                datas.push(source.diskOrderPriceSum);
                datas.push(source.vmOrderPriceSum);  

                // labels.push('物理机：'+source.physicalMachineOrderPriceSum);
                // labels.push('数据库：'+source.dbOrderPriceSum);
                // labels.push('云硬盘：'+source.diskOrderPriceSum);
                // labels.push('云主机：'+source.vmOrderPriceSum); 
                labels.push('物理机');
                labels.push('数据库');
                labels.push('云硬盘');
                labels.push('云主机'); 
        }
        target.datasets[0].data.splice(0,target.datasets[0].data.length);
        target.labels.splice(0,target.labels.length);
        target.datasets[0].data = datas;
        target.labels = labels;
  }

  
    toHistoryData(source:Array<any>,_source:Array<any>,target:Chart1){
        let datas:Array<number>=[];
        let _datas:Array<number>=[];
        let labels :Array<string>=[];
        if(source){
            // for(let item of source){
            //     datas.push(item.doubleValue);
            //     labels.push(item.num+'月');
            // }

            for(let i=source.length-1;i>=0;i--){
                let item = source[i];
                datas.push(item.doubleValue);
                labels.push(item.num+'月');
            }
        }
        if(_source){
            // for(let item of _source){
            //     _datas.push(item.doubleValue);
            // }
            for(let i=_source.length-1;i>=0;i--){
                let item = _source[i];
                _datas.push(item.doubleValue);
            }
        }
        target.datasets[0].data.splice(0,target.datasets[0].data.length);
        target.datasets[1].data.splice(0,target.datasets[1].data.length);
        target.labels.splice(0,target.labels.length);
    
        target.datasets[0].data = datas;
        target.datasets[1].data = _datas;
        // target.datasets[0].data = [100,500,400,300];
        // target.datasets[1].data = [100,200,400,500,250];
        target.labels = labels;
    }

    topToDatas(source:Array<any>,target:Chart1){
        let datas:Array<number> = [];
        let labels:Array<string>=[];
        if(source.length>0){
            for(let item of source){
            datas.push(item.amount);
            labels.push(item.name);
        }
    }    
    target.datasets[0].data.splice(0,target.datasets[0].data.length);
    target.labels.splice(0,target.labels.length);
    target.datasets[0].data = datas;
    //    target.datasets[0].data = [100,400,700,400,200];
    target.labels = labels;
    }

}