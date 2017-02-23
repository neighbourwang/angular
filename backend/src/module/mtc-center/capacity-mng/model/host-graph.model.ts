export class HostGraphModel {
    cpu: Array<CPU>;
    memory: Array<Memory>;
}
export class CPU {
    time: string;
    value: number;
}
export class Memory {
    time: string;
    value: number;
}
