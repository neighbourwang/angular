export class ZoneModel {
    cpus: number;
    memory: number;
    cpuOversubscription: number;
    cpuQurta: number;
    cpuCapacity: number;
    memoryCapacity: number;
    resourceAllocation: ResAllocation;
    resourceActual: ResActual;
    resourceUsed: ResUsed;
}

export class ResAllocation {
    cpu: number;
    cpuTotal: number;
    cpuPercent: number;
    memory: number;
    memoryTotal: number;
    memoryPercent: number;
}

export class ResActual {
    cpu: number;
    cpuTotal: number;
    cpuPercent: number;
    memory: number;
    memoryTotal: number;
    memoryPercent: number;
}

export class ResUsed {
    cpu: number;
    cpuTotal: number;
    cpuPercent: number;
    memory: number;
    memoryTotal: number;
    memoryPercent: number;
}