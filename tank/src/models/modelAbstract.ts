import config from "../config";
import { directionEnum } from "../enum/directionEnum";

export default abstract class modelAbstract{
    abstract images():HTMLImageElement;//获取模型的图片
    abstract render():void;//往画布上绘制图片
    abstract name:string;//元素的名字
    abstract canvas:ICanvas//元素对应的画布canvas
    public direction:directionEnum  = directionEnum.bottom;
    public width:number = config.model.width;
    public height:number = config.model.height; 
    constructor(public x:number,public y:number){//x和y是渲染的坐标
        this.randomDirection();
    }

    /**
     * draw
     * 往画布上绘制模型
     */
    public draw() {
        this.canvas.ctx.drawImage(this.images(),this.x,this.y,config.model.width,config.model.height);
    }

    //tank掉头
    randomDirection(){
        this.direction = Object.keys(directionEnum)[Math.floor(Math.random() * 4)] as directionEnum;
    }
}