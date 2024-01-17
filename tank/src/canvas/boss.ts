import config from "../config";
import bossModel from "../models/boss";
import canvasAbstract from "./canvasAbstract";

export default new(class bossCanvas extends canvasAbstract implements ICanvas{
    render(): void {
        this.createModel();
        super.renderModels();
    }
    model(): ModelConstructor{
        return bossModel;
    };
    num(): number {
        return 0;
    }
    
    //创建boss模型
    protected createModel(): void {
        [{x:config.canvas.width / 2,y:config.canvas.height - config.model.height}].forEach(position=>{
            const model = this.model() as ModelConstructor
            const instance = new model(position.x,position.y);
            this.models.push(instance);
        })
    }

})("boss");