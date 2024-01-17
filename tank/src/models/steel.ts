import config from "../config";
import { imgs } from "../service/images";
import modelAbstract from "./modelAbstract";
import steelCanvas from "../canvas/straw";

export default class strawModel extends modelAbstract{
    canvas: ICanvas = steelCanvas;
    name: string = "steel";
    render(): void {
        this.draw();
    }
    images(): HTMLImageElement {
        return imgs.get(this.name as keyof typeof config.images)!;
    }
}