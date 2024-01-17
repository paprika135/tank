import config from "../config";
import strawModel from "../models/straw";
import canvasAbstract from "./canvasAbstract";

export default new(class strawCanvas extends canvasAbstract implements ICanvas{
    render(): void {
        super.createModel();
        super.renderModels();
    }
    model(): ModelConstructor{
        return strawModel;
    };
    num(): number {
        return config.straw.num;
    }
    

})("straw")