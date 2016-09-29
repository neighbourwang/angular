export class ServiceDetail {
    // Step1 Data
    id: number = -1;
    name: string = '';
    desc: string = '';
    regionId: number = -1;
    templateId: number = -1;

    // Step2 Data
    flavorId: number = -1;
    imageType: number = -1;
    networkType: number = -1;

    // Step3 Data

    // Step4 Data
    zones: ZoneInfo[] = [];

    // Other Data
    options: Option[] = [];
}
class Option {
    code: string = '';
    value: string = '';
}

export class ZoneInfo {
    zoneId: number = -1;
    displayName: string = '';
    description: string = '';
    storageId: number = -1;
    size: number = -1;
    serviceZoneId: number = -1;
}