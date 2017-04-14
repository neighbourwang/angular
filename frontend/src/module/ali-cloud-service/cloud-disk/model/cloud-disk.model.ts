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

    price: string = "";

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


export class diskListModel {
    DiskChargeType: string = "";
    ImageId: string = "";
    Device: string = "";
    DetachedTime: string = "";
    Type: string = "";
    InstanceId: string = "";
    EnableAutoSnapshot: boolean = false;
    ZoneId: string = "";
    AttachedTime: string = "";
    SourceSnapshotId: string = "";
    DeleteAutoSnapshot: boolean = false;
    Size: number = 0;
    Description: string = "";
    Portable: boolean = false;
    ProductCode: string = "";
    EnableAutomatedSnapshotPolicy: boolean = false;
    DiskName: string = "";
    AutoSnapshotPolicyId: string = "";
    CreationTime: string = "";
    Tags: TagModel = new TagModel();
    Status: string = "";
    Category: string = "";
    RegionId: string = "";
    DeleteWithInstance: boolean = false;
    OperationLocks: OperationLockModel = new OperationLockModel();
    ExpiredTime: string = "";
    DiskId: string = "";

    checked: boolean = false;
    EnableEdit: boolean = false;
}

export class TagModel {
    Tag: Array<string> = [];
}

export class OperationLockModel {
    OperationLock: Array<string> = [];
}

export class diskOrderModel {
    clientToken: string = "";
    description: string = "";
    diskCategory: string = "";
    diskName: string = "";
    size: string = "";
    snapshotId: string = "";
}

export class accessinfoModel {
    accessId: string = null;
    accessSecret: string = null;
}

export class conditionModel {
    category: string = null;
    deleteAutoSnapshot: string = null;
    deleteWithInstance: string = null;
    diskChargeType: string = null;
    diskIds: string = null;
    diskName: string = null;
    diskType: string = null;
    enableAutoSnapshot: string = null;
    instanceId: string = null;
    pageNumber: number = null;
    pageSize: number = null;
    portable: string = null;
    snapshotId: string = null;
    status: string = null;
    zoneId: string = null;
}

export class GetDisksSubmitModel {
  accessinfo: accessinfoModel = new accessinfoModel();
  conditionModel: conditionModel = new conditionModel();
}

export class QueryObject {
    criteria: string = "disk_name";
    keyword: string = "";

    toString() {
        JSON.stringify(this);
    }
}