export class Region {
    id: String;
    code: String;
    name: String;
    platformId: String;

    toString(): String {
        return this.id + "\r\n" +
            this.code + "\r\n" +
            this.name + "\r\n" +
            this.platformId;
    }
}