import config from "../config";
import { imgs } from "../service/images";
import modelAbstract from "./modelAbstract";
import tankCanvas from "../canvas/tank";
import _ from "lodash";
import { directionEnum } from "../enum/directionEnum";
import util from "../util";

export default class waterModel extends modelAbstract{
    canvas: ICanvas = tankCanvas;
    name: string = "tank";
    render(): void {
        this.move();
    }
    images(): HTMLImageElement {
        let direction = this.name + _.upperFirst(this.direction);
        return imgs.get(direction as keyof typeof config.images)!;
    }
    protected move():void{
        while (true) {
            let x = this.x;
            let y = this.y;
            switch (this.direction) {
                case directionEnum.top:
                    y--
                    break;
                case directionEnum.right:
                    x++
                    break;
                case directionEnum.bottom:
                    y++
                    break;
                case directionEnum.left:
                    x--
                    break;
            }
            const isModelTouch = util.isModelTouch(x,y);
            if(isModelTouch || util.isCanvasTouch(x,y)){
                this.randomDirection();
            }else{
                this.x = x;
                this.y = y;
                break;
            }
        }
        this.draw();
    }
}