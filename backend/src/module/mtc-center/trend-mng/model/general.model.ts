export class GeneralModel{
   zones:Array<zoneDisk>;
   num:number;
   level1:number;
   level2:number;
   level3: number;
   level4: number;
   level5:number;
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
