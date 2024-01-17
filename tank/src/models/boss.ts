import config from "../config";
import { imgs } from "../service/images";
import modelAbstract from "./modelAbstract";
import bossCanvas from "../canvas/boss";

export default class wallModel extends modelAbstract{
    canvas: ICanvas = bossCanvas;
    name: string = "boss";
    render(): void {
        this.draw();
    }
    images(): HTMLImageElement {
        return imgs.get(this.name as keyof typeof config.images)!;
    }
}