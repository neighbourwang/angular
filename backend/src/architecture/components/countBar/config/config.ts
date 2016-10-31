/**
 * Created by wangyao on 2016/10/21.
 */
export class Config{
    default:number;
    step:number;
    min:number;
    max:number;
    disabled:boolean;
    name:string
    constructor(){
        this.default=0;
        // this.disabled=true;
        this.step=100;
        this.min=0;
        this.max=1025;
    }
}
