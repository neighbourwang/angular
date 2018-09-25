export class SystemDictionary {
    owner: string;
    field: string;
    code: string;
    value: string;
    displayValue: string;

    toString(): string {
        return this.owner +
            "\n" +
            this.field +
            "\n" +
            this.code +
            "\n" +
            this.value +
            "\n" +
            this.displayValue;
    }
}
