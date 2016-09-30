export class ServiceDetail {
    // Step1 Data
    id: string = '';
    name: string = '';
    desc: string = '';
    regionId: string = '';
    templateId: string = '';

    // Step2 Data
    flavorId: string = '';
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
    zoneId: string = '';
    displayName: string = '';
    description: string = '';
    storageId: string = '';
    size: number = -1;
    serviceZoneId: string = '';
}