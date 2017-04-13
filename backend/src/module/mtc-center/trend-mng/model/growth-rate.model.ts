export class GrowthRate {
    zoneId: string;
    data: Array<DateRate>;
}

export class DateRate {
    date: string;
    total: number;
    rate: number;
}