export class Bar {
    thx: Array<string>;
    zone: Array<ZoneBar>;
}

//每个可用区的数据
export class ZoneBar {
    name: Array<string>;
    series: Array<Item>;
    total: Array<number>;
}

//每个图例对应的数据
export class Item {
    name: string;
    data: Array<number>;
}