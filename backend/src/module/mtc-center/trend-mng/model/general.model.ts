export class GeneralModel{
   zones:Array<zoneDisk>;
   num:number;
   s0_50GB:number;
   s50_150GB:number;
   s150_200GB:number;
}

export class zoneDisk{
	name:string;
	sizeAttached:string;
	sizeUnattached:string;
	availabe:string;
}

export class DoughnutChart {
    
    DataSets:  Array<any>;
    ChartType: string;
    Colors: Array<any>;
    Options: any;
    CircleNum: number;
}
