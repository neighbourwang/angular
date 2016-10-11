export class EntProdMngServiceDetail {
    // 企业产品ID
    entProdId: String = "";
    // 企业产品名称
    entProdName: String = "";
    // 企业
    enterpriseId: String = "";
    // 区域IDX
    regionIdx: Number = -1;
    // 区域
    regionId: String = "";
    // 平台ID
    platformId: String = "";
    // 服务目录
    serviceId: String = "";
    // 描述
    description: String = "";
    // 计价周期
    periodType: String = "";
    
    flavors: Flavor[] = [];

    clear() {
        // 企业产品ID
        this.entProdId = "";
        // 企业产品名称
        this.entProdName = "";
        // 企业
        this.enterpriseId = "";
        // 区域IDX
        this.regionIdx = -1;
        // 区域
        this.regionId = "";
        // 平台ID
        this.platformId = "";
        // 服务目录
        this.serviceId = "";
        // 描述
        this.description = "";
        // 计价周期
        this.periodType = "";

        this.flavors = [];
    }
}

export class Flavor {
    // IDX
    idx: number;
    // Direct
    direct: number;
    // 选择状态标识
    isSelected: boolean = false;
    // 可用区ID
    uuid: String;
    // 可用区名称
    displayName: String;
    // 描述
    description: String;
    // 启动盘
    diskSize: String;
    // 定价
    price: Number;
    // 单位
    quantity: Number;
}