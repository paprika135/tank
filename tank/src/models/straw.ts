import config from "../config";
import { imgs } from "../service/images";
import modelAbstract from "./modelAbstract";
import strawCanvas from "../canvas/straw";

export default class strawModel extends modelAbstract{
    canvas: ICanvas = strawCanvas;
    name: string = "straw";
    render(): void {
        this.draw();
    }
    images(): HTMLImageElement {
        return imgs.get(this.name as keyof typeof config.images)!;
    }
}