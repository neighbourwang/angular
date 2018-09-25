//超分管理首页-环形图数据
export class UsageState {
    cpu: ItemModel;
    mem: ItemModel;
    powerStat: PowerStatModel;
    flavor: Object;
}
export class ItemModel {
    num: string;
    level1: string;
    level2: string;
    level3: string;
}

export class PowerStatModel {
    active: string;
    shutoff: string;
    reboot: string;
    pause: string;
}


export class DoughnutChart {
    
    DataSets:  Array<any>;
    ChartType: string;
    Colors: Array<any>;
    Options: any;
    CircleNum: number;
}
