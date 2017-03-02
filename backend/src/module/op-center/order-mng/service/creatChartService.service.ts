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

	constructor(
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private layoutService : LayoutService,
		){}

	initCache(){
		
	}
    creatSumChart(){
        let type = 'doughnut';
        let datasets = [{
                        data: [0,0,0,0],
                        borderWidth:[
                            0,0,0,0
                        ]
                    }];
        let colors = [
            {
                backgroundColor:["#08C895","#82B6B2","#6F7DC8","#2BD2C8"]
            }
        ];

        this.sumchart.creatChart(type,datasets,null,colors);
        return this.sumchart;
    }

    toSumDatas(source:any,target:Chart1){
    let datas:Array<number>=[];
    let labels:Array<string>=[];
    if(source){
            datas.push(source.physicalMachineOrderPriceSum);
            datas.push(source.dbOrderPriceSum);
            datas.push(source.diskOrderPriceSum);
            datas.push(source.vmOrderPriceSum);  
            labels.push('物理机：'+source.physicalMachineOrderPriceSum);
            labels.push('数据库：'+source.dbOrderPriceSum);
            labels.push('云硬盘：'+source.diskOrderPriceSum);
            labels.push('云主机：'+source.vmOrderPriceSum); 
    }
    target.datasets[0].data.splice(0,target.datasets[0].data.length);
    target.labels.splice(0,target.labels.length);
    target.datasets[0].data = datas;
    target.labels = labels;
  }
}