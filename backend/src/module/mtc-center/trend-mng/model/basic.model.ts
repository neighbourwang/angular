export class BasicModel {
    zoneName: string;
    cpu: number;
    memory: number;
    cpuOversubscription: number;
    cpuQurta: number;//≈‰∂Ó
    cpuCapacity:number;
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