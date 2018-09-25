//超分管理首页--平台联动列表
export class PlfModel {
    platformName: string;
    platformId: string;
    region: Array<RegionModel>;
}

export class RegionModel {
    regionId: string;
    region: string;
    zone: Array<ZoneModel>;
}

export class ZoneModel {
    zoneName: string;
    zoneId: string;
}