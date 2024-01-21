import _ from "lodash";
import config from "../config";
import { directionEnum } from "../enum/directionEnum";
import audio from "../service/audio";

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
        if(_.random(15) === 1){
            this.direction = directionEnum.bottom;
        }
    }

    public destroyModel(){
        /**
         * 因为每个模型类中我们都将其对应的画布类实例导入进来了
         * 所以可以在模型的抽象类的方法中直接调用其方法
         * 注意这里的this指的就是对应的模型实例
         */
        this.canvas.removeModel(this);//将元素从画布实例上的的IModel数组中删除其实就是销毁元素
        this.canvas.renderModels();//重新渲染画布
    }

    //元素的爆炸效果
    protected blast(model:IModel){
        audio.blast();
        //由于元素的爆炸效果有8张图片这8张图片我们需要依次渲染
        Array(...Array(8).keys()).reduce((promise,index)=>{
            return promise.then(()=>
            new Promise(resolve=>{
                setTimeout(()=>{
                        const img = new Image();
                        img.src = `/src/static/images/blasts/blast${index}.gif`;
                        img.onload = () =>{
                            // audio.blast();//如果你放到这里，爆炸音效就是放5次，如果你放到子弹模型类的move方法中就是放1次。
                            this.canvas.ctx.drawImage(img,model.x,model.y,config.model.width,config.model.height);
                            resolve(promise);
                        }
                },300);//300毫秒
            })
            )
        },Promise.resolve())//给reduce方法设置一个初始值
    }
}