import config from "../config";
import steelModel from "../models/steel";
import canvasAbstract from "./canvasAbstract";

export default new(class steelCanvas extends canvasAbstract implements ICanvas{
    render(): void {
        super.createModel();
        super.renderModels();
    }
    model(): ModelConstructor{
        return steelModel;
    };
    num(): number {
        return config.straw.num;
    }
    

})("steel")