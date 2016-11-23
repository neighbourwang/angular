export class EntResQuota {
    id: String = null;
    enterpriseId: String = null;
    platformId: String = null;
    platformStorageQuota: number = 0;
    platformVMQuota: number = 0;
    regionId: String = null;
    regionName: String = null;
    vmQuota: number = 0;
    storageQuota: number = 0;
    networkQuota: number = 0;

    constructor() {
    }

    toString(): String {
        return this.id + "\r\n" +
            this.enterpriseId + "\r\n" +
            this.platformId + "\r\n" +
            this.platformStorageQuota + "\r\n" +
            this.platformVMQuota + "\r\n" +
            this.regionId + "\r\n" +
            this.regionName + "\r\n" +
            this.vmQuota + "\r\n" +
            this.storageQuota + "\r\n" +
            this.networkQuota;
    }
}