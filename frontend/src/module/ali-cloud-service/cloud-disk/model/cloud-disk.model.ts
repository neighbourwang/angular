export class RegionModel {
    RegionId: string = "";
    LocalName: string = "";
    selected = false;
    areas: Array<AreaModel> = [];
    selectedArea: AreaModel = new AreaModel();
    selectedDisk: string = "";
    diskCount: string = "";
    count: number = 1;

    toString() {
        return JSON.stringify(this);
    }
}

export class AreaModel {
    ZoneId: string = "";
    LocalName: string = "";
    AvailableDiskCategories: DiskCategoriesModel = new DiskCategoriesModel();
}

export class DiskCategoriesModel {
    DiskCategories: Array<string> = [];
}

export class keysecretModel {
    accessId: string = "";
    accessSecret: string = "";
}