export class RegionModel {
    RegionId: string;
    LocalName: string;
    selected = false;
    areas: Array<AreaModel> = [];
    selectedArea: AreaModel;
}

export class AreaModel {
    ZoneId:string;
    LocalName:string;
}

export class keysecretModel {
    accessId: string = "";
    accessSecret: string = "";
}