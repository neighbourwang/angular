export class SystemDictionary {
    owner: String;
    field: String;
    code: String;
    value: String;
    displayValue: String;

    toString(): String {
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