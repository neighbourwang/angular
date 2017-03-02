export class ZoneModel {
    cpus: number;
    memory: number;
    cpuOversubscription: number;
    cpuQurta: number;
    cpuCapacity: number;
    memoryCapacity: number;
    resourceAllocation: Percent;
    resourceActual: Percent;
    resourceUsed: Percent;
}

export class Percent {
    cpu: number;
    cpuTotal: number;
    cpuPercent: number;
    memory: number;
    memoryTotal: number;
    memoryPercent: number;
}



export class DoughnutChart {
    
    DataSets:  Array<any>;
    ChartType: string;
    Colors: Array<any>;
    Options: any;
    CircleNum: number;
}

