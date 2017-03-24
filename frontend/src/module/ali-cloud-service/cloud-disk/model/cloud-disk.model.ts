//Region ===>
export class RegionModel {
    RegionId: string = "";
    LocalName: string = "";
    selected = false;
    areas: Array<AreaModel> = [];
    selectedArea: AreaModel = new AreaModel();
    selectedDisk: string = "";
    diskCount: string = "20";
    count: number = 1;

    price: string = "  ";

    toString() {
        return JSON.stringify(this);
    }
}
export class AreaModel {
    ZoneId: string = "";
    LocalName: string = "";
    AvailableDiskCategories: DiskCategoriesModel = new DiskCategoriesModel();
    AvailableInstanceTypes: InstanceTypesModel = new InstanceTypesModel();
    AvailableResourceCreation: ResourceTypesModel = new ResourceTypesModel();
    AvailableResources: Array<ResourcesInfoModel> = [];
    toString() {
        return JSON.stringify(this);
    }
}
export class DiskCategoriesModel {
    DiskCategories: Array<string> = [];
}
export class InstanceTypesModel {
    InstanceTypes: Array<string> = [];
}
export class ResourceTypesModel {
    ResourceTypesModel: Array<string> = [];
}
export class ResourcesInfoModel {
    ResourcesInfo: Array<ResourceModel> = [];
}
//<=== Region


//Resource ===>
export class ResourceModel {
    DataDiskCategories: supportedDataDiskCategoryModel = new supportedDataDiskCategoryModel();
    InstanceGenerations: supportedInstanceGenerationModel = new supportedInstanceGenerationModel();
    InstanceTypeFamilies: supportedInstanceTypeFamilyModel = new supportedInstanceTypeFamilyModel();
    InstanceTypes: supportedInstanceTypeModel = new supportedInstanceTypeModel();
    IoOptimized: boolean = true;
    NetworkTypes: supportedNetworkCategoryModel = new supportedNetworkCategoryModel();
    SystemDiskCategories: supportedSystemDiskCategoryModel = new supportedSystemDiskCategoryModel();
}

export class supportedDataDiskCategoryModel {
    supportedDataDiskCategory: Array<string> = [];
}
export class supportedInstanceGenerationModel {
    supportedInstanceGeneration: Array<string> = [];    
}
export class supportedInstanceTypeFamilyModel {
    supportedInstanceTypeFamily: Array<string> = [];
}
export class supportedInstanceTypeModel {
    supportedInstanceType: Array<string> = [];
}
export class supportedNetworkCategoryModel {
    supportedNetworkCategory: Array<string> = [];
}
export class supportedSystemDiskCategoryModel {
    supportedSystemDiskCategory: Array<string> = [];    
}
//<=== Resource

export class keysecretModel {
    accessId: string = "";
    accessSecret: string = "";
}