export class EntResQuotaMng {
    isSelected: boolean = false;
    id: String;
    platformId: String;
    enterpriseId: String;
    enterpriseName: String;
    regionId: String;
    regionName: String;
    vmQuota: number;
    storageQuota: number;
    networkQuota: number;

    constructor() {
    }

    toString(): String {
        return this.id + "\r\n" +
            this.platformId + "\r\n" +
            this.enterpriseId + "\r\n" +
            this.enterpriseName + "\r\n" +
            this.regionId + "\r\n" +
            this.regionName + "\r\n" +
            this.vmQuota + "\r\n" +
            this.storageQuota + "\r\n" +
            this.networkQuota;
    }
}