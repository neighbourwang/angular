
class dcOrRegion {
    "displayName": string;
    "id": string;
    "name": string;
    "platformId": string;
    "uuid": string;
}

export class ZoneListModel {
    name: string; //名称
    displayName: string; //显示名称
    displayNameValid: boolean;
    hostnum: number;//宿主机 数量
    hostContent:any;
    memSize: number;//总内存数
    vcpunum: number;//物理cpu总核数
    usageQuota: number; //云主机机配额
    description: String;//说明
    id: string;
    //   "platformId": "8b99ce42-6b42-4757-9b21-7a190ce14972",
    dcOrRegion: Array<dcOrRegion>;
    exceedPercentage: number;
    exceedPercentageValid: boolean;
    quotaPercentage: number;
    quotaPercentDisplay: number;
    quotaPercentDisplayValid: boolean;
    isEdit: boolean;
    hosts:Array<string>;
    status: string;
    vmNumbers:number;//云桌面实例数量
    constructor() {
        this.displayNameValid = true;
        this.exceedPercentageValid = true;
        this.quotaPercentDisplayValid = true;
        this.hosts=new Array<string>();
    }
}
