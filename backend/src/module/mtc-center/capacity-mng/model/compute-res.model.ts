export class ComputeResModel{
    code: string;
    dataCenter: string;
    description: string;
    healthFlag: string;
    id: string;
    name: string;
    passward: string;
    platformType: string;
    status: string;
    support: number;
    uri: string;
    username: string;
    version: string;
    regions: Array<Region>;
}

export class Region {
    regionId: string;
    regionName: string;
    zones:Array<ZoneInfo>
}
export class ZoneInfo {
    zoneId: string;
    zoneName: string;
    zoneStatus: string;
}