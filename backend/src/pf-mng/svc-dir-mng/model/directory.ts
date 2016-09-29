export class Directory {
    id: number = -1;
    code: string = '';
    createDate: string = '';
    creatorId:  number = -1;
    creatorName: string = '';
    description: string = '';
    name: string = '';
    platformId: number = -1;
    regionId: number = -1;
    serviceTemplateId: number = -1;
    serviceTemplateName: string = '';
    status: number = -1;
    flavorId: number = -1;
    updateDate: number = -1;
    adsServiceOptionCategories: AdsServiceOptionCategory[];

    checked: boolean = false;
}

class AdsServiceOptionCategory {
    id: number = -1;
    code: string = '';
    createDate: number = -1;
    name: string = '';
    status: number = -1;
    updateDate: number = -1;
    adsServiceOptions: AdsServiceOption[];
}

class AdsServiceOption {
    id: number = -1;
    code: string = '';
    createDate: number = -1;
    name: string = '';
    resoucePoolId: number = -1;
    status: number = -1;
    type: number = -1;
    skuType: number = -1;
    unit: string = '';
    updateDate: number = -1;
    adsServiceOptionValues: AdsServiceOptionValue[];
    childServiceOptions: AdsServiceOption[];
}

class AdsServiceOptionValue {
    id: number = -1;
    code: string = '';
    createDate: number = -1;
    type: number = -1;
    unit: string = '';
    updateDate: number = -1;
    value: string = '';
    displayName: string = '';
    valueId: string = '';
    description: string = '';
    childServiceOptionValues: ChildServiceOptionValue[];
}

class ChildServiceOptionValue {
    // TODO
}
