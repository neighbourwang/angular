export class ResSync {
    // 可用区
    zonesCount: number;
    // 可用区同步完成标志
    synchronizedZones: boolean = false;
    // 存储
    storagesCount: number;
    // 存储同步完成标志
    synchronizedStorages: boolean = false;
    // 云主机类型
    flavorsCount: number;
    // 云主机类型同步完成标志
    synchronizedFlavors: boolean = false;
    // 可用域
    regionsCount: number;
    // 可用域同步完成标志
    synchronizedRegions: boolean = false;
    // 镜像
    imagesCount: number;
    // 镜像同步完成标志
    synchronizedImages: boolean = false;
    // 当前同步资源
    syncRes: String;
    // 已经同步资源数量
    syncCount: number = 0;
    // 当前同步百分比
    syncProgress: number = 0;
    // 同步完成标志
    syncCompleted: boolean = false;

    constructor(syncRes: String, syncProgress: number) {
        this.syncRes = syncRes;
        this.syncProgress = syncProgress;
    }

    // 计算全部待同步资源数量
    private syncSuspending() {
        return this.regionsCount + this.storagesCount + this.flavorsCount + this.regionsCount + this.imagesCount;
    }

    // 计算同步百分比
    synchronized(count: number, syncRes: String) {
        this.syncCount += count;

        this.syncProgress = Math.ceil(this.syncCount / this.syncSuspending() * 100);
        this.syncRes = syncRes;
    }
}