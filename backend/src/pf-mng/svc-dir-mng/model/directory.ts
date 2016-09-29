export class Directory {
    id: number = 0;
    code: string = '';
    createDate: string = '';
    creatorId:  number = 0;
    creatorName: string = '';
    description: string = '';
    name: string = '';
    platformId: number = 0;
    regionId: number = 0;
    serviceTemplateId: number = 0;
    serviceTemplateName: string = '';
    status: number = 0;
    flavorId: number = 0;
    updateDate: number = 0;
    adsServiceOptionCategories: AdsServiceOptionCategory[];

    checked: boolean = false;
}

export class AdsServiceOptionCategory {
    id: number = 0;
    code: string = '';
    createDate: number = 0;
    name: string = '';
    status: number = 0;
    updateDate: number = 0;
    adsServiceOptions: AdsServiceOption[];
}

export class AdsServiceOption {
    id: number = 0;
    code: string = '';
    createDate: number = 0;
    name: string = '';
    resoucePoolId: number = 0;
    status: number = 0;
    type: number = 0;
    skuType: number = 0;
    unit: string = '';
    updateDate: number = 0;
    adsServiceOptionValues: AdsServiceOptionValue[];
    childServiceOptions: AdsServiceOption[];
}

export class AdsServiceOptionValue {
    id: number = 0;
    code: string = '';
    createDate: number = 0;
    type: number = 0;
    unit: string = '';
    updateDate: number = 0;
    value: string = '';
    displayName: string = '';
    valueId: string = '';
    description: string = '';
    childServiceOptionValues: ChildServiceOptionValue[];
}

export class ChildServiceOptionValue {
    // TODO
}
