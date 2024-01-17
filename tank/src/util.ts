import steel from "./canvas/steel";
import wall from "./canvas/wall";
import config from "./config";


export default {
    isCanvasTouch(x:number,y:number,width:number = config.model.width,height:number = config.model.height):boolean{
        return (x < 0 || x + width > config.canvas.width || y < 0 || y + height > config.canvas.height);
    },
    isModelTouch(x:number,y:number,width:number = config.model.width,height:number = config.model.height,
        barrier:IModel[] = [...steel.models,...wall.models]
    ):IModel | undefined{
        return barrier.find(model=>{
            const state = 
                x + width <= model.x ||
                x >= model.x + model.width ||
                y + height <= model.y ||
                y >= model.y + model.height;
                return !state
        }) as IModel
    }
}