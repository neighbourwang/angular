export class HostGraphModel {
    cpu: Array<GraphItem>;
    memory: Array<GraphItem>;
}
export class GraphItem {
    time: string;
    value: number;
}


export class LineChart {
    SourceData: Array<GraphItem>;
    DataSets: Array<any>;
    _data: Array<number>;
    ChartType: string;
    Colors: Array<any>;
    Labels: Array<any>;
    options: any;
}
