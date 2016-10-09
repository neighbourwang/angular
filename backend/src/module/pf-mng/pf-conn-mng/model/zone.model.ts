export class Zone {
    uuid: String;
    id: String;
    code: String;
    name: String;
    displayName: String;
    hostNum: number;
    vcpunum: number;
    memSize: number;
    vmQuota: number;
    description: String;

    /*toString() {
        return this.uuid + "\n" +
            this.id + "\n" +
            this.code + "\n" +
            this.name + "\n" +
            this.displayName + "\n" +
            this.hostNum + "\n" +
            this.vcpunum + "\n" +
            this.memSize + "\n" +
            this.vmQuota + "\n" +
            this.description;*/
    }
}