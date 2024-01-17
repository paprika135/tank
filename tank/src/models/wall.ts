import config from "../config";
import { imgs } from "../service/images";
import modelAbstract from "./modelAbstract";
import wallCanvas from "../canvas/wall";

export default class wallModel extends modelAbstract{
    canvas: ICanvas = wallCanvas;
    name: string = "wall";
    render(): void {
        this.draw();
    }
    images(): HTMLImageElement {
        return imgs.get(this.name as keyof typeof config.images)!;
    }
}