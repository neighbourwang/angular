//超分管理首页-环形图数据
export class UsageState {
    cpu: ItemModel;
    mem: ItemModel;
    powerStat: PowerStatModel;
    flavor: FlavorModel;
}
export class ItemModel {
    number: string;
    level1: string;
    level2: string;
    level3: string;
}

export class PowerStatModel {
    active: string;
    shutoff: string;
    reboot: string;
}

export class FlavorModel {
    C2G20G:string;
    C4G20G:string;
    C16G0G:string;
}

export class DoughnutChart {
    
    DataSets:  Array<any>;
    ChartType: string;
    Colors: Array<any>;
    Options: any;
    CircleNum: number;
}
