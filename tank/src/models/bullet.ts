import config from "../config";
import { imgs } from "../service/images";
import modelAbstract from "./modelAbstract";
import bulletCanvas from "../canvas/bullet";
import { directionEnum } from "../enum/directionEnum";
import util from "../util";
import wall from "../canvas/wall";
import steel from "../canvas/steel";
import boss from "../canvas/boss";
import tank from "../canvas/tank";
import play from "../canvas/play";
import audio from "../service/audio";

export default class bulletModel extends modelAbstract implements IModel{
    canvas: ICanvas = bulletCanvas;
    name: string = "bullet";
    //在创建子弹模型的时候，我么需要记录是那个tank模型发出的子弹，所以这里我们需要重写constructor构造函数。
    constructor(public tank:IModel){
        //子弹应当是从模型的中间部位发出。
        super(tank.x + config.model.width / 2,tank.y + config.model.height / 2);
        this.direction = tank.direction as directionEnum;
    }
    render(): void {
        this.move()
    }
    images(): HTMLImageElement {
        return imgs.get(this.name as keyof typeof config.images)!;
    }

    //子弹在画布上的大小我们需要单独设置所以我们需要重写draw方法。
    draw(){
        //暂定其为2像素大小好了。
        this.canvas.ctx.drawImage(this.images(),this.x,this.y,2,2);
    }

    //让子弹动起来
    protected move(){
        const step = this.tank.name == 'play' ? 10 : 3;
        let x = this.x;
        let y = this.y;
        switch (this.direction) {
            case directionEnum.top:
                y -= step
                break;
            case directionEnum.right:
                x += step
                break;
            case directionEnum.bottom:
                y += step
                break;
            case directionEnum.left:
                x -= step
                break;
        }
        //子弹的碰撞检测
        const touchModel = util.isModelTouch(x,y,2,2,[
            ...wall.models,//红色砖墙
            ...steel.models,//白色的钢筋混凝土结构的墙
            ...boss.models,//boss模型
            ...tank.models,//敌方tank模型
            ...play.models,//我方tank模型
        ]);
        if(util.isCanvasTouch(x,y,2,2)){//在正式刷新画布之前将子弹的坐标传入到我们先前写好的碰撞检测的工具中
            this.destroyModel();//如果子弹碰到了画布的边框，我们直接销毁子弹
        }else if(touchModel && touchModel.name != this.tank.name){
            this.destroyModel();//我们在模型类中给每个模型都起了名字的，自己发出的子弹不能击毁自己吧，哈哈哈！
            if(touchModel?.name != "steel"){
                //util的isModelTouch方法返回的是碰撞到的模型实例
                touchModel?.destroyModel();//但是我们需要考虑steel白色的墙是不能被击毁的。
                audio.blast()
                this.blast(touchModel);//在子弹击中了可击中的模型后渲染爆炸动画
            }
        }else{
            this.x = x;
            this.y = y;
            this.draw();
        }
    }
}