class pageParameter{
    currentPage: number = 0;
    offset: number = 0;
    size: number = 0;
    sort: {};
    totalPage: number = 0;
}

class QuiryDistList {
  ownerType: string = "";
  pageParameter: pageParameter = new pageParameter();
  platformId: string = "";
  queryField: string = "";
  queryFieldValue: string = "";
  status: string = "";
  unloadAble: string = ""
}

class DistList {
    id: string;
    instanceItemId: string;
    name: string;
    type: string;
    size: number;
    relyId: string;
    relyName: string;
    status: number;
    expireDate: number;
    unloadAble: string;
    platformName: string;
    zoneName: string;
    useType: string;
    sourceType: number;
}

export {
    DistList,
    QuiryDistList
}