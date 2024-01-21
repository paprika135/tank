import config from "../config";
import { imgs } from "../service/images";
import modelAbstract from "./modelAbstract";
import palyCanvas from "../canvas/play";
import _ from "lodash";
import { directionEnum } from "../enum/directionEnum";
import util from "../util";
import bullet from "../canvas/bullet";

export default class palyModel extends modelAbstract{
    canvas: ICanvas = palyCanvas;
    name: string = "play";
    bindEvent:boolean = false;
    render(): void {
        this.draw();
        if(this.bindEvent === false){
            this.bindEvent = true;
            document.addEventListener('keydown',this.changeDirection.bind(this))//随着移动方向的改变，改变炮头方向。
            document.addEventListener('keydown',this.move.bind(this))//实现玩家tank移动
            document.addEventListener('keydown',(event:KeyboardEvent)=>{
                if(event.code === 'Space') bullet.addPlayBullet();
            })
        }
    }
    images(): HTMLImageElement {
        let direction = this.name + _.upperFirst(this.direction);
        return imgs.get(direction as keyof typeof config.images)!;
    }

    //改变玩家tank炮头方向。
    changeDirection(event:KeyboardEvent){
        switch(event.code){
            case 'ArrowUp':
                this.direction = directionEnum.top
                break;
            case 'ArrowDown':
                this.direction = directionEnum.bottom
                break;
            case 'ArrowLeft':
                this.direction = directionEnum.left
                break;
            case 'ArrowRight':
                this.direction = directionEnum.right
                break;
        }
    }

    //实现tank移动
    move(event:KeyboardEvent){
        let x = this.x;
        let y = this.y;
        switch (event.code) {
            case 'ArrowUp':
                y -= 5;
                break;
            case 'ArrowDown':
                y += 5;
            break;
            case 'ArrowLeft':
                x -= 5;
            break;
            case 'ArrowRight':
                x += 5;
            break;
        }
        if(util.isCanvasTouch(x,y) || util.isModelTouch(x,y)){
            return;
        }
        this.x = x;
        this.y = y;
        //重新渲染画布
        this.canvas.renderModels();
    }
}