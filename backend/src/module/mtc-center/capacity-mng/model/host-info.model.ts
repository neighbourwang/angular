export class HostInfo {
    hostId: string;
    hostName: string;
    cpu: number;
    memory: number;
    cpuPercent: number;
    memPercent: number;
    running: string;
    status: string;
    instance: number;
    cpuAverage: number;
    cpuPeak: number;
    cpuPeakTime: string;
    memoryAverage: number;
    memoryPeak: number;
    memoryPeakTime: string;
}

export class DataSet {
    data: Array<number>;
    label: string;
}