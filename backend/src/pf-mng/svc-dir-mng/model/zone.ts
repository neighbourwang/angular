export class Zone {
    id: string = '';
    platformId: string = '';
    name: string = '';
    displayName: string = '';
    description: string = '';
    code: string = '';
    cpuNum: number = -1;
    hostNum: number = -1;
    memNum: number = -1;
    createDate: string = '';
    updateDate: string = '';

    added: boolean = false;        // Added status for service zones
    selected: boolean = false;     // Selected status for UI display
}