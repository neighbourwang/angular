export class Storage {
    uuid: String;
    id: String;
    code: String;
    name: String;
    displayName: String;
    quota: String;
    maximum: String;
    description: String;

    toString() {
        return this.uuid + "\n" +
            this.id + "\n" +
            this.code + "\n" +
            this.name + "\n" +
            this.displayName + "\n" +
            this.quota + "\n" +
            this.maximum + "\n" +
            this.description;
    }
}