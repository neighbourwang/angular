export class ResSync {
    // 可用区
    zonesCount: number;
    // 存储
    storagesCount: number;
    // 云主机类型
    flavorsCount: number;
    // 可用域
    regionsCount: number;
    // 镜像
    imagesCount: number;
    // 当前同步百分比
    syncRes: String;
    // 当前同步百分比
    syncProgress: number = 0;

    constructor(syncRes: String, syncProgress: number) {
        this.syncRes = syncRes;
        this.syncProgress = syncProgress;
    }
}