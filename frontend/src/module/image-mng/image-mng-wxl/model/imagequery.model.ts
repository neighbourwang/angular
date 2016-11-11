export class ImageQuery_wxl {
    imagearea: string = ""; //区域列表
    imagebelong: string = ""; //镜像归属
    //nameOros: string = ""; //镜像名称or镜像操作系统
    str: string = "";
    imagename: string = ""; //镜像名称
    imageos: string = ""; //镜像操作系统
    imagestatus: string = ""; //镜像状态
    imagetype: string = ""; //镜像类型

    
    toString() {
        return JSON.stringify(this);
    }
}