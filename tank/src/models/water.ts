import config from "../config";
import { imgs } from "../service/images";
import modelAbstract from "./modelAbstract";
import waterCanvas from "../canvas/water";

export default class waterModel extends modelAbstract{
    canvas: ICanvas = waterCanvas;
    name: string = "water";
    render(): void {
        this.draw();
    }
    images(): HTMLImageElement {
        return imgs.get(this.name as keyof typeof config.images)!;
    }
}