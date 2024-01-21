import config from "../config";
import bulletModel from "../models/bullet";
import canvasAbstract from "./canvasAbstract";
import tankCanvas from "./tank";
import playCanvas from "./play";
import audio from "../service/audio";

export default new(class bulletCanvas extends canvasAbstract implements ICanvas{
    intervalId:number = 0;
    render(): void {
        // super.createModel();
        // super.renderModels();
        this.intervalId = setInterval(()=>{
            this.createBullet();
            this.renderModels();
        },20)
    }

    
    //因为构造函数不一样了所以我们要在vite-env.d.ts中再弄一个构造器签名
    model(): bulletModelConstructor{
        return bulletModel;
    };
    num(): number {
        return 0;
    }
    
    //创建子弹模型
    createBullet(){
        [...tankCanvas.models].forEach(tank=>{
            //如果敌方tank没有发射过子弹我们再创建子弹模型。
            const isExists = this.models.some(m=>m.tank == tank);//此时this.models数组中存的是子弹模型类的实例
            if(!isExists){
                this.models.push(new bulletModel(tank));
            }
        })  
    }

    //重写renderModels方法
    public renderModels(): void {
        this.ctx.clearRect(0,0,config.canvas.width,config.canvas.height);
        super.renderModels();
    }

    //添加玩家的子弹
    public addPlayBullet(){
        //玩家的子弹我们就开个小挂，我们让它可以一直发射子弹
        this.models.push(new bulletModel(playCanvas.models[0]));
        audio.fire();
    }

    public stop(){
        //清理定时器函数
        clearInterval(this.intervalId);
    }

})("bullet")