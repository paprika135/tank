import config from "../config";
import waterModel from "../models/water";
import canvasAbstract from "./canvasAbstract";

export default new(class waterCanvas extends canvasAbstract implements ICanvas{
    render(): void {
        super.createModel();
        super.renderModels();
    }
    model(): ModelConstructor{
        return waterModel;
    };
    num(): number {
        return config.water.num;
    }
    

})("water")