

export class CostPandectItem{

 
}

export class  Time{
    constructor(id:string,name:string) {
        this.id = id;
        this.name = name;
    }
 
   id:string = null;
   name:string = null;
}

export class  Chart{
 
    datas:Array<number> = null;
    colors:Array<any> = null;
    labels:Array<any> = null;
    options:any = null;
    setAllDatas(datas:Array<number>,colors:Array<any>,labels:Array<any>,options?:any){
        this.datas = datas;
        this.colors = colors;
        this.labels = labels;
        if(options){
            this.options = options;
        }
    }
}