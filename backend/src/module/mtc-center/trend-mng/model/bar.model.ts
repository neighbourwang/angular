export class Bar {
    thx: Array<string>;
    zone: Array<ZoneBar>;
}

//ÿ��������������
export class ZoneBar {
    name: Array<string>;
    series: Array<Item>;
    total: Array<number>;
}

//ÿ��ͼ����Ӧ������
export class Item {
    name: string;
    data: Array<number>;
}