//���ֹ�����ҳ--ƽ̨�����б�
export class PlfModel {
    platformName: string;
    platformId: string;
    region: Array<RegionModel>;
}

export class RegionModel {
    region: string;
    zone: Array<ZoneModel>;
}

export class ZoneModel {
    zoneName: string;
    zoneId: string;
}